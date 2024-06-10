import React from 'react';
import { Details, Message, Notification, Time, MarkAsReadCheckbox } from './NotificationItemStyle';

const NotificationItem = ({ notification, updateStatus }) => {
    const handleCheckboxChange = (e) => {
        e.stopPropagation(); // Evitar que el clic en el checkbox propague al contenedor
        updateStatus(notification.LEIDO === 0);
    };

    const handleItemClick = () => {
        updateStatus(notification.LEIDO === 0);
    };

    return (
        <Notification leido={notification.LEIDO === 1} onClick={handleItemClick}>
            <MarkAsReadCheckbox
                type="checkbox"
                checked={notification.LEIDO === 1}
                onChange={handleCheckboxChange}
                title={notification.LEIDO === 1 ? "Marcar como no leída" : "Marcar como leída"}
            />
            <Details>
                <Message>{notification.MENSAJE}</Message>
                <Time>{new Date(notification.FECHA_LOCAL).toLocaleString()}</Time>
            </Details>
        </Notification>
    );
};

export default NotificationItem;
