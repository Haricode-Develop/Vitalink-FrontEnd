import React, {useContext, useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CustomModal, Button, EventList, EventListItem, Input, Form, StyledInput, StyledSelect, InputGroup, StyledLabel, StyledList, StyledListItem} from "./modalCalendarStyle";
import moment from 'moment';
import axios from "axios";
import 'moment/locale/es';
import {AuthContext} from "../../context/AuthContext";
import {useSede} from "../../context/SedeContext";
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { getCountryCallingCode } from 'libphonenumber-js';
import { API_BASE_URL } from "../../utils/config";

moment.locale('es');
const defaultCountryCode = 'GT';
const defaultCountryCallingCode = `+${getCountryCallingCode(defaultCountryCode)}`;

const ModalCalendar = ({ isOpen, onRequestClose, selectedDate, onPatientSelect, citas, estados, addExternalAppointment }) => {
    const { userData } = useContext(AuthContext);
    const { idSedeActual } = useSede();
    const [phone, setPhone] = useState(defaultCountryCallingCode);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const phoneInputRef = useRef(null);

    const citasDelDia = citas.filter(cita => {
        const fechaCita = moment(cita.start).format('YYYY-MM-DD');
        const fechaSeleccionada = moment(selectedDate).format('YYYY-MM-DD');
        return fechaCita === fechaSeleccionada && (cita.color === 'blue' || cita.color === 'green' || cita.color === 'orange');
    });

    const [externalAppointment, setExternalAppointment] = useState({
        nombreInvitado: '',
        contactoInvitado: '',
        estado: '',
        hora: '00',
        minutos: '00'
    });
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setExternalAppointment(prev => ({ ...prev, [name]: value }));

        if (name === 'nombreInvitado' && value.trim() !== '') {
            try {
                const response = await axios.get(`${API_BASE_URL}/calendario/recomendacionContacto`, { params: { nombre: value.trim() } });
                setPhoneNumbers(response.data.map(phone => phone.Telefono_Usuario || phone.Telefono_Invitado));
            } catch (error) {
                console.error('Error fetching contact recommendations:', error);
                setPhoneNumbers([]);
            }
        }
    };

    const agregarCitaExterna = (event) => {
        event.preventDefault();
        if (!isPossiblePhoneNumber(externalAppointment.contactoInvitado)) {
            alert('Por favor, ingrese un número de teléfono válido con la extensión.');
            return;
        }
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        const formattedTime = `${externalAppointment.hora.padStart(2, '0')}:${externalAppointment.minutos.padStart(2, '0')}`;
        addExternalAppointment({
            idPaciente: null,
            idUsuarioEdita: userData.id_usuario,
            fechaCita: formattedDate,
            horaCita: formattedTime,
            idEstado: externalAppointment.estado,
            nombreInvitado: externalAppointment.nombreInvitado,
            contactoInvitado: externalAppointment.contactoInvitado,
            idSede: idSedeActual
        });
        setExternalAppointment({
            nombreInvitado: '',
            contactoInvitado: defaultCountryCallingCode,
            estado: '',
            hora: '00',
            minutos: '00'
        });
    };

    const customStyles = {
        overlay: {
            zIndex: 1030
        }
    };

    const handlePhoneChange = (selectedPhone) => {
        console.log("ESTE ES EL TELEFONO: ", selectedPhone);
        setExternalAppointment({ ...externalAppointment, contactoInvitado: selectedPhone });
        console.log("ESTE ES EL EXTERNAL APPOINTMENT: ", externalAppointment);
        setPhoneNumbers([]);
    };

    const handleSelectPhoneNumber = (phone) => {
        console.log("ESTE ES EL TELEFONO SELECCIONADO");
        setExternalAppointment(prev => ({
            ...prev,
            contactoInvitado: phone.includes('+') ? phone : `+${phone}`
        }));
        console.log("ESTOS SON LOS EXTERNAL: ", externalAppointment);
        setPhoneNumbers([]);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (!phoneInputRef && !phoneInputRef.current &&!phoneInputRef.current.contains(event.target)) {
                setPhoneNumbers([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchend', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchend', handleClickOutside);
        };
    }, []);

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
                                <span>{cita.title + " "}</span>
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
                                required
                            />
                        </InputGroup>
                        <InputGroup>
                            <PhoneInput
                                ref={phoneInputRef}
                                international
                                defaultCountry={defaultCountryCode}
                                value={externalAppointment.contactoInvitado}
                                onChange={handlePhoneChange}
                                placeholder="Número de teléfono"
                                required
                            />
                            {phoneNumbers.length > 0 && (
                                <StyledList style={{ position: 'absolute', left: '59px', width: '208px', zIndex: 1050, background: 'rgba(255, 255, 255, 0.9)' }}>
                                    {phoneNumbers.map((phone, index) => (
                                        <StyledListItem key={index} onClick={() => handleSelectPhoneNumber(phone)}>
                                            {phone}
                                        </StyledListItem>
                                    ))}
                                </StyledList>
                            )}
                            <StyledSelect
                                name="estado"
                                value={externalAppointment.estado}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccione un estado</option>
                                {estados.map(estado => (
                                    <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                                ))}
                            </StyledSelect>
                        </InputGroup>

                        <InputGroup>
                            <StyledInput
                                type="number"
                                placeholder="Hora"
                                name="hora"
                                value={externalAppointment.hora}
                                onChange={handleInputChange}
                                min="0" max="23"
                                required
                            />
                            <StyledLabel>:</StyledLabel>
                            <StyledInput
                                type="number"
                                placeholder="Minutos"
                                name="minutos"
                                value={externalAppointment.minutos}
                                onChange={handleInputChange}
                                min="0" max="59"
                                required
                            />
                        </InputGroup>
                        <Button type="submit">Agregar Cita</Button>
                    </Form>
                </TabPanel>
            </Tabs>
        </CustomModal>,
        document.getElementById('modal-root')
    );
};

export default ModalCalendar;
