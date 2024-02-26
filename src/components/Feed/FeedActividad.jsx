import React, { useState, useEffect } from 'react';
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

const ActivityFeed = ({ idRol, idAccion, idInstitucion, idEntidadAfectada }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/historialAccionesAdministrador/${idRol}/${idAccion}/${idInstitucion}/${idEntidadAfectada}`);
                setActivities(response.data.historial);
            } catch (error) {
                console.error('Error al obtener actividades:', error);
            }
        };

        fetchActivities();
        const interval = setInterval(fetchActivities, 5000);
        return () => clearInterval(interval);
    }, [idRol, idAccion]);

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
                        <ActivityTime>{new Date(activity.FECHA_ACCION).toLocaleString()}</ActivityTime>
                    </ActivityItem>
                ))}
            </ActivityList>
        </ActivityFeedContainer>
    );
};

export default ActivityFeed;
