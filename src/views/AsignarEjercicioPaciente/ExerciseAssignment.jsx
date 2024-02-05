// ExerciseAssignment.js
import React, { useState } from 'react';
import PatientList from '../../components/PatientList/PatientList';
import ExerciseAccordion from '../../components/ExerciseAccordion/ExcerciseAccordion';
import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import SearchAndFilter from '../../components/SearchAndFilterExercisePatient/SearchAndFilterExercisePatient';
import { Title, Container, SearchContainer } from './ExerciseAssignmentStyle';

// Datos inventados para pacientes y ejercicios
const pacientesInventados = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com' },
    // Más pacientes...
];

const areasEjerciciosInventadas = [
    {
        id: 1,
        nombre: 'Brazos',
        ejercicios: [
            { id: 101, nombre: 'Curl de Bíceps', descripcion: 'Descripción del ejercicio...' },
            // Más ejercicios...
        ],
    },
    // Más áreas...
];

const ExerciseAssignment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedExercises, setSelectedExercises] = useState(new Map());
    const [currentExercise, setCurrentExercise] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // Asegúrate de definir este estado

    // Función de ejemplo para manejar la selección
    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        // No abrimos el modal aquí, solo establecemos el paciente seleccionado
    }
    const handleSubmit = () => {
        // Aquí enviarías los ejercicios seleccionados al backend o actualizarías el estado del paciente.
        console.log('Ejercicios seleccionados:', Array.from(selectedExercises.entries()));
        // Después de enviar los datos, restablecer los ejercicios seleccionados
        setSelectedExercises(new Map());
        // Cerrar el modal o volver a la vista anterior
    };

    const openExerciseModal = (area) => {
        setModalOpen(true);
        // Aquí podrías establecer los ejercicios del área seleccionada para ser mostrados en el modal
    };

    const handleExerciseSelect = (exerciseId) => {
        setSelectedExercises(new Map(selectedExercises.set(exerciseId, !selectedExercises.get(exerciseId))));
    };
    // Función para manejar la búsqueda
    const handleSearch = (term) => {
        setSearchTerm(term);
        // Lógica de filtrado aquí
    };

    // Filtrar pacientes y ejercicios basados en searchTerm
    const filteredPacientes = searchTerm
        ? pacientesInventados.filter((patient) => patient.nombre.includes(searchTerm))
        : pacientesInventados;
    const filteredEjercicios = searchTerm
        ? areasEjerciciosInventadas.map((area) => ({
            ...area,
            ejercicios: area.ejercicios.filter((e) => e.nombre.includes(searchTerm)),
        }))
        : areasEjerciciosInventadas;
    const handleAssignExercisesClick = () => {
        if (selectedPatient) {
            setModalOpen(true); // Abrimos el modal solo con este botón
        }
    };


    const isExerciseSelected = (exerciseId) => selectedExercises.get(exerciseId) || false;

    return (
        <Container>
            <Title>Asignar ejercicios</Title>
            <SearchContainer>
                <SearchAndFilter onSearch={handleSearch} />
            </SearchContainer>
            <PatientList patients={filteredPacientes} onSelectPatient={handleSelectPatient} />
            {/* Botón para asignar ejercicios al paciente seleccionado */}
            {selectedPatient && (
                <button onClick={handleAssignExercisesClick}>
                    Asignar Ejercicios a {selectedPatient.nombre}
                </button>
            )}
            {/* Lista de ejercicios como índice informativo */}
            {areasEjerciciosInventadas.map((area) => (
                <ExerciseAccordion key={area.id} area={area} />
            ))}
            {/* Modal para la selección de ejercicios */}
            {modalOpen && (
                <ExerciseModal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    exercises={selectedPatient ? selectedPatient.exercises : []}
                    onExerciseSelect={handleExerciseSelect}
                />
            )}
        </Container>
    );
};

export default ExerciseAssignment;
