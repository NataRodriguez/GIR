// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const nombre = localStorage.getItem('nombre'); // Guarda el nombre del usuario en localStorage
    if (nombre) {
      setUser({ nombre });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('nombre', userData.nombre); // Almacena el nombre en localStorage
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('nombre'); // Limpia el localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
