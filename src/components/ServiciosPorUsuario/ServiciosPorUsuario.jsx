import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import PatientList from '../PatientList/PatientList';
import { StyledModal } from '../Modal';
import { useSede } from '../../context/SedeContext';
import { API_BASE_URL } from '../../utils/config';
import {
    Container, Button, ServiceAssignmentContainer, ServiceAssignmentTitle,
    ServiceAssignmentList, ServiceAssignmentItem, FilterContainer, FilterInput, FilterButton, FilterButtonGroup
} from './ServiciosPorUsuarioStyle';

const ServiciosPorUsuario = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [assignedServices, setAssignedServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const { idSedeActual } = useSede();

    const adaptPatientsData = (data) => {
        return data.map(patient => ({
            id: patient.ID_USUARIO,
            nombre: patient.NOMBRE,
            apellido: patient.APELLIDO,
            email: patient.EMAIL || "No tiene email",
        }));
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/paciente/todosLosPacientes/${idSedeActual}`);
                const adaptedData = adaptPatientsData(response.data.pacientes);
                setPatients(adaptedData);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, [idSedeActual]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/gestionDeNegocios/servicios/asignables`, {
                    params: { idSede: idSedeActual }
                });
                setServices(response.data);
                setFilteredServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        if (isModalOpen) {
            fetchServices();
        }
    }, [isModalOpen, idSedeActual]);

    const handleSelectPatient = async (patient) => {
        setSelectedPatient(patient);
        setIsModalOpen(true);

        try {
            const response = await axios.get(`${API_BASE_URL}/gestionDeNegocios/usuarios/${patient.id}/asignaciones`);
            setAssignedServices(response.data.asignaciones);
        } catch (error) {
            console.error('Error fetching assigned services:', error);
        }
    };

    const handleAssignServiceOrPackage = async () => {
        if (selectedService && selectedPatient) {
            setIsDateModalOpen(true); // Abre el modal de fecha para ambos tipos
        }
    };

    const handleConfirmAssignment = async () => {
        if (!selectedService || !selectedPatient) return;

        try {
            let endpoint;
            let payload = {
                cantidad: 1,
                fechaAsignacion: moment(selectedDate).utc().set({ hour: 6, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm:ss.SSS'), // Fecha en UTC con la hora ajustada
            };

            if (selectedService.TIPO === 'paquete') {
                endpoint = `${API_BASE_URL}/gestionDeNegocios/usuarios/${selectedPatient.id}/paquetes`;
                payload.idPaquete = selectedService.ID;
            } else {
                endpoint = `${API_BASE_URL}/gestionDeNegocios/usuarios/${selectedPatient.id}/servicios`;
                payload.idServicio = selectedService.ID;
            }

            await axios.post(endpoint, payload);
            toast.success(`${selectedService.TIPO.charAt(0).toUpperCase() + selectedService.TIPO.slice(1)} asignado correctamente`);
            setIsModalOpen(false);
            setIsDateModalOpen(false);
        } catch (error) {
            toast.error(`Error al asignar el ${selectedService.TIPO}`);
            console.error(`Error assigning ${selectedService.TIPO}:`, error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPatient(null);
        setSelectedService(null);
        setAssignedServices([]);
    };

    const filterServices = () => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = services.filter(service => {
            const isTitleMatch = service.TITULO.toLowerCase().includes(lowerCaseSearchTerm);
            const isTypeMatch = filterType === 'all' || service.TIPO === filterType;
            return isTitleMatch && isTypeMatch;
        });
        setFilteredServices(filtered);
    };

    useEffect(() => {
        filterServices();
    }, [searchTerm, filterType, services]);

    useEffect(() => {
        console.log("ESTOS SON LOS FILTERED SERVICES: ", filteredServices);
        console.log("ESTE ES EL SERVICIO SELECCIONADO: ", selectedService);
    }, [selectedService]);

    const handleServiceSelection = (service) => {
        // Concatenar el tipo para asegurar una identificación única
        setSelectedService({
            ...service,
            uniqueID: `${service.TIPO}-${service.ID}`
        });
    };

    return (
        <Container>
            <PatientList patients={patients} onSelectPatient={handleSelectPatient} />

            <StyledModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                width="650px"
                height="535px"
            >
                <ServiceAssignmentContainer>
                    <ServiceAssignmentTitle>Asignar Servicio a {selectedPatient?.nombre} {selectedPatient?.apellido}</ServiceAssignmentTitle>
                    <FilterContainer>
                        <FilterInput
                            type="text"
                            placeholder="Buscar por título"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FilterButtonGroup>
                            <FilterButton
                                active={filterType === 'all'}
                                onClick={() => setFilterType('all')}
                            >
                                Todos
                            </FilterButton>
                            <FilterButton
                                active={filterType === 'paquete'}
                                onClick={() => setFilterType('paquete')}
                            >
                                Paquetes
                            </FilterButton>
                            <FilterButton
                                active={filterType === 'servicio'}
                                onClick={() => setFilterType('servicio')}
                            >
                                Servicios
                            </FilterButton>
                        </FilterButtonGroup>
                    </FilterContainer>
                    <ServiceAssignmentList>
                        {filteredServices.map((service) => (
                            <ServiceAssignmentItem
                                key={`${service.TIPO}-${service.ID}`} // Clave única
                                onClick={() => handleServiceSelection(service)}
                                selected={selectedService && selectedService.uniqueID === `${service.TIPO}-${service.ID}`} // Compara la selección
                            >
                                {service.TITULO} - {service.PRECIO} {service.MONEDA} ({service.TIPO.charAt(0).toUpperCase() + service.TIPO.slice(1)})
                            </ServiceAssignmentItem>
                        ))}
                    </ServiceAssignmentList>
                    <Button onClick={handleAssignServiceOrPackage}>Asignar</Button>
                    <h3>Servicios y Paquetes Asignados</h3>
                    <ServiceAssignmentList>
                        {assignedServices.servicios && assignedServices.servicios.map((service) => (
                            <ServiceAssignmentItem key={`servicio-${service.id}`}>
                                {service.titulo} - {service.precio} {service.moneda} (Servicio)
                            </ServiceAssignmentItem>
                        ))}
                        {assignedServices.paquetes && assignedServices.paquetes.map((paquete) => (
                            <ServiceAssignmentItem key={`paquete-${paquete.id}`}>
                                {paquete.titulo} - {paquete.precio} {paquete.moneda} (Paquete)
                            </ServiceAssignmentItem>
                        ))}
                    </ServiceAssignmentList>
                </ServiceAssignmentContainer>
            </StyledModal>

            {/* Nuevo Modal para Seleccionar Fecha de Asignación */}
            <StyledModal
                isOpen={isDateModalOpen}
                onRequestClose={() => setIsDateModalOpen(false)}
                width="400px"
                height="200px"
            >
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h3>Seleccionar Fecha de Asignación</h3>
                    <input
                        type="date"
                        value={moment(selectedDate).format('YYYY-MM-DD')}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <Button onClick={handleConfirmAssignment}>Confirmar</Button>
                        <Button onClick={() => setIsDateModalOpen(false)}>Cancelar</Button>
                    </div>
                </div>
            </StyledModal>
        </Container>
    );
};

export default ServiciosPorUsuario;
