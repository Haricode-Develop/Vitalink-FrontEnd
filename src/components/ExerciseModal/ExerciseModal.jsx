import React from 'react';
import { StyledModal } from '../Modal';
import { FaFilter } from 'react-icons/fa';

import {
    modalStyle,
    leftSection,
    rightSection,
    searchBar,
    videoItem,
    videoDetails,
    videoPreview,
    videoListContainer,
    filterSection,
    confirmButtonContainerStyle,
    confirmButtonStyle, filterButtonStyle
} from './ExerciseModalStyle';

import ExerciseItem from "../ExerciseItem/ExerciseItem";
import SelectedPatientItem from "../SelectedPatientItem/SelectedPatientItem";
const ExerciseModal = ({ isOpen, onRequestClose, exercises, onExerciseSelect, selectedExercises, setSelectedExercises }) => {
    const handleSelectExercise = (exerciseId) => {
        const newSelection = new Map(selectedExercises);
        newSelection.set(exerciseId, !newSelection.get(exerciseId));
        setSelectedExercises(newSelection);
    };

    const handleConfirmSelection = () => {
        onExerciseSelect(Array.from(selectedExercises.entries()));
        onRequestClose();
    };
    const sampleExercises = [
        { id: 1, name: 'Sentadillas', description: 'Ejercicio para piernas' },
        { id: 2, name: 'Flexiones', description: 'Ejercicio para pecho y brazos' },
        { id: 3, name: 'Abdominales', description: 'Ejercicio para abdomen' },
        // Agrega más ejercicios de ejemplo aquí
    ];

    const selectedPatients = [
        { id: 'p1', name: 'Juan Perez', description: 'Paciente seleccionado 1' },
        { id: 'p2', name: 'Maria Gomez', description: 'Paciente seleccionado 2' },
        // ... más pacientes ...
    ];
    return (
        <StyledModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            width='80vw'
            maxWidth='80vw'
            height='80vh'
            flexDirection={'row'}
        >
            <div style={leftSection}>
                <div style={{ width: '100%' }}> {/* Asegúrate de que este div ocupe todo el ancho */}
                    <input type="text" placeholder="Buscar ejercicios..." style={searchBar} />
                </div>
                <div style={filterSection}>
                    <button style={filterButtonStyle}><FaFilter /> Categoria</button>
                    <button style={filterButtonStyle}><FaFilter /> Area Corporal</button>
                    <button style={filterButtonStyle}><FaFilter /> Sub Area Corporal</button>
                </div>
                <div style={videoListContainer}>
                    {sampleExercises.map((exercise) => (
                        <ExerciseItem
                            key={exercise.id}
                            exercise={exercise}
                            onAdd={() => handleSelectExercise(exercise)}
                        />
                    ))}
                </div>
            </div>
            <div style={rightSection}>
                {selectedPatients.map((patient) => (
                    <SelectedPatientItem
                        key={patient.id}
                        patient={patient}
                    />
                ))}
            </div>
            <div style={confirmButtonContainerStyle}>
                <button style={confirmButtonStyle} onClick={handleConfirmSelection}>
                    Confirmar Selección
                </button>
            </div>
        </StyledModal>
    );
};

export default ExerciseModal;
