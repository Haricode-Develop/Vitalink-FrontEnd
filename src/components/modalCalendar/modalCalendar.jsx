import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CustomModal, Button, EventList, EventListItem, Input, Form, StyledInput, StyledSelect, InputGroup, StyledLabel} from "./modalCalendarStyle";
import moment from 'moment';
import 'moment/locale/es';
import {AuthContext} from "../../context/AuthContext";

moment.locale('es');

const ModalCalendar = ({ isOpen, onRequestClose, selectedDate, onPatientSelect, citas, estados, addExternalAppointment }) => {
    const { userData } = useContext(AuthContext);

    const citasDelDia = citas.filter(cita => {
        const fechaCita = moment(cita.start).format('YYYY-MM-DD');
        const fechaSeleccionada = moment(selectedDate).format('YYYY-MM-DD');
        return fechaCita === fechaSeleccionada && cita.color === 'blue';
    });

    const [externalAppointment, setExternalAppointment] = useState({
        nombreInvitado: '',
        contactoInvitado: '',
        estado: '',
        hora: '00',
        minutos: '00'
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExternalAppointment({ ...externalAppointment, [name]: value });
    };
    const agregarCitaExterna = (event) => {
        event.preventDefault();
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        const formattedTime = `${externalAppointment.hora.padStart(2, '0')}:${externalAppointment.minutos.padStart(2, '0')}`;

        addExternalAppointment({
            idPaciente: null,
            idUsuarioEdita: userData.id_usuario,
            fechaCita: formattedDate,
            horaCita: formattedTime,
            idEstado: externalAppointment.estado,
            nombreInvitado: externalAppointment.nombreInvitado,
            contactoInvitado: externalAppointment.contactoInvitado
        });
    };

    const customStyles = {
        overlay: {
            zIndex: 1030
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
            <Tabs>
                <TabList>
                    <Tab>Citas del día</Tab>
                    <Tab>Agregar cita externa</Tab>
                </TabList>

                <TabPanel>
                    <EventList>
                        {citasDelDia.map((cita, index) => (
                            <EventListItem key={index} onClick={() => onPatientSelect(cita)}>
                                <span>{cita.title}</span>
                                <span>{moment(cita.start).format('h:mm a')}</span>
                            </EventListItem>
                        ))}
                    </EventList>
                </TabPanel>
                <TabPanel>
                    <Form onSubmit={agregarCitaExterna}>
                        <InputGroup>
                            <StyledInput
                                type="text"
                                placeholder="Nombre completo"
                                name="nombreInvitado"
                                value={externalAppointment.nombreInvitado}
                                onChange={handleInputChange}
                                required />
                            <StyledInput
                                type="text"
                                placeholder="Contacto (teléfono o email)"
                                name="contactoInvitado"
                                value={externalAppointment.contactoInvitado}
                                onChange={handleInputChange}
                                required />
                        </InputGroup>
                        <InputGroup>
                            <StyledInput
                                type="number"
                                placeholder="Hora"
                                name="hora"
                                value={externalAppointment.hora}
                                onChange={handleInputChange}
                                min="0" max="23" required />
                            <StyledLabel>:</StyledLabel>
                            <StyledInput
                                type="number"
                                placeholder="Minutos"
                                name="minutos"
                                value={externalAppointment.minutos}
                                onChange={handleInputChange}
                                min="0" max="59" required />
                        </InputGroup>
                        <StyledSelect
                            name="estado"
                            value={externalAppointment.estado}
                            onChange={handleInputChange}
                            required>
                            <option value="">Seleccione un estado</option>
                            {estados.map(estado => (
                                <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                            ))}
                        </StyledSelect>
                        <Button type="submit">Agregar Cita</Button>
                    </Form>
                </TabPanel>
            </Tabs>
        </CustomModal>,
        document.getElementById('modal-root')
    );
};

export default ModalCalendar;
