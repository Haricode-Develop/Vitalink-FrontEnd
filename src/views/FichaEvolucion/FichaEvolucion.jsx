import React, {useState, useEffect, useContext} from 'react';
import {
    Container,
    Title,
    SearchContainer,
    EvolutionModal,
    CloseButton,
    ModalContent,
    ModalHeader,
    ModalFooter,
    EvolutionForm,
    ModalTitle,
    ModalBody, EvolutionCard, SubmitButton, Textarea, Input
} from './FichaEvolucionStyle';
import PatientList from '../../components/PatientList/PatientList';
import SearchAndFilter from '../../components/SearchAndFilterExercisePatient/SearchAndFilterExercisePatient';
import EvolutionRecord from '../../components/EvolutionRecord/EvolutionRecord';
import axios from 'axios';
import { API_BASE_URL } from "../../utils/config";
import {AuthContext} from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';

import {StyledModal} from "../../components/Modal";
const FichaEvolucion = () => {
    const { userData } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [evolutionData, setEvolutionData] = useState([]);
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const loadPatients = (search = '') => {
        const searchParam = search ? `?busqueda=${search}` : '';
        axios.get(`${API_BASE_URL}/paciente/todosLosPacientesFichaEvolucion/${userData.id_empresa}${searchParam}`)
            .then(response => {
                setPatients(response.data.pacientes);
            })
            .catch(error => {
                console.error('Error al cargar los pacientes:', error);
            });
    };
    useEffect(() => {
        loadPatients();
    }, []);

    useEffect(() => {
        loadPatients(searchTerm);
    }, [searchTerm]);
    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setDate('');
        setNotes('');
        setModalOpen(true);
    };



    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleSubmitEvolution = (event) => {
        event.preventDefault();
        axios.post(`${API_BASE_URL}/paciente/ficha_evolucion`, {
            idUsuario: selectedPatient.id,
            fecha: date,
            diagnostico: diagnosis
        })
            .then(response => {
                toast.success("Ficha de evolución guardada correctamente", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setModalOpen(false);
            })
            .catch(error => {
                toast.error("Error al guardar la ficha de evolución", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    return (
        <Container>
            <Title>Ficha de Evolución</Title>
            <SearchContainer>
                <SearchAndFilter onSearch={handleSearch} />
            </SearchContainer>
            <PatientList patients={patients} onSelectPatient={handleSelectPatient} />

            <StyledModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} >
                <ModalHeader>
                    <ModalTitle>{selectedPatient ? `${selectedPatient.nombre} - Ficha de Evolución` : ''}</ModalTitle>
                    <CloseButton onClick={() => setModalOpen(false)}>✕</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <EvolutionForm id="evolution-form" onSubmit={handleSubmitEvolution}>
                        <label htmlFor="date">Fecha:</label>
                        <Input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required />
                        <label htmlFor="diagnosis">Diagnóstico:</label>
                        <Textarea id="diagnosis" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required />
                    </EvolutionForm>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton type="submit" form="evolution-form">Guardar Evolución</SubmitButton>
                </ModalFooter>
            </StyledModal>
        </Container>
    );
};

export default FichaEvolucion;
