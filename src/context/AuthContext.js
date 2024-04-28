import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();  // Move useRouter inside the provider component
  const [user, setUser] = useState(null);
  const [reservaData, setReservaData] = useState({
    especialidad: '',
    comuna: '',
    servicio: ''
  });

  // Load user from localStorage when component mounts
  useEffect(() => {
    const nombre = localStorage.getItem('nombre');
    const id = localStorage.getItem('ID');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';  // Assuming you store admin status as a string
    const profesionalId = localStorage.getItem('profesionalId');
    if (nombre) {
      setUser({ nombre, id, isAdmin, profesionalId });
      if (isAdmin) {
        router.push(`/admin/${profesionalId}`);  // Redirect if user is an admin
      }
    }
  }, [router]);  // Include router in the dependency array to ensure it's available

  const login = (userData) => {
    localStorage.setItem('nombre', userData.nombre);
    localStorage.setItem('ID', userData.id);
    localStorage.setItem('isAdmin', userData.isAdmin);
    localStorage.setItem('profesionalId', userData.profesionalId);
    setUser(userData);
    if (userData.isAdmin) {
      router.push(`/admin/${userData.profesionalId}`);
    }
  };

  const logout = () => {
    localStorage.removeItem('nombre');
    localStorage.removeItem('ID');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('profesionalId');
    setUser(null);
    router.push('/');
  };

  // Update booking data
  const updateReservaData = (data) => {
    setReservaData(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, reservaData, updateReservaData }}>
      {children}
    </AuthContext.Provider>
  );
};
