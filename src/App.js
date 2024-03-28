import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './MainRoutes';
import 'typeface-roboto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {WebSocketProvider} from "./context/WebSocketContext";
import {SedeProvider} from "./context/SedeContext";

const App = () => {
    return (
        <AuthProvider>
            <WebSocketProvider>
                <SedeProvider>
                    <div className='app'>
                        <Router>
                            <MainRoutes />
                        </Router>
                    </div>
                </SedeProvider>
                <ToastContainer />
            </WebSocketProvider>
        </AuthProvider>
    );
};

export default App;
