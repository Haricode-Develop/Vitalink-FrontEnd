import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './MainRoutes';
import 'typeface-roboto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {WebSocketProvider} from "./context/WebSocketContext";

const App = () => {
    return (
        <AuthProvider>
            <WebSocketProvider>
                <div className='app'>
                    <Router>
                        <MainRoutes />
                    </Router>
                </div>
                <ToastContainer />
            </WebSocketProvider>
        </AuthProvider>
    );
};

export default App;
