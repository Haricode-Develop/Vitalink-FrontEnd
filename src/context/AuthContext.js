import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const setSessionToken = useCallback((token) => {
    localStorage.setItem('sessionToken', token);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('sessionToken');
  }, []);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, userData, setUserData, logout, setSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
};
