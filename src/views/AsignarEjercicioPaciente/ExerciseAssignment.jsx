import React, { useState, useEffect } from 'react';
import PatientList from '../../components/PatientList/PatientList';
import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import SearchAndFilter from '../../components/SearchAndFilterExercisePatient/SearchAndFilterExercisePatient';
import { Title, Container, SearchContainer } from './ExerciseAssignmentStyle';
import { API_BASE_URL } from "../../utils/config";

const ExerciseAssignment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedExercises, setSelectedExercises] = useState(new Map());
    const [modalOpen, setModalOpen] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [areasEjercicios, setAreasEjercicios] = useState([]);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setModalOpen(true); // Abre el modal aquí
    };

    const handleSubmit = () => {
        console.log('Ejercicios seleccionados:', Array.from(selectedExercises.entries()));
        setSelectedExercises(new Map());
    };

    const handleExerciseSelect = (exerciseId) => {
        setSelectedExercises(new Map(selectedExercises.set(exerciseId, !selectedExercises.get(exerciseId))));
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        fetch(`${API_BASE_URL}/asignacion/pacientes/ejercicios`)
            .then(response => response.ok ? response.json() : Promise.reject('Error al cargar los pacientes'))
            .then(data => setPacientes(data))
            .catch(error => console.error(error));

        fetch(`${API_BASE_URL}/asignacion/ejercicios/detalle`)
            .then(response => response.ok ? response.json() : Promise.reject('Error al cargar ejercicios'))
            .then(data => {
                // Procesamiento de los datos si es necesario
                setAreasEjercicios(data);
            })
            .catch(error => console.error(error));
    }, []);

    const isExerciseSelected = (exerciseId) => selectedExercises.get(exerciseId) || false;

    return (
        <Container>
            <Title>Asignar ejercicios</Title>
            <SearchContainer>
                <SearchAndFilter onSearch={handleSearch} />
            </SearchContainer>
            <PatientList patients={pacientes} onSelectPatient={handleSelectPatient} />
            {modalOpen && (
                <ExerciseModal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    exercises={[]}
                    onExerciseSelect={handleExerciseSelect}
                />
            )}
        </Container>
    );
};

export default ExerciseAssignment;
