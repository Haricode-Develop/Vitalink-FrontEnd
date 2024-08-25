import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
    CustomModal,
    Button,
    EventList,
    EventListItem,
    Input,
    Form,
    StyledInput,
    StyledSelect,
    InputGroup,
    StyledLabel,
    StyledList,
    StyledListItem,
    CheckboxLabel
} from "./modalCalendarStyle";
import moment from 'moment';
import axios from "axios";
import 'moment/locale/es';
import { AuthContext } from "../../context/AuthContext";
import { useSede } from "../../context/SedeContext";
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { getCountryCallingCode } from 'libphonenumber-js';
import { API_BASE_URL } from "../../utils/config";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

moment.locale('es');
const defaultCountryCode = 'GT';
const defaultCountryCallingCode = `+${getCountryCallingCode(defaultCountryCode)}`;

const ModalCalendar = ({ isOpen, onRequestClose, selectedDate, onPatientSelect, citas, estados, addExternalAppointment }) => {
    const { userData } = useContext(AuthContext);
    const { idSedeActual } = useSede();
    const [phone, setPhone] = useState(defaultCountryCallingCode);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const phoneInputRef = useRef(null);
    const [servicios, setServicios] = useState([]);
    const [selectedServicio, setSelectedServicio] = useState('');
    const [applyPackage, setApplyPackage] = useState(false);
    const [serviciosPaquete, setServiciosPaquete] = useState([]);
    const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null);

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
        minutos: '00',
        servicio: ''
    });

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setExternalAppointment(prev => ({ ...prev, [name]: value }));

        if (name === 'nombreInvitado' && value.trim() !== '') {
            try {
                const response = await axios.get(`${API_BASE_URL}/calendario/recomendacionContacto`, { params: { nombre: value.trim(), idSede: idSedeActual } });
                setPhoneNumbers(response.data.map(phone => phone.Telefono_Usuario || phone.Telefono_Invitado));
            } catch (error) {
                console.error('Error fetching contact recommendations:', error);
                setPhoneNumbers([]);
            }
        }
    };

    const agregarCitaExterna = async (event) => {
        event.preventDefault();

        if (!isPossiblePhoneNumber(externalAppointment.contactoInvitado)) {
            toast.warn('Por favor, ingrese un número de teléfono válido con la extensión.');
            return;
        }

        try {


            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            const formattedTime = `${externalAppointment.hora.padStart(2, '0')}:${externalAppointment.minutos.padStart(2, '0')}`;
            const citaData = {
                idPaciente: null,
                idUsuarioEdita: userData.id_usuario,
                fechaCita: formattedDate,
                horaCita: formattedTime,
                idEstado: externalAppointment.estado,
                nombreInvitado: externalAppointment.nombreInvitado,
                contactoInvitado: externalAppointment.contactoInvitado,
                idServicio: externalAppointment.servicio,
                idSede: idSedeActual
            };

            const idCita = await addExternalAppointment(citaData);

            if (applyPackage && idUsuario !== null && selectedServicio !== null && selectedServicio !== '') {
                await restarCantidadServicio(idUsuario, selectedServicio);
            } else {
                if(externalAppointment.servicio !== null && externalAppointment.servicio !== ''){
                    // Insertar servicio
                    await axios.post(`${API_BASE_URL}/gestionDeNegocios/usuarios/telefono/${externalAppointment.contactoInvitado}/servicios`, {
                        idServicio: externalAppointment.servicio,
                        fechaAsignacion: moment(selectedDate).utc().set({ hour: 6, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm:ss.SSS'),
                        idCita: idCita,
                        cantidad: 1
                    });
                }
            }

            // Reiniciar el formulario y limpiar el modal de servicios del paquete
            setExternalAppointment({
                nombreInvitado: '',
                contactoInvitado: defaultCountryCallingCode,
                estado: '',
                hora: '00',
                minutos: '00',
                servicio: '' // Resetear campo de servicio
            });
            setSelectedServicio('');
            setApplyPackage(false);
            setServiciosPaquete([]);
            setIsPackageModalOpen(false); // Cerrar el modal de servicios del paquete

        } catch (error) {
            console.error('Error al agregar la cita externa:', error);
            toast.warn('Ocurrió un error al añadir la cita externa');
        }
    };

    const customStyles = {
        overlay: {
            zIndex: 1030
        }
    };

    const handlePhoneChange = (selectedPhone) => {
        setPhone(selectedPhone);
        setExternalAppointment({ ...externalAppointment, contactoInvitado: selectedPhone });
        setPhoneNumbers([]);
    };

    const handleSelectPhoneNumber = (phone) => {
        console.log("Click en el número recomendado: ", phone);
        const formattedPhone = phone.includes('+') ? phone : `+${phone}`;
        console.log("Teléfono formateado y seleccionado: ", formattedPhone);
        setPhone(formattedPhone);
        setExternalAppointment(prev => ({
            ...prev,
            contactoInvitado: formattedPhone
        }));
        setPhoneNumbers([]);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (phoneInputRef.current && !phoneInputRef.current.contains(event.target)) {
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

    useEffect(() => {
        const fetchServiciosPorCita = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/gestionDeNegocios/servicios/aplica-cita`, {
                    params: { idSede: idSedeActual }
                });
                setServicios(response.data);
            } catch (err) {
                console.error('Error al obtener los servicios:', err);
            }
        };

        fetchServiciosPorCita();
    }, [idSedeActual]);

    const handleApplyPackageChange = async () => {
        const newApplyPackage = !applyPackage;
        setApplyPackage(newApplyPackage);

        if (newApplyPackage && isPossiblePhoneNumber(externalAppointment.contactoInvitado)) {
            try {
                const response = await axios.get(`${API_BASE_URL}/gestionDeNegocios/usuarios/telefono/${externalAppointment.contactoInvitado}/asignaciones`);
                const { idUsuario, paquetes } = response.data;
                console.log("ESTO ES LA RESPUESTA: ", response.data);
                setIdUsuario(idUsuario);

                if (paquetes.length > 0) {
                    const paquete = paquetes[0];
                    if (paquete.servicios.length > 0) {
                        setServiciosPaquete(paquete.servicios.filter(servicio => servicio.aplica_cita === 1 && servicio.cantidadDisponible > 0));
                        if(paquete.servicios.filter(servicio => servicio.aplica_cita === 1 && servicio.cantidadDisponible > 0).length > 0){
                            setIsPackageModalOpen(true);
                        }else{
                            Swal.fire({
                                title: 'Advertencia',
                                text: 'El paquete asignado no contiene servicios disponibles para citas.',
                                icon: 'warning',
                                confirmButtonText: 'Ok'
                            });
                        }
                        setExternalAppointment(prev => ({ ...prev, servicio: '' }));
                    } else {
                        Swal.fire({
                            title: 'Advertencia',
                            text: 'El paquete asignado no contiene servicios disponibles para citas.',
                            icon: 'warning',
                            confirmButtonText: 'Ok'
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Advertencia',
                        text: 'No hay paquetes asignados disponibles para el número de teléfono proporcionado.',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    });
                }
            } catch (error) {
                console.error('Error al obtener los servicios del paquete asignado:', error);
                if (error.response && error.response.status === 404) {
                    Swal.fire({
                        title: 'Usuario no asignado',
                        text: 'No se encontraron usuarios para el número indicado',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    toast.warn('Ocurrió un error al obtener los servicios del paquete asignado.');
                }
            }
        }
    };

    const handleServicioSeleccionado = async (servicioId) => {
        try {
            setExternalAppointment(prev => ({
                ...prev,
                servicio: servicioId
            }));
            setIsPackageModalOpen(false);
        } catch (error) {
            console.error('Error al seleccionar el servicio:', error);
        }
    };

    const restarCantidadServicio = async (idUsuario, idServicio) => {
        try {
           await axios.post(`${API_BASE_URL}/gestionDeNegocios/usuarios/${idUsuario}/servicios/${idServicio}/restar`);
        } catch (error) {
            console.error('Error al restar cantidad de servicio:', error);
            toast.error('Error al restar cantidad de servicio');
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
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="Número de teléfono"
                                required
                            />
                            {phoneNumbers.length > 0 && (
                                <StyledList style={{ position: 'absolute', left: '59px', width: '208px', zIndex: 1050, background: 'rgba(255, 255, 255, 0.9)' }}>
                                    {phoneNumbers.map((phone, index) => (
                                        <StyledListItem
                                            key={index}
                                            onMouseDown={() => {
                                                handleSelectPhoneNumber(phone);
                                            }}
                                            onTouchStart={() => {
                                                handleSelectPhoneNumber(phone);
                                            }}
                                        >
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
                            <StyledSelect
                                name="servicio"
                                value={externalAppointment.servicio}
                                onChange={handleInputChange}
                                disabled={applyPackage} // Deshabilitar si el checkbox de paquete está activo
                            >
                                <option value="">Seleccione un servicio</option>
                                {servicios.map(servicio => (
                                    <option key={servicio.ID_SERVICIO} value={servicio.ID_SERVICIO}>
                                        {servicio.TITULO}
                                    </option>
                                ))}
                            </StyledSelect>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    checked={applyPackage}
                                    onChange={handleApplyPackageChange}
                                    disabled={externalAppointment.servicio !== ''} // Deshabilitar si se seleccionó un servicio
                                />
                                Aplica paquete
                            </CheckboxLabel>
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
            <CustomModal
                isOpen={isPackageModalOpen}
                onRequestClose={() => setIsPackageModalOpen(false)}
                contentLabel="Servicios del Paquete"
                style={customStyles}
            >
                <div className="modal-header">
                    <h2>Servicios Disponibles del Paquete</h2>
                    <Button onClick={() => setIsPackageModalOpen(false)}>Cerrar</Button>
                </div>
                <EventList>
                    {serviciosPaquete.map(servicio => (
                        <EventListItem key={servicio.id} onClick={() => handleServicioSeleccionado(servicio.id)}>
                            <span>{servicio.titulo} - {servicio.precio} {servicio.moneda} - Cantidad disponible: {servicio.cantidadDisponible}</span>
                        </EventListItem>
                    ))}
                </EventList>
            </CustomModal>
        </CustomModal>,
        document.getElementById('modal-root')
    );
};

export default ModalCalendar;
