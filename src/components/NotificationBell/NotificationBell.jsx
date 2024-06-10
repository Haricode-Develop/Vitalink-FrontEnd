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
    const { userData } = useContext(AuthContext);
    const limit = 5;
    const notificationMenuRef = useRef(null);

    // Cargar notificaciones de la sede actual
    const loadNotifications = async (clearExisting = false) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/campanaNotificaciones/cargarNotificaciones`, {
                params: {
                    idUsuario: userData.id_usuario,
                    idSede: idSedeActual,
                    offset: clearExisting ? 0 : offset,
                    limit
                }
            });
            if (clearExisting) {
                setNotifications(response.data.notificaciones);
                const unreadNotifications = response.data.notificaciones.filter(n => n.LEIDO === 0).length;
                setUnreadCount(unreadNotifications);
            } else {
                const newNotifications = [...notifications, ...response.data.notificaciones];
                setNotifications(newNotifications);
                const unreadNotifications = newNotifications.filter(n => n.LEIDO === 0).length;
                setUnreadCount(unreadNotifications);
            }
            setOffset(prev => prev + limit);
        } catch (error) {
            console.error("Error al cargar notificaciones:", error);
        }
    };

    useEffect(() => {
        loadNotifications(true);
    }, [idSedeActual]);

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
                const unreadNotificationsCount = updatedNotifications.filter(n => n.LEIDO === 0).length;
                setUnreadCount(unreadNotificationsCount);
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
                <FaBell size={24} color={'#EBE25B'}  />
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
                        {notifications.length > 0 && notifications.length % limit === 0 && (
                            <LoadMoreButton onClick={showMoreNotifications}>Ver más</LoadMoreButton>
                        )}
                    </NotificationMenu>
                </Draggable>
            )}
        </NotificationWrapper>
    );
};

export default NotificationBell;
