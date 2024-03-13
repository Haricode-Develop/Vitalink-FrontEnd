import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaExclamationTriangle } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { MdSwapHoriz } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { StyledModal } from "../Modal";
import { toast } from 'react-toastify';

import {
    Container,
    CardsContainer,
    PatientCard,
    PatientName,
    PatientEmail,
    PatientInfo,
    SearchInput,
    EditButton,
    NoEmailIndicator,
    Form,
    FormGroup,
    Input,
    Label,
    SubmitButton,
    ModalContent,
    ModalHeader,
    ChangeDoctorButton,
    AssignedDoctor,
    DoctorName, DoctorEmail, DoctorInfo, Select
} from "./GestionPacientesStyle";
import { API_BASE_URL } from "../../utils/config";

const GestionPacientes = () => {
    const { userData } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState([]);
    const [currentPatient, setCurrentPatient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicoActual, setMedicoActual] = useState(null);
    const [medicos, setMedicos] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fechaDeNacimiento: '',
    });
    const [selectedNewDoctorId, setSelectedNewDoctorId] = useState('');

    const obtenerMedicosDisponibles = async (idPacienteExcluido) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/fisio/todosLosFisios/${userData.id_empresa}`);
            setMedicos(response.data.fisios.filter(fisio => {
                console.log("ID del fisio actual:", fisio.ID_USUARIO);
                console.log("ID del paciente excluido:", idPacienteExcluido);
                return fisio.ID_USUARIO !== idPacienteExcluido;
            }));

        } catch (error) {
            console.error('Error al obtener los fisioterapeutas:', error);
        }
    };
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/paciente/todosLosPacientes/${userData.id_empresa}`);
                setPatients(response.data.pacientes);
            } catch (error) {
                console.error('Error al obtener los pacientes:', error);
            }
        };

        fetchPatients();
    }, [userData.id_empresa]);

    const optionsForSelect = medicos.map(medico => ({
        value: medico.ID_USUARIO,
        label: `${medico.NOMBRE} ${medico.APELLIDO}`
    }));

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            marginBottom: '20px',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
    };
    const obtenerMedicoPaciente = async (idPaciente) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/paciente/medicoPaciente/${idPaciente}`);
            setMedicoActual(response.data.medico);
            if (response.data.medico) {
                console.log("ESTE ES EL MEDICO", response);
                obtenerMedicosDisponibles(response.data.medico.ID_MEDICO);
            }
        } catch (error) {
            console.error('Error al obtener el médico del paciente:', error);
        }
    };


    const handleEditClick = (patient) => {
        setCurrentPatient(patient);
        setForm({
            nombre: patient.NOMBRE || '',
            apellido: patient.APELLIDO || '',
            email: patient.EMAIL || '',
            telefono: patient.TELEFONO || '',
            fechaDeNacimiento: patient.FECHA_DE_NACIMIENTO || '',
        });
        obtenerMedicoPaciente(patient.ID_USUARIO);
        setIsModalOpen(true);
    };
    useEffect(() => {
        if (isModalOpen && currentPatient) {
            obtenerMedicoPaciente(currentPatient.ID_USUARIO);
        }
    }, [currentPatient, isModalOpen, userData.id_empresa]);


    const handleSelectChange = (event) => {
        const idNuevoMedico = event.target.value;
        console.log("ESTE ES EL ID DEL MEDICO", idNuevoMedico);
        setSelectedNewDoctorId(idNuevoMedico); // Guardamos el ID del médico seleccionado
    };

    const getOptionsForSelect = () => {
        return medicos.map(medico => ({
            value: medico.ID_USUARIO,
            label: `${medico.NOMBRE} ${medico.APELLIDO}`
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Asegurarse de que el evento e se pasa correctamente
        try {
            const response = await axios.put(`${API_BASE_URL}/paciente/actualizarPaciente/${currentPatient.ID_USUARIO}`, form);
            setIsModalOpen(false);
            alert('Paciente actualizado correctamente.');
            console.log(response.data);
        } catch (error) {
            console.error('Error al actualizar el paciente:', error);
            alert('Ocurrió un error al actualizar el paciente.');
        }
    };

    const handleDoctorChange = async () => {
        if (!selectedNewDoctorId) {
            alert('Por favor, seleccione un médico antes de cambiar.');
            return;
        }
        try {
            console.log("ID DEL PACIENTE", currentPatient.ID_USUARIO);
            console.log("ESTE ES EL ID DEL DR", selectedNewDoctorId);
            await cambiarMedicoPaciente(currentPatient.ID_USUARIO, selectedNewDoctorId);
            obtenerMedicoPaciente(currentPatient.ID_USUARIO); // Actualizamos la información del médico
            toast.success('Cambio de medico realizado correctamente', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            setIsModalOpen(false); // Opcional: cerrar el modal después de cambiar el médico
        } catch (error) {
            console.error('Error al cambiar el médico del paciente:', error);
            alert('Ocurrió un error al cambiar el médico.');
        }
    };

    const cambiarMedicoPaciente = async (idPaciente, idNuevoMedico) => {
        try {
            await axios.post(`${API_BASE_URL}/paciente/cambiarMedico/${idPaciente}`, { idNuevoMedico });
            obtenerMedicoPaciente(idPaciente); // Actualizamos la información del médico
        } catch (error) {
            console.error('Error al cambiar el médico del paciente:', error);
        }
    };

    const filteredPatients = patients.filter(
        patient =>
            patient.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.APELLIDO.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (patient.EMAIL && patient.EMAIL.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Container>
            <SearchInput
                type="text"
                placeholder="Buscar pacientes..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CardsContainer>
                {filteredPatients.map(patient => (
                    <PatientCard key={patient.ID_USUARIO}>
                        <PatientInfo>
                            <PatientName>{patient.NOMBRE} {patient.APELLIDO}</PatientName>
                            {patient.EMAIL ? (
                                <PatientEmail>{patient.EMAIL}</PatientEmail>
                            ) : (
                                <NoEmailIndicator>
                                    <FaExclamationTriangle color="yellow" /> No disponible
                                </NoEmailIndicator>
                            )}
                            <EditButton onClick={() => handleEditClick(patient)}>Editar</EditButton>
                        </PatientInfo>
                    </PatientCard>
                ))}
            </CardsContainer>

            <StyledModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                width="50%"
                maxWidth="500px"
                display="block"
            >
                {currentPatient && (
                    <ModalContent>
                        <ModalHeader>Editando a {currentPatient.NOMBRE}</ModalHeader>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Nombre:</Label>
                                <Input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Apellido:</Label>
                                <Input type="text" name="apellido" value={form.apellido} onChange={handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email:</Label>
                                <Input type="email" name="email" value={form.email} onChange={handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Teléfono:</Label>
                                <Input type="tel" name="telefono" value={form.telefono} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Fecha de Nacimiento:</Label>
                                <Input type="date" name="fechaDeNacimiento" value={form.fechaDeNacimiento} onChange={handleChange} />
                            </FormGroup>
                            <SubmitButton type="submit">Actualizar</SubmitButton>
                        </Form>
                        {medicoActual && (
                            <AssignedDoctor>
                                <DoctorInfo>
                                    <FaUserMd size={30} />
                                    <div>
                                        <DoctorName>{`${medicoActual.NOMBRE_MEDICO} ${medicoActual.APELLIDO_MEDICO}`}</DoctorName>
                                        <DoctorEmail>{medicoActual.EMAIL_MEDICO}</DoctorEmail>
                                    </div>
                                </DoctorInfo>
                                <div>

                                {medicos.length > 0 && (
                                    <Select
                                        styles={customSelectStyles}
                                        options={optionsForSelect}
                                        onChange={handleSelectChange}
                                        placeholder="Seleccionar médico"
                                        noOptionsMessage={() => "No se encontraron médicos"}
                                    >obtenerMedicoPaciente
                                        <option value="" disabled>
                                            Seleccionar médico
                                        </option>
                                        {medicos.map((medico) => (
                                            <option key={medico.ID_USUARIO} value={medico.ID_USUARIO}>
                                                {medico.NOMBRE} {medico.APELLIDO}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                                    <ChangeDoctorButton onClick={handleDoctorChange}>
                                        <MdSwapHoriz />
                                        Cambiar Médico
                                    </ChangeDoctorButton>
                                </div>
                            </AssignedDoctor>
                        )}
                    </ModalContent>
                )}
            </StyledModal>
        </Container>
    );
};

export default GestionPacientes;
