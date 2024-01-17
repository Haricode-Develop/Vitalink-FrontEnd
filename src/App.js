import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './MainRoutes';
import 'typeface-roboto';

const App = () => {
  return (
    <AuthProvider>
      <div className='app'>
        <Router>
          <MainRoutes />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
