import React, { createContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import useIdleTimer from '../Hook/useIdleTimer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

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

  // Verificar si estamos en una ruta del dashboard
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // Siempre llamamos a useIdleTimer, pero activamos solo si es una ruta del dashboard
  useIdleTimer(1200000, isDashboardRoute ? logout : null, isDashboardRoute ? showIdleTimeoutToast : null);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, userData, setUserData, logout, setSessionToken }}>
        {children}
      </AuthContext.Provider>
  );
};
