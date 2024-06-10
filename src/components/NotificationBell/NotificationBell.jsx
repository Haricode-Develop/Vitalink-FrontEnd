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
    const [hasMore, setHasMore] = useState(true);
    const { userData } = useContext(AuthContext);
    const { notifications: wsNotifications, setNotifications: setWsNotifications } = useWebSocket();
    const limit = 5;
    const notificationMenuRef = useRef(null);
    const notificationListRef = useRef(null);

    const isMobileDevice = () => window.innerWidth <= 768;

    // Función para manejar el inicio del scroll
    const handleTouchStart = (event) => {
        if (isMobileDevice() && notificationListRef.current && notificationListRef.current.contains(event.target)) {
            notificationListRef.current.style.overflowY = 'auto';
        }
    };

    // Función para manejar el final del scroll
    const handleTouchEnd = (event) => {
        if (isMobileDevice() && notificationListRef.current) {
            notificationListRef.current.style.overflowY = 'hidden';
        }
    };

    // Función para cargar las notificaciones con el total de no leídas
    const loadTotalUnreadCount = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/campanaNotificaciones/cargarNotificaciones`, {
                params: {
                    idUsuario: userData.id_usuario,
                    idSede: idSedeActual,
                    offset: 0,
                    limit: 1
                }
            });

            const totalUnreadCount = response.data.totalUnread;
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
        loadTotalUnreadCount();
    }, [idSedeActual]);

    useEffect(() => {
        if (wsNotifications.length > 0) {
            loadNotifications(true);
            loadTotalUnreadCount();
            setWsNotifications([]);
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

    const showMoreNotifications = (event) => {
        event.stopPropagation(); // Evita que el evento de clic se propague
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

    useEffect(() => {
        const notificationList = notificationListRef.current;
        if (notificationList) {
            notificationList.addEventListener('touchstart', handleTouchStart);
            notificationList.addEventListener('touchend', handleTouchEnd);
        }
        return () => {
            if (notificationList) {
                notificationList.removeEventListener('touchstart', handleTouchStart);
                notificationList.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, []);

    return (
        <NotificationWrapper>
            <BellIcon onClick={handleBellClick}>
                <FaBell size={35} color={'#000'} />
                {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
            </BellIcon>
            {isOpen && (
                <Draggable cancel='.notification-list, .load-more-button'>
                    <NotificationMenu ref={notificationMenuRef}>
                        <MenuHeader>
                            <h3>Notificaciones</h3>
                        </MenuHeader>
                        <NotificationList ref={notificationListRef} className='notification-list'>
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
                            <LoadMoreButton
                                className='load-more-button'
                                onClick={showMoreNotifications}
                            >
                                Ver más
                            </LoadMoreButton>
                        )}
                    </NotificationMenu>
                </Draggable>
            )}
        </NotificationWrapper>
    );
};

export default NotificationBell;
