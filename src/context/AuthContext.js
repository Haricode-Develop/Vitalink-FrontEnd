import React, { createContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';  // Importar useNavigate
import useIdleTimer from '../Hook/useIdleTimer';
import { useWebSocket } from "../context/WebSocketContext";  // Para cerrar WebSocket

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const wsContext = useWebSocket();

  const setSessionToken = useCallback((token) => {
    localStorage.setItem('sessionToken', token);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem('sessionToken');

    // Cerrar el WebSocket
    if (wsContext && wsContext.closeWebSocket) {
      wsContext.closeWebSocket();
    }

    navigate('/login', { replace: true });
  }, [navigate, wsContext]);

  const showIdleTimeoutToast = useCallback(() => {
    toast.error('Tu sesión se ha cerrado por inactividad.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });

    logout();
  }, [logout]);

  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  useIdleTimer(1200000, isDashboardRoute ? logout : null, isDashboardRoute ? showIdleTimeoutToast : null);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, userData, setUserData, logout, setSessionToken }}>
        {children}
      </AuthContext.Provider>
  );
};
