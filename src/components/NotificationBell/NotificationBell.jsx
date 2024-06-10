import React, { useEffect, useState, useContext, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import Draggable from 'react-draggable';
import axios from 'axios';
import { useWebSocket } from "../../context/WebSocketContext";
import { useSede } from '../../context/SedeContext';
import NotificationItem from '../NotificationItem/NotificationItem';
import {
    NotificationWrapper,
    BellIcon,
    NotificationList,
    NotificationMenu,
    MenuHeader,
    NoNotifications,
    UnreadBadge,
    LoadMoreButton
} from "./NotificationBellStyle";
import { API_BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const NotificationBell = () => {
    const { idSedeActual } = useSede();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true); // Nueva bandera para controlar el botón "Ver más"
    const { userData } = useContext(AuthContext);
    const { notifications: wsNotifications, setNotifications: setWsNotifications } = useWebSocket();
    const limit = 5; // Se mantiene constante para la paginación
    const notificationMenuRef = useRef(null);

    // Función para cargar las notificaciones con el total de no leídas
    const loadTotalUnreadCount = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/campanaNotificaciones/cargarNotificaciones`, {
                params: {
                    idUsuario: userData.id_usuario,
                    idSede: idSedeActual,
                    offset: 0,
                    limit: 1  // Utilizamos un límite de 1 para obtener solo el total de no leídas
                }
            });

            const totalUnreadCount = response.data.totalUnread; // Asegúrate de que el backend devuelva el total de no leídas
            setUnreadCount(totalUnreadCount);

        } catch (error) {
            console.error("Error al cargar el total de notificaciones no leídas:", error);
        }
    };

    // Cargar notificaciones de la sede actual
    const loadNotifications = async (clearExisting = false) => {
        try {
            const currentOffset = clearExisting ? 0 : offset;
            const response = await axios.get(`${API_BASE_URL}/campanaNotificaciones/cargarNotificaciones`, {
                params: {
                    idUsuario: userData.id_usuario,
                    idSede: idSedeActual,
                    offset: currentOffset,
                    limit
                }
            });

            const fetchedNotifications = response.data.notificaciones;

            if (clearExisting) {
                setNotifications(fetchedNotifications);
                setOffset(limit);
                setHasMore(fetchedNotifications.length === limit);
            } else {
                const newNotifications = [...notifications, ...fetchedNotifications];
                setNotifications(newNotifications);
                setOffset(currentOffset + limit);
                setHasMore(fetchedNotifications.length === limit);
            }
        } catch (error) {
            console.error("Error al cargar notificaciones:", error);
        }
    };

    useEffect(() => {
        loadNotifications(true);
        loadTotalUnreadCount(); // Cargar el total de no leídas al inicializar
    }, [idSedeActual]);

    useEffect(() => {
        if (wsNotifications.length > 0) {
            loadNotifications(true);  // Recargar notificaciones desde el servidor
            loadTotalUnreadCount();  // Recargar el total de no leídas
            setWsNotifications([]);  // Limpiar las notificaciones del WebSocket
        }
    }, [wsNotifications, setWsNotifications]);

    const handleBellClick = () => {
        setIsOpen(!isOpen);
    };

    const updateNotificationStatus = async (idNotificacion, leido) => {
        try {
            await axios.post(`${API_BASE_URL}/campanaNotificaciones/actualizarEstadoNotificacion`, {
                idNotificacion,
                leido
            });
            setNotifications(prevNotifications => {
                const updatedNotifications = prevNotifications.map(n =>
                    n.ID_NOTIFICACION === idNotificacion ? { ...n, LEIDO: leido ? 1 : 0 } : n
                );
                const totalUnread = updatedNotifications.filter(n => n.LEIDO === 0).length;
                setUnreadCount(totalUnread);
                return updatedNotifications;
            });
        } catch (error) {
            console.error("Error al actualizar el estado de la notificación:", error);
        }
    };

    const showMoreNotifications = () => {
        loadNotifications();
    };

    const handleClickOutside = (event) => {
        if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <NotificationWrapper>
            <BellIcon onClick={handleBellClick}>
                <FaBell size={35} color={'#000'} />
                {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
            </BellIcon>
            {isOpen && (
                <Draggable>
                    <NotificationMenu ref={notificationMenuRef}>
                        <MenuHeader>
                            <h3>Notificaciones</h3>
                        </MenuHeader>
                        <NotificationList>
                            {notifications.length === 0 ? (
                                <NoNotifications>No hay notificaciones</NoNotifications>
                            ) : (
                                notifications.map((n) => (
                                    <NotificationItem
                                        key={n.ID_NOTIFICACION}
                                        notification={n}
                                        updateStatus={(leido) => updateNotificationStatus(n.ID_NOTIFICACION, leido)}
                                    />
                                ))
                            )}
                        </NotificationList>
                        {hasMore && (
                            <LoadMoreButton onClick={showMoreNotifications}>Ver más</LoadMoreButton>
                        )}
                    </NotificationMenu>
                </Draggable>
            )}
        </NotificationWrapper>
    );
};

export default NotificationBell;
