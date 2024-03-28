import React, { useState, useEffect, useContext  } from 'react';
import {
    ActivityFeedContainer,
    ActivityTitle,
    ActivityList,
    ActivityItem,
    ActivityDescription,
    ActivityTime,
    ActivityIcon
} from "./FeedActividadStyle";
import axios from 'axios';
import { API_BASE_URL } from "../../utils/config";
import { FaEdit, FaPlus, FaTrash, FaRedo } from 'react-icons/fa'; // Importamos el icono FaRedo
import {SedeContext} from "../../context/SedeContext";
import { useWebSocket } from '../../context/WebSocketContext';

const ActivityFeed = ({ idRol, idAccion, idInstitucion, idEntidadAfectada }) => {
    const [activities, setActivities] = useState([]);
    const { idSedeActual } = useContext(SedeContext);
    const { ws } = useWebSocket();


    useEffect(() => {
        if (ws && idSedeActual) {
            ws.send(JSON.stringify({
                type: 'GET_ACTION_HISTORY',
                payload: { idRol, idAccion, idSede: idSedeActual, idEntidadAfectada }
            }));
        }

        const handleActivityUpdate = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'ACTION_HISTORY_RESPONSE') {
                setActivities(data.historial);
            } else if (data.type === 'ACTION_HISTORY_UPDATED') {
                setActivities(prevActivities => [data.payload, ...prevActivities]);
            }
        };

        if (ws) {
            ws.addEventListener('message', handleActivityUpdate);
        }

        return () => {
            if (ws) {
                ws.removeEventListener('message', handleActivityUpdate);
            }
        };
    }, [ws, idRol, idAccion, idSedeActual, idEntidadAfectada]);



    const getIcon = (action) => {
        switch (action) {
            case 'Añadido':
                return <FaPlus color="green" />;
            case 'Editado':
                return <FaEdit color="orange" />;
            case 'Eliminado':
                return <FaTrash color="red" />;
            case 'Reingresado':
                return <FaRedo color="blue" />;
            default:
                return <FaEdit />;
        }
    };
    const formatDate = (dateString) => {
        const [dateComponent, timeComponent] = dateString.split('T');
        const [year, month, day] = dateComponent.split('-');
        const [hours, minutes] = timeComponent.replace('Z', '').split(':');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    return (
        <ActivityFeedContainer className={"FeedActividades"}>
            <ActivityTitle>Feed de Actividades</ActivityTitle>
            <ActivityList>
                {activities.map((activity, index) => (
                    <ActivityItem key={index}>
                        <ActivityIcon>{getIcon(activity.NOMBRE_ACCION)}</ActivityIcon>
                        <ActivityDescription>
                            <strong>Editado por:</strong> {activity.NOMBRE_USUARIO}<br />
                            <strong>Acción:</strong> {activity.NOMBRE_ACCION}<br />
                            <strong>Afectado:</strong> {activity.NOMBRE_USUARIO_AFECTADO} {activity.APELLIDO_USUARIO_AFECTADO}
                        </ActivityDescription>
                        <ActivityTime>{formatDate(activity.FECHA_ACCION)}</ActivityTime>
                    </ActivityItem>
                ))}
            </ActivityList>
        </ActivityFeedContainer>
    );
};

export default ActivityFeed;
