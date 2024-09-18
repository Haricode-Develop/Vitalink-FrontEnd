import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/config';
import { AuthContext } from './AuthContext';

// Crear el contexto
export const SidebarContext = createContext();

// Proveedor del contexto
export const SidebarProvider = ({ children }) => {
    const [sidebarState, setSidebarState] = useState({
        profileImageUrl: null,
        notificationCount: 0,
    });

    const { userData } = useContext(AuthContext);

    // Memoizar updateProfileImageUrl para evitar que cambie en cada render
    const updateProfileImageUrl = useCallback((newUrl) => {
        setSidebarState((prevState) => ({
            ...prevState,
            profileImageUrl: newUrl,
        }));
    }, []); // No hay dependencias que deban cambiar

    const updateNotificationCount = (count) => {
        setSidebarState((prevState) => ({
            ...prevState,
            notificationCount: count,
        }));
    };

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (userData && userData.id_usuario) { // Verificación de que userData no es null
                try {
                    const response = await axios.get(`${API_BASE_URL}/cuenta/fotoPerfil/${userData.id_usuario}`);

                    if (response.data.success && response.data.fotoPerfilUrl) {
                        updateProfileImageUrl(response.data.fotoPerfilUrl);
                    } else {
                        updateProfileImageUrl(null);
                    }
                } catch (error) {
                    console.error('Error al obtener la foto de perfil:', error);
                    updateProfileImageUrl(null);
                }
            }
        };

        fetchProfileImage();
    }, [userData, updateProfileImageUrl]);

    return (
        <SidebarContext.Provider value={{ sidebarState, updateProfileImageUrl, updateNotificationCount }}>
            {children}
        </SidebarContext.Provider>
    );
};
