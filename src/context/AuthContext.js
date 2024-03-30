import React, { createContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import useIdleTimer from '../Hook/useIdleTimer';

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

  const showIdleTimeoutToast = useCallback(() => {
    toast.error('Tu sesión se ha cerrado por inactividad.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  }, []);

  useIdleTimer(1200000, logout, showIdleTimeoutToast);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, userData, setUserData, logout, setSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
};
