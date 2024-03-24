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
    const [filteredExercises, setFilteredExercises] = useState([]); // Nuevo estado para ejercicios filtrados
    const [filteredPatients, setFilteredPatients] = useState([]); // Estado para pacientes filtrados

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setModalOpen(true); // Abre el modal aquí
    };

    const handleAssignExercises = () => {
        selectedExercises.forEach((isSelected, exerciseId) => {
            if (isSelected) {
                fetch(`${API_BASE_URL}/asignacion/usuario/ejercicio`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUsuario: selectedPatient.id,
                        idEjercicio: exerciseId,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                    })
                    .catch(error => {
                        console.error('Error en la asignación:', error);
                    });
            }
        });

        setSelectedExercises(new Map());
        setModalOpen(false);
    };


    const handleExerciseSelect = (exerciseId, isSelected) => {
        const updatedSelectedExercises = new Map(selectedExercises);
        updatedSelectedExercises.set(exerciseId, !isSelected);
        setSelectedExercises(updatedSelectedExercises);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };



    useEffect(() => {
        fetch(`${API_BASE_URL}/asignacion/pacientes/ejercicios`)
            .then(response => response.ok ? response.json() : Promise.reject('Error al cargar los pacientes'))
            .then(data => {
                setPacientes(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    useEffect(() => {
        const filtered = pacientes.filter(patient =>
            patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.apellido.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPatients(filtered);
    }, [searchTerm, pacientes]);

    const isExerciseSelected = (exerciseId) => selectedExercises.get(exerciseId) || false;

    return (
        <Container>
            <Title>Asignar ejercicios</Title>
            <SearchContainer>
                <SearchAndFilter onSearch={handleSearch} />
            </SearchContainer>
            <PatientList patients={filteredPatients} onSelectPatient={handleSelectPatient} />
            {modalOpen && (
                <ExerciseModal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    selectedExercises={selectedExercises}
                    onExerciseSelect={handleExerciseSelect}
                    selectedPatient={selectedPatient}
                    onSubmit={handleAssignExercises}
                />
            )}
        </Container>
    );
};

export default ExerciseAssignment;
