import React from 'react';
import { StyledModal } from '../Modal';
import { modalStyle, leftSection, rightSection, searchBar, exerciseItem } from './ExerciseModalStyle';

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
    const customModalStyle = {
        width: '80vw',
        maxWidth: '80vw', // Nuevo ancho máximo
        height: '80vh', // Nueva altura

    };
    return (
        <StyledModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            width={customModalStyle.width}
            maxWidth={customModalStyle.maxWidth}
            height={customModalStyle.height}
        >
            <div style={leftSection}>
                <div style={searchBar}>
                    <input type="text" placeholder="Buscar ejercicios..." />
                </div>
                {exercises.map((exercise) => (
                    <div key={exercise.id} style={exerciseItem}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedExercises.get(exercise.id)}
                                onChange={() => handleSelectExercise(exercise.id)}
                            />
                            {exercise.nombre}
                        </label>
                    </div>
                ))}
            </div>
            <div style={rightSection}>
                {/* Aquí irían los rectángulos de información en el futuro */}
            </div>
            <button onClick={handleConfirmSelection}>Confirmar Selección</button>
        </StyledModal>
    );
};

export default ExerciseModal;
