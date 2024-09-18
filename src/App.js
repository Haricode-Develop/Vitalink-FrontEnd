import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './MainRoutes';
import 'typeface-roboto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WebSocketProvider } from "./context/WebSocketContext";
import {SidebarProvider} from "./context/SidebarContext";
import { SedeProvider } from "./context/SedeContext";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <WebSocketProvider>
                    <SedeProvider>
                            <SidebarProvider>
                                <DndProvider backend={HTML5Backend}>
                                    <div className='app'>
                                        <MainRoutes />
                                    </div>
                                </DndProvider>
                            </SidebarProvider>
                    </SedeProvider>
                </WebSocketProvider>
                <ToastContainer />
            </AuthProvider>
        </Router>
    );
};

export default App;
