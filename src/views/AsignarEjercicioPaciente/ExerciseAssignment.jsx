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
    const [ejercicios, setEjercicios] = useState([]);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setModalOpen(true); // Abre el modal aquí
    };

    const handleSubmit = () => {
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

        console.log("ESTOS SON LOS EJERCICIOS:", ejercicios);

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
                    selectedExercises={selectedExercises}
                    onExerciseSelect={handleExerciseSelect}
                    selectedPatient={selectedPatient}
                    onSubmit={handleSubmit}
                />
            )}
        </Container>
    );
};

export default ExerciseAssignment;
