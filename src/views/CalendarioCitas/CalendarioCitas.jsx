// AppointmentCalendar.js
import React, { useContext, useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { StyledModal } from '../../components/Modal';
import {
    Container,
    CalendarContainer,
    ScrollablePatientList,
    Patient,
    StyledInput,
    StyledButton,
    StyledSelect,
    InputGroup,
    StyledLabel,
    ModalContent,
    FixedSearchContainer,
    FixedFilterButton,
    SearchContainer,
    ModalHeader,
    SearchButton,
    CloseButton,
    ResetButton,
    PatientList,
    PatientSearch,
    FilterGroup,
    TimeInput,
    LegendColor,
    LegendContainer,
    LegendItem,
    LegendText
} from './CalendarioCitasStyle';
import axios from "axios";
import { API_BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { FaFilter, FaSave, FaSearch, FaTimes, FaUndo } from 'react-icons/fa';
import ModalCalendar from "../../components/modalCalendar/modalCalendar";
import moment from 'moment';
import 'moment/locale/es';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {useSede} from "../../context/SedeContext";

moment.locale('es');
const FILTER_OPTIONS = {
    ALL: 'all',
    PAST: 'past',
    CURRENT: 'current'
};



const AppointmentCalendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const { userData } = useContext(AuthContext);
    const { idSedeActual } = useSede();

    const [pacientes, setPacientes] = useState([]);
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const [filterdPacientesCalendario, setFilterdPacientesCalendario] = useState([]);
    const [pacientesConCitaFilter,setPacientesConCitaFilter] = useState([]);
    const [pacientesConCitaHistorialFilter, setPacientesConCitaHistorialFilter] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState({ hour: '10', minute: '00' });
    const [estados, setEstados] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [colorEvent, setColorEvent] = useState('blue');
    const [calendarKey, setCalendarKey] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermCalendar, setSearchTermCalendar] = useState('');
    const [removingPatients, setRemovingPatients] = useState([]);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [filter, setFilter] = useState(FILTER_OPTIONS.CURRENT);
    const [shouldFilterEvents, setShouldFilterEvents] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const calendarRef = useRef(null);
    const [modalCalendarOpen, setModalCalendarOpen] = useState(false);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [estadosCargados, setEstadosCargados] = useState(false);

    const handlePatientClick = (patient) => {
        const validDate = selectedDate instanceof Date && !isNaN(selectedDate);
        if (!validDate) {
            setSelectedDate(new Date());
        }
        setSelectedPatient(patient);
        setModalIsOpen(true);
    };

    const findEstadoNameById = (id) => {//
        const estado = estados.find(e => String(e.id) === String(id));
        return estado ? estado.nombre : 'Estado no encontrado';
    };
    const handleSearchSubmit = () => {
        if (!searchTermCalendar) {
            return;
        }
        const filteredAppointments = allEvents.filter(event =>
            event.title.toLowerCase().includes(searchTermCalendar.toLowerCase())
        );
        if (filteredAppointments.length > 0) {
            setCurrentEvents(filteredAppointments);
        } else {
            toast.error('No se encontraron citas con ese criterio.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
        }
    };

    const handleResetCalendarView = () => {
        setCurrentEvents(allEvents);
        setSearchTermCalendar('');
    };


    const handleEventClick = ({ event }) => {
        if (event.extendedProps.readOnly) {

            toast.info(`Cita: ${event.title} - Fecha: ${event.start.toLocaleDateString()} - Hora: ${event.extendedProps.startTime}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
        } else {
            if (!event.extendedProps.readOnly) {
                setSelectedDate(event.start);
                setModalCalendarOpen(true);
            } else {


                setSelectedEvent({
                    id: event.extendedProps.idCita,
                    date: event.start,
                    estado: event.extendedProps.estado,
                    hour: event.extendedProps.startTime.split(':')[0],
                    minute: event.extendedProps.startTime.split(':')[1],
                    idEstado: event.extendedProps.idEstado,
                    nombreInvitado: event.extendedProps.nombreInvitado,
                    contactoInvitado: event.extendedProps.contactoInvitado
                });

                if (!event.extendedProps.idUsuario) {
                    setSelectedPatient({
                        idUsuario: null,
                        nombre: event.extendedProps.nombreInvitado,
                        email: event.extendedProps.contactoInvitado
                    });
                } else {
                    const patient = pacientesConCitaFilter.find(p => p.idUsuario === event.extendedProps.idUsuario);
                    if (!patient) {
                        toast.error('No se encontró el paciente seleccionado.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            hideProgressBar: true,
                        });
                        return;
                    }
                    setSelectedPatient(patient);
                }

                setEditModalOpen(true);
            }
        }
    };
    const handleSelectPatientFromCalendar = (cita) => {
        if (cita.extendedProps.idUsuario) {
            const patient = pacientesConCitaFilter.find(p => p.idUsuario === cita.extendedProps.idUsuario);
            if (!patient) {
                toast.error('No se encontró el paciente seleccionado.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
                return;
            }
            setSelectedPatient(patient);
        } else {
            setSelectedPatient({
                idUsuario: null,
                nombre: cita.extendedProps.nombreInvitado,
                email: cita.extendedProps.contactoInvitado,
            });
        }
        const startTime = cita.extendedProps.startTime ? cita.extendedProps.startTime.split(':') : ['00', '00'];
        setSelectedEvent({
            id: cita.extendedProps.idCita,
            date: cita.start,
            estado: cita.extendedProps.estado,
            hour: startTime[0],
            minute: startTime[1],
            idEstado: cita.extendedProps.idEstado,
            nombreInvitado: cita.extendedProps.nombreInvitado,
            contactoInvitado: cita.extendedProps.contactoInvitado
        });

        setEditModalOpen(true);
        setModalCalendarOpen(true);
    };
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        if (!searchTerm) {
            setFilteredPacientes(pacientes);
        } else {
            setFilteredPacientes(pacientes.filter(patient => {
                const nameMatch = patient.nombre.toLowerCase().includes(searchTerm) ||
                    patient.apellido.toLowerCase().includes(searchTerm);
                const emailMatch = patient.email && patient.email.toLowerCase().includes(searchTerm);
                return nameMatch || emailMatch;
            }));
        }
    };

    const addExternalAppointment = async (appointmentData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/paciente/citas`, appointmentData);
            toast.success('Cita externa agregada correctamente.');
            const citaId = response.data.citaId;

            const newEvent = {
                id: response.data.id,
                title: `${appointmentData.nombreInvitado}`,
                start: `${appointmentData.fechaCita}T${appointmentData.horaCita}`,
                allDay: false,
                color: 'blue',
                extendedProps: {
                    estado: appointmentData.estado,
                    idEstado: appointmentData.idEstado,
                    idCita: citaId,
                    nombreInvitado: appointmentData.nombreInvitado,
                    contactoInvitado: appointmentData.contactoInvitado
                },
            };

            setAllEvents(prevEvents => [...prevEvents, newEvent]);
            setCurrentEvents(prevEvents => [...prevEvents, newEvent]);
            setModalCalendarOpen(false);

            calendarRef.current.getApi().refetchEvents();
        } catch (error) {
            console.error('Error al agregar la cita externa:', error);
            toast.error('Error al agregar la cita externa.');
        }
    };

    const handleSearchChangeCalendar = (e) => {
        const searchTerm = e.target.value;
        setSearchTermCalendar(searchTerm);
        const searchTermLower = searchTerm.toLowerCase();
        if (!searchTermLower) {
            setFilterdPacientesCalendario(pacientes);
        } else {
            setFilterdPacientesCalendario(pacientes.filter(patient => {
                const nombre = patient.nombre ? patient.nombre.toLowerCase().includes(searchTermLower) : false;
                const apellido = patient.apellido ? patient.apellido.toLowerCase().includes(searchTermLower) : false;
                const email = patient.email ? patient.email.toLowerCase().includes(searchTermLower) : false;

                return nombre || apellido || email;
            }));
        }
    };


    const createEventObject = (selectedPatient, dateWithTime, estadoName, startTime, idUsuario) => {
        return {
            id: `event-${idUsuario}-${Date.now()}`,
            title: `${selectedPatient.nombre} ${selectedPatient.apellido}`,
            start: dateWithTime,
            allDay: false,
            extendedProps: {
                estado: estadoName,
                startTime: startTime,
                idUsuario: idUsuario,
            }
        };
    };

    useEffect(() => {
        if (shouldFilterEvents) {

            setCurrentEvents(filterEvents(allEvents));

            setShouldFilterEvents(false);
        }
    }, [shouldFilterEvents, allEvents, filter]);


    useEffect(() => {
        setFilteredPacientes(pacientes);
    }, [pacientes]);




    useEffect(() => {
        const filteredData = async () => {
            const filtered = await filterEvents(allEvents);
            setCurrentEvents(filtered);
        };
        filteredData();

    }, [allEvents, filter]);
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setShouldFilterEvents(true);
    };
    const filterEvents = async (events) => {
        switch (filter) {
            case FILTER_OPTIONS.PAST:
                return allEvents.filter(event => event.color === 'red');
            case FILTER_OPTIONS.CURRENT:
                return allEvents.filter(event => ['orange', 'blue', 'green'].includes(event.color));
            case FILTER_OPTIONS.ALL:
            default:
                return allEvents;
        }
    };
    const findLastIndex = (array, searchFunction) => {
        for (let i = array.length - 1; i >= 0; i--) {
            if (searchFunction(array[i])) {
                return i;
            }
        }
        return -1;
    };
    const handleDateSubmit = async () => {
        if (selectedPatient && selectedDate) {
            const dateWithTime = moment(selectedDate).set({
                hour: parseInt(startTime.hour, 10),
                minute: parseInt(startTime.minute, 10),
                second: 0
            }).toDate();


            dateWithTime.setHours(parseInt(startTime.hour, 10), parseInt(startTime.minute, 10));
            const formattedDate = moment(dateWithTime).format('YYYY-MM-DD');
            const formattedTime = `${startTime.hour.padStart(2, '0')}:${startTime.minute.padStart(2, '0')}:00`;

            const estadoName = findEstadoNameById(selectedEstado);

            const newEvent = createEventObject(selectedPatient, dateWithTime, estadoName, `${startTime.hour}:${startTime.minute}`, selectedPatient.idUsuario);

            axios.post(`${API_BASE_URL}/paciente/citas`, {
                idPaciente: selectedPatient.idUsuario,
                idUsuarioEdita: userData.id_usuario,
                fechaCita: formattedDate,
                horaCita: formattedTime,
                estado: estadoName,
                idEstado: selectedEstado,
                idSede: idSedeActual,
            })
                .then(async response => {
                    const addedEvent = {
                        id: response.data.citaId,
                        title: `${selectedPatient.nombre} ${selectedPatient.apellido}`,
                        start: dateWithTime,
                        allDay: false,
                        color: 'blue',
                        extendedProps: {
                            estado: estadoName,
                            idEstado: selectedEstado,
                            startTime: formattedTime,
                            idUsuario: selectedPatient.idUsuario
                        }
                    };

                    setAllEvents((prevEvents) => [...prevEvents, addedEvent]);
                    setCurrentEvents((prevEvents) => [...prevEvents, addedEvent]);
                    const newPacientes = pacientes.filter(p => p.idUsuario !== selectedPatient.idUsuario);
                    setPacientes(newPacientes);
                    setFilteredPacientes(newPacientes);
                    setSelectedEstado('');
                    setModalIsOpen(false);
                    await cargarPacientesConCita();
                    await cargarPacientesConCitaHistorial();

                    setTimeout(() => {
                        calendarRef.current.getApi().refetchEvents();
                    }, 100);

                }).catch(error => {
                console.error('Error al crear la cita', error);
                toast.error('Error al crear la cita.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            });

            setRemovingPatients((oldRemoving) => [...oldRemoving, selectedPatient.idUsuario]);

        } else {
            toast.error('Debe seleccionar un paciente y una fecha.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
        }
    };

    const handleDateClick = (arg) => {


            setSelectedDate(arg.dateStr);
            setModalCalendarOpen(true);


    };
    const handleDeleteCita = async (idCita) => {
        try {
            await axios.delete(`${API_BASE_URL}/paciente/eliminarCita/${idCita}`);
            toast.success('Cita eliminada con éxito.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });

            const updatedEvents = allEvents.filter(event => event.extendedProps.idCita !== idCita);
            setAllEvents(updatedEvents);
            setCurrentEvents(updatedEvents);

            setEditModalOpen(false);
            setModalCalendarOpen(false)
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
            toast.error('Error al eliminar la cita.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
        }
    };
    const handleUpdateCita = () => {
        if (!selectedEvent) {
            toast.error('Información de la cita no disponible.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            return;
        }

        if (selectedEvent && selectedEvent.id && selectedEvent.date && selectedEvent.hour && selectedEvent.minute) {

            const dateWithTime = moment(selectedEvent.date)
                .set({
                    hour: parseInt(startTime.hour, 10),
                    minute: parseInt(startTime.minute, 10),
                    second: 0
                })
                .toDate();

            dateWithTime.setHours(parseInt(selectedEvent.hour, 10), parseInt(selectedEvent.minute, 10));
            const formattedDate = moment(dateWithTime).format('YYYY-MM-DD');
            const formattedTime = `${selectedEvent.hour.padStart(2, '0')}:${selectedEvent.minute.padStart(2, '0')}`;

            const estadoName = findEstadoNameById(selectedEvent.idEstado);

            let isDateChanged = false;
            const updatedEvents = currentEvents.map(event => {
                if (event.id === selectedEvent.id) {
                    const eventDate = new Date(event.start);
                    isDateChanged = isDateChanged || eventDate.getTime() !== dateWithTime.getTime();
                    return {
                        ...event,
                        title: `${selectedPatient.nombre} ${selectedPatient.apellido} - ${estadoName}`,
                        start: dateWithTime,
                        extendedProps: {
                            ...event.extendedProps,
                            estado: estadoName,
                            startTime: `${selectedEvent.hour}:${selectedEvent.minute}`,
                            idEstado: selectedEvent.idEstado,
                        }
                    };
                }
                return event;
            });




            axios.put(`${API_BASE_URL}/paciente/actualizarCita`, {
                idCita: selectedEvent.id,
                idPaciente: selectedPatient.idUsuario,
                idUsuarioEdita: userData.id_usuario,
                fechaCita: formattedDate,
                horaCita: formattedTime,
                idEstado: selectedEvent.idEstado,
                nombreInvitado: selectedPatient.idUsuario ? null : selectedEvent.nombreInvitado,
                contactoInvitado: selectedPatient.idUsuario ? null : selectedEvent.contactoInvitado
            })
                .then(async response => {
                    if (isDateChanged) {
                        setCalendarKey(prevKey => prevKey + 1);
                    }
                    setEditModalOpen(false);
                    setCurrentEvents(updatedEvents);
                    setAllEvents(updatedEvents);

                    setModalIsOpen(false);
                    await cargarPacientesConCita();
                    await cargarPacientesConCitaHistorial();

                })
                .catch(error => {
                    console.error('Error al actualizar la cita', error);

                });
        } else {
            toast.error('Debe seleccionar un estado y asegurarse de que la hora y la fecha son correctas.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
        }
    };

    const cargarEstados = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/paciente/estados`);
            setEstados(response.data);
            setEstadosCargados(true);
        } catch (error) {
            console.error('Error cargando los estados:', error);
            setEstadosCargados(true);
        }
    };

    function removeSeconds(timeString) {
        var timeParts = timeString.split(":");

        var hoursAndMinutes = timeParts.slice(0, 2);

        var newTimeString = hoursAndMinutes.join(":");

        return newTimeString;
    }
    const cargarPacientesConCitaHistorial = async () => {
        try{
            const response = await axios.get(`${API_BASE_URL}/paciente/historialCitas/${idSedeActual}`);
            if (response.data && Array.isArray(response.data.historialCitas)) {
                const eventos = response.data.historialCitas.map(cita => {
                    const fechaCita = cita.fechaCita.split('T')[0];
                    const fechaYHoraCita = `${fechaCita}T${removeSeconds(cita.horaCita)}`;
                    const title = cita.nombre && cita.apellido
                        ? `${cita.nombre} ${cita.apellido}`
                        : cita.nombre;
                    return {
                        id: `event-${cita.idUsuario}-${cita.idCita}`,
                        title: title,
                        start: new Date(fechaYHoraCita),
                        allDay: false,
                        color: 'red',
                        extendedProps: {
                            estado: findEstadoNameById(cita.idEstado),
                            startTime: removeSeconds(cita.horaCita),
                            idCita: cita.idCita,
                            idUsuario: cita.idUsuario,
                            nombreInvitado: cita.nombreInvitado,
                            contactoInvitado: cita.contactoInvitado,
                            idEstado: cita.idEstado,
                            readOnly: true,
                        }
                    };
                });


                const eventosUnicos = eventos.filter((eventos, index, self) =>
                    index === findLastIndex(self, (e) => e.extendedProps.idCita === eventos.extendedProps.idCita)
                );
                const pacientesConCita = response.data.historialCitas.map((paciente, index) => ({
                    ...paciente,
                    idUsuario: paciente.idUsuario || `generated-id-${index}`,
                }));

                setPacientesConCitaHistorialFilter(pacientesConCita);
                setCurrentEvents(current => {
                    const eventosActualesUnicos = current.filter((currentEvent, index, self) =>
                            index === self.findIndex((e) => (
                                e.extendedProps.idCita === currentEvent.extendedProps.idCita
                            ))
                    );

                    return [...eventosActualesUnicos, ...eventosUnicos];
                });
                setAllEvents(current => {
                    const eventosActualesUnicos = current.filter((currentEvent, index, self) =>
                            index === self.findIndex((e) => (
                                e.extendedProps.idCita === currentEvent.extendedProps.idCita
                            ))
                    );


                    return [...eventosActualesUnicos, ...eventosUnicos];
                });
            }

        }catch (error) {
            console.error('Error al cargar citas historial:', error);

        }
    }
    const cargarPacientesConCita = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/paciente/todosLosPacientesConCita/${idSedeActual}`);
            if (response.data && Array.isArray(response.data.pacientesConCita)) {
                const eventos = response.data.pacientesConCita.map(cita => {
                    const fechaCita = cita.fechaCita.split('T')[0];
                    const fechaYHoraCita = `${fechaCita}T${removeSeconds(cita.horaCita)}`;

                    const title = cita.nombre && cita.apellido
                        ? `${cita.nombre} ${cita.apellido}`
                        : cita.nombreInvitado;
                    const estadoNombre = findEstadoNameById(cita.idEstado);
                    let color;
                    switch (estadoNombre) {
                        case 'Completada':
                            color = 'green';
                            break;
                        case 'Cancelada':
                            color = 'orange';
                            break;
                        case 'Programada':
                            color = 'blue';
                            break;
                        default:
                            color = 'grey';
                    }
                    return {
                        id: `event-${cita.idUsuario}-${cita.idCita}`,
                        title: title,
                        start: new Date(fechaYHoraCita),
                        allDay: false,
                        color: color,
                        extendedProps: {
                            estado: findEstadoNameById(cita.idEstado),
                            startTime: removeSeconds(cita.horaCita),
                            idCita: cita.idCita,
                            idUsuario: cita.idUsuario,
                            nombreInvitado: cita.nombreInvitado,
                            contactoInvitado: cita.contactoInvitado,
                            idEstado: cita.idEstado

                        }
                    };
                });
                const pacientesConCita = response.data.pacientesConCita.map((paciente, index) => ({
                    ...paciente,
                    idUsuario: paciente.idUsuario || `generated-id-${index}`,
                }));

                setPacientesConCitaFilter(pacientesConCita);
                setCurrentEvents(eventos);
                setAllEvents(eventos);
            } else {
                toast.error('No se recibieron datos de citas.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            console.error('Error al cargar citas:', error);

        }
    };
    useEffect( () => {
        cargarEstados();
    }, []);

        useEffect(() => {

            const loadData = async () => {
                await cargarPacientesConCita();
                await cargarPacientesConCitaHistorial();

            };
            loadData();
    }, [idSedeActual,estados]);



    useEffect(() => {
        axios.get(`${API_BASE_URL}/paciente/todosLosPacientesSinCita/${idSedeActual}`)
            .then((response) => {
                if(response.data && Array.isArray(response.data.pacientes)){
                    const pacientesConIds = response.data.pacientes.map((paciente, index) => ({
                        ...paciente,
                        idUsuario: paciente.idUsuario || `generated-id-${index}`,
                    }));
                    setPacientes(pacientesConIds);
                    setFilteredPacientes(pacientesConIds);
                }else{
                    toast.error('No se recibieron datos de pacientes.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error obteniendo pacientes:', error);

            });
    }, [userData.id_institucion]);

    return (
        <Container>

            <FixedFilterButton onClick={() => setFilterModalOpen(true)}>
                <FaFilter /> Filtros
            </FixedFilterButton>
            <CalendarContainer className={"calendarioDeVisualizacion"}>
                <FullCalendar
                    locale={esLocale}
                    key={calendarKey}
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    events={currentEvents}
                    eventColor={colorEvent}
                    eventClick={handleEventClick}

                    dateClick={handleDateClick}
                />

            </CalendarContainer>

            <StyledModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h2>Seleccione Fecha, Hora y Estado</h2>
                <InputGroup>
                    <StyledLabel>Fecha:</StyledLabel>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        wrapperClassName="datePicker"
                    />
                </InputGroup>
                <InputGroup>
                    <StyledLabel>Hora:</StyledLabel>
                    <StyledInput
                        type="number"
                        value={startTime.hour}
                        onChange={(e) => setStartTime({ ...startTime, hour: e.target.value })}
                        min="0"
                        max="23"
                    />
                    <StyledLabel>:</StyledLabel>
                    <StyledInput
                        type="number"
                        value={startTime.minute}
                        onChange={(e) => setStartTime({ ...startTime, minute: e.target.value })}
                        min="0"
                        max="59"
                    />
                </InputGroup>
                <InputGroup>
                    <StyledLabel>Estado:</StyledLabel>
                    <StyledSelect
                        value={selectedEstado}
                        onChange={(e) => setSelectedEstado(e.target.value)}
                    >
                        <option value="">Seleccione un estado</option>
                        {estados.map(estado => (
                            <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                        ))}
                    </StyledSelect>
                </InputGroup>
                <StyledButton onClick={handleDateSubmit}>Confirmar</StyledButton>
            </StyledModal>
            <StyledModal
                isOpen={editModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
            >
                <Tabs>
                    <TabList>
                        <Tab>Actualizar Cita</Tab>
                        <Tab>Eliminar Cita</Tab>
                    </TabList>
                    <TabPanel>
                        <ModalContent>
                    <h2>Actualizar Cita</h2>
                    <InputGroup>
                        <StyledLabel>Fecha:</StyledLabel>
                        <DatePicker
                            selected={selectedEvent ? new Date(selectedEvent.date) : new Date()}
                            onChange={(date) => setSelectedEvent({ ...selectedEvent, date })}
                            dateFormat="dd/MM/yyyy"
                            wrapperClassName="datePicker"
                        />
                    </InputGroup>
                    <InputGroup>
                        <StyledLabel>Hora:</StyledLabel>
                        <StyledInput
                            type="number"
                            value={selectedEvent ? selectedEvent.hour : '00'}
                            onChange={(e) => setSelectedEvent({ ...selectedEvent, hour: e.target.value })}
                            min="0"
                            max="23"
                        />
                        <StyledLabel>:</StyledLabel>
                        <StyledInput
                            type="number"
                            value={selectedEvent ? selectedEvent.minute : '00'}
                            onChange={(e) => setSelectedEvent({ ...selectedEvent, minute: e.target.value })}
                            min="0"
                            max="59"
                        />
                    </InputGroup>
                    <InputGroup>
                        <StyledLabel>Estado:</StyledLabel>
                        <StyledSelect
                            value={selectedEvent ? selectedEvent.idEstado : ''}
                            onChange={(e) => setSelectedEvent({ ...selectedEvent, idEstado: e.target.value })}
                        >
                            <option value="">Seleccione un estado</option>
                            {estados.map(estado => (
                                <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                            ))}
                        </StyledSelect>
                    </InputGroup>
                    <StyledButton onClick={handleUpdateCita}>Actualizar</StyledButton>
                </ModalContent>
                    </TabPanel>
                    <TabPanel>
                        <ModalContent>
                            <h2>¿Estás seguro de que deseas eliminar esta cita?</h2>
                            <p>Esta acción no se puede deshacer.</p>
                            <StyledButton onClick={() => handleDeleteCita(selectedEvent.id)}>Eliminar Cita</StyledButton>
                        </ModalContent>
                    </TabPanel>
                </Tabs>


            </StyledModal>
            <StyledModal isOpen={filterModalOpen} onRequestClose={() => setFilterModalOpen(false)}>
                <ModalContent>
                    <ModalHeader>Filtros del Calendario</ModalHeader>
                    <InputGroup>
                        <SearchContainer>
                            <StyledInput
                                type="text"
                                placeholder="Buscar cita por nombre..."
                                value={searchTermCalendar}
                                onChange={handleSearchChangeCalendar}
                            />
                            <SearchButton onClick={handleSearchSubmit}><FaSearch /> Buscar</SearchButton>
                            <ResetButton onClick={handleResetCalendarView}><FaUndo /> Restablecer</ResetButton>
                        </SearchContainer>
                    </InputGroup>

                    <FilterGroup>
                        {/* <StyledLabel>Filtrar por:</StyledLabel>
                        <StyledSelect
                            value={filter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <option value={FILTER_OPTIONS.ALL}>Todos</option>
                            <option value={FILTER_OPTIONS.PAST}>Pasadas</option>
                            <option value={FILTER_OPTIONS.CURRENT}>Actuales</option>
                        </StyledSelect>*/}
                    </FilterGroup>

                    <CloseButton onClick={() => setFilterModalOpen(false)}>
                        <FaTimes /> Cerrar
                    </CloseButton>
                </ModalContent>
            </StyledModal>
            <ScrollablePatientList className={"listaDeEspera"}>
                <FixedSearchContainer>
                    <LegendContainer>
                        <LegendItem color="#28a745">
                            <LegendColor color="#28a745" />
                            <LegendText>Completada</LegendText>
                        </LegendItem>
                        <LegendItem color="#007bff">
                            <LegendColor color="#007bff" />
                            <LegendText>Programada</LegendText>
                        </LegendItem>
                        <LegendItem color="#ffc107">
                            <LegendColor color="#ffc107" />
                            <LegendText>Cancelada</LegendText>
                        </LegendItem>
                    </LegendContainer>
                    <h1>Pacientes sin cita</h1>
                    <StyledInput
                        type="text"
                        placeholder="Buscar paciente..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                </FixedSearchContainer>
                {filteredPacientes.map((patient) => (
                    <Patient
                        key={patient.idUsuario.toString()}
                        onClick={() => handlePatientClick(patient)}
                        className={removingPatients.includes(patient.idUsuario) ? 'removing' : ''}
                    >
                        <div style={{ fontWeight: 'bold' }}>{patient.nombre} {patient.apellido}</div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{patient.email}</div>
                    </Patient>
                ))}

            </ScrollablePatientList>
            <ModalCalendar
                isOpen={modalCalendarOpen}
                onRequestClose={() => setModalCalendarOpen(false)}
                selectedDate={selectedDate}
                onPatientSelect={handleSelectPatientFromCalendar}
                citas={currentEvents}
                cargarCitas={cargarPacientesConCitaHistorial}
                actualizarCita={handleUpdateCita}
                estados={estados}
                addExternalAppointment={addExternalAppointment}
            />
        </Container>
    );
};

export default AppointmentCalendar;
