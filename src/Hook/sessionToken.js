import { useEffect } from 'react';
import axios from "axios";
import { API_BASE_URL } from "../utils/config";
import { toast } from 'react-toastify';

const useSessionVerification = (isAuthenticated, userData, logout) => {
    useEffect(() => {
        if (!isAuthenticated || !userData) {
            return;
        }

        const intervalId = setInterval(() => {
            const sessionToken = localStorage.getItem('sessionToken');
            const userId = userData.id_usuario;

            axios.get(`${API_BASE_URL}/auth/verifySessionToken`, { params: { sessionToken, userId } })
                .then(response => {
                    if (!response.data.isValid) {
                        logout();
                        toast.warn("Tu sesión ha sido cerrada porque se inició sesión en otro lugar.", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .catch(error => {
                    console.error('Error al verificar la sesión:', error);
                });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [isAuthenticated, userData, logout]);
};

export default useSessionVerification;
