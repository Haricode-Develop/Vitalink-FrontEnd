import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const ProtectedRoute = (props) => {
    const isAuthenticated = localStorage.getItem('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Route {...props} />;

  }
};
export default ProtectedRoute;
