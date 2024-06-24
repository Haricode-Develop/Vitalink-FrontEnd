// src/components/ServiciosPorUsuario/ServiciosPorUsuario.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
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

    const handleAssignService = async () => {
        if (selectedService && selectedPatient) {
            try {
                const endpoint = selectedService.TIPO === 'paquete'
                    ? `${API_BASE_URL}/gestionDeNegocios/usuarios/${selectedPatient.id}/paquetes`
                    : `${API_BASE_URL}/gestionDeNegocios/usuarios/${selectedPatient.id}/servicios`;

                const payload = {
                    idPaquete: selectedService.TIPO === 'paquete' ? selectedService.ID : undefined,
                    idServicio: selectedService.TIPO === 'servicio' ? selectedService.ID : undefined,
                    cantidad: 1,
                };
                console.log("Selected Service: ", selectedService);
                console.log("Endpoint and Payload: ", endpoint, payload);

                await axios.post(endpoint, payload);
                toast.success('Servicio asignado correctamente');
                setIsModalOpen(false);
            } catch (error) {
                toast.error('Error al asignar el servicio');
                console.error('Error assigning service:', error);
            }
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
                        {filteredServices.map(service => (
                            <ServiceAssignmentItem
                                key={service.ID}
                                onClick={() => setSelectedService(service)}
                                selected={selectedService && selectedService.ID === service.ID}
                            >
                                {service.TITULO} - {service.PRECIO} {service.MONEDA} ({service.TIPO.charAt(0).toUpperCase() + service.TIPO.slice(1)})
                            </ServiceAssignmentItem>
                        ))}
                    </ServiceAssignmentList>
                    <Button onClick={handleAssignService}>Asignar</Button>
                    <h3>Servicios y Paquetes Asignados</h3>
                    <ServiceAssignmentList>
                        {assignedServices.servicios && assignedServices.servicios.map(service => (
                            <ServiceAssignmentItem key={service.id}>
                                {service.titulo} - {service.precio} {service.moneda} (Servicio)
                            </ServiceAssignmentItem>
                        ))}
                        {assignedServices.paquetes && assignedServices.paquetes.map(paquete => (
                            <ServiceAssignmentItem key={paquete.id}>
                                {paquete.titulo} - {paquete.precio} {paquete.moneda} (Paquete)
                            </ServiceAssignmentItem>
                        ))}
                    </ServiceAssignmentList>
                </ServiceAssignmentContainer>
            </StyledModal>
        </Container>
    );
};

export default ServiciosPorUsuario;
