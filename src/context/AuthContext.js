import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    setIsAuthenticated(false); // Establecer autenticación a false
    setUserData(null);        // Restablecer los datos del usuario a nulo
    localStorage.removeItem('authToken'); // eliminar el token de autenticación (si lo estás usando)
  }, []);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, userData, setUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
