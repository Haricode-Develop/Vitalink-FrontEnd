import { useEffect, useContext } from 'react';
import { useWebSocket } from "../context/WebSocketContext";
import { toast } from 'react-toastify';

const useSessionVerification = (isAuthenticated, userData, logout) => {
    const { ws } = useWebSocket();

    useEffect(() => {
        if (!isAuthenticated || !userData || !ws) {
            return;
        }

        const handleMessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'DISCONNECT') {
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
        };

        ws.addEventListener('message', handleMessage);

        const verifySession = () => {
            if (ws.readyState === WebSocket.OPEN) {
                const sessionToken = localStorage.getItem('sessionToken');
                const userId = userData.id_usuario;
                ws.send(JSON.stringify({ type: 'VERIFY_SESSION', payload: { userId, sessionToken } }));
            }
        };

        verifySession();

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [isAuthenticated, userData, logout, ws]);
};

export default useSessionVerification;
