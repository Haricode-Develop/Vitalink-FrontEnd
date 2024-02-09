import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './MainRoutes';
import 'typeface-roboto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <div className='app'>
        <Router>
          <MainRoutes />
        </Router>
      </div>
        <ToastContainer />
    </AuthProvider>
  );
};

export default App;
