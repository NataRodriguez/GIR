// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reservaData, setReservaData] = useState({
    especialidad: '',
    comuna: '',
    servicio: ''
  });

  // Cargar el usuario de localStorage al iniciar
  useEffect(() => {
    const nombre = localStorage.getItem('nombre');
    if (nombre) {
      setUser({ nombre });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('nombre', userData.nombre);
    localStorage.setItem('ID', userData.id);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('nombre');
    setUser(null);
  };

  // Función para actualizar los datos de la reserva
  const updateReservaData = (data) => {
    setReservaData(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, reservaData, updateReservaData }}>
      {children}
    </AuthContext.Provider>
  );
};
