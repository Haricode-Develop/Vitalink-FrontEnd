import React, { createContext, useContext, useEffect, useState } from 'react';
import {API_BASE_URL_SOCKET} from "../utils/config";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [ws, setWs] = useState(null);
    let reconnectInterval = 2000;
    useEffect(() => {
        const connectWebSocket = () => {
            const webSocket = new WebSocket(API_BASE_URL_SOCKET);

            webSocket.onopen = () => {
                console.log('WebSocket connected');
                reconnectInterval = 2000;
            };

            webSocket.onclose = () => {
                console.log('WebSocket disconnected. Reconnecting...');
                setTimeout(connectWebSocket, reconnectInterval);
                reconnectInterval *= 2;
            };

            webSocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                webSocket.close();
            };

            setWs(webSocket);
        };

        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws, closeWebSocket: () => ws?.close() }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};