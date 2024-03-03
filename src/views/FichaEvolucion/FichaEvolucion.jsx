import React, {useState, useEffect, useContext} from 'react';
import {
    Container,
    Title,
    SearchContainer,
    CloseButton,
    ModalHeader,
    ModalFooter,
    EvolutionForm,
    ModalTitle,
    ModalBody,
    SubmitButton,
    Input,
    Textarea,
    TabList,
    Tab,
    TabPanel, ScrollableContent, EvolutionCard, EvolutionHistoryContainer
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
    const [activeTab, setActiveTab] = useState('ingresarFicha');



    const loadPatients = (search = '') => {
        const searchParam = search ? `?busqueda=${search}` : '';
        axios.get(`${API_BASE_URL}/paciente/todosLosPacientesFichaEvolucion/${userData.id_empresa}${searchParam}`)
            .then(response => {
                setPatients(response.data.pacientes);
                console.log("ESTOS SON LOS PACIENTES: ", patients);
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
        setDiagnosis('');
        setModalOpen(true);

        // Cargar fichas de evolución del paciente seleccionado
        axios.get(`${API_BASE_URL}/paciente/fichaEvolucionPorUsuario/${patient.id}`)
            .then(response => {
                setEvolutionData(response.data.fichasEvolucion);
            })
            .catch(error => {
                console.error('Error al cargar fichas de evolución:', error);
                setEvolutionData([]);
            });
    };


    const EvolutionHistory = ({ fichas }) => (
        <div>
            {fichas.length > 0 ? (
                fichas.map((ficha, index) => (
                    <EvolutionCard key={index}>
                        <strong>Fecha:</strong> {new Date(ficha.fecha).toLocaleDateString()}
                        <ScrollableContent>
                            <strong>Diagnóstico:</strong> {ficha.diagnostico}
                        </ScrollableContent>
                    </EvolutionCard>
                ))
            ) : (
                <p>No hay fichas de evolución disponibles.</p>
            )}
        </div>
    );
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
                    <TabList>
                        <Tab onClick={() => setActiveTab('ingresarFicha')} active={activeTab === 'ingresarFicha'}>Ingresar Ficha</Tab>
                        <Tab onClick={() => setActiveTab('historialFichas')} active={activeTab === 'historialFichas'}>Historial de Fichas</Tab>
                    </TabList>

                    {activeTab === 'ingresarFicha' && (
                        <TabPanel>
                            <EvolutionForm id="evolution-form" onSubmit={handleSubmitEvolution}>
                                <label htmlFor="date">Fecha:</label>
                                <Input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required />
                                <label htmlFor="diagnosis">Diagnóstico:</label>
                                <Textarea id="diagnosis" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required />
                            </EvolutionForm>
                            <ModalFooter>
                                <SubmitButton type="submit" form="evolution-form">Guardar Evolución</SubmitButton>
                            </ModalFooter>
                        </TabPanel>
                    )}

                    {activeTab === 'historialFichas' && (
                        <TabPanel>
                            <EvolutionHistoryContainer>
                                <EvolutionHistory fichas={evolutionData} />
                            </EvolutionHistoryContainer>
                        </TabPanel>
                    )}
                </ModalBody>

            </StyledModal>
        </Container>
    );
};

export default FichaEvolucion;
