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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
    return (
        <AuthProvider>
            <WebSocketProvider>
                    <SedeProvider>
                        <DndProvider backend={HTML5Backend}>
                        <div className='app'>
                            <Router>
                                <MainRoutes />
                            </Router>
                        </div>
                        </DndProvider>
                    </SedeProvider>
                <ToastContainer />
            </WebSocketProvider>
        </AuthProvider>
    );
};

export default App;
