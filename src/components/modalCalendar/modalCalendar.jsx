import React from 'react';
import ReactDOM from 'react-dom';
import { CustomModal, Button, EventList, EventListItem } from "./modalCalendarStyle";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const ModalCalendar = ({ isOpen, onRequestClose, selectedDate, onPatientSelect, citas }) => {
    const citasDelDia = citas.filter(cita => {
        const fechaCita = moment(cita.start).format('YYYY-MM-DD');
        const fechaSeleccionada = moment(selectedDate).format('YYYY-MM-DD');
        return fechaCita === fechaSeleccionada && cita.color === 'blue';
    });
    const handlePatientSelect = (paciente) => {
        onPatientSelect(paciente);
        onRequestClose();
    };
    const customStyles = {
        overlay: {
            zIndex: 10000
        }
    };

    return ReactDOM.createPortal(
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Eventos del Día"
            style={customStyles}
        >
            <div className="modal-header">
                <h2>{moment(selectedDate).format('MMMM Do YYYY')}</h2>
                <Button onClick={onRequestClose}>Cerrar</Button>
            </div>
            <EventList>
                {citasDelDia.map((cita, index) => (
                    <EventListItem key={index} onClick={() => handlePatientSelect(cita)}>
                        <span>{cita.title}</span>
                        <span>{moment(cita.start).format('h:mm a')}</span>
                    </EventListItem>
                ))}
            </EventList>
        </CustomModal>,
        document.getElementById('modal-root')
    );
};

export default ModalCalendar;
