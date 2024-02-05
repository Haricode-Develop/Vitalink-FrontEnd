import React from 'react';
import { StyledModal} from '../Modal';

const ExerciseModal = ({ isOpen, onRequestClose, exercises, onExerciseSelect, selectedExercises, setSelectedExercises }) => {
    // Función para manejar la selección de ejercicios dentro del modal
    const handleSelectExercise = (exerciseId) => {
        const newSelection = new Map(selectedExercises);
        newSelection.set(exerciseId, !newSelection.get(exerciseId));
        setSelectedExercises(newSelection);
    };

    // Función para enviar la selección de ejercicios
    const handleConfirmSelection = () => {
        onExerciseSelect(Array.from(selectedExercises.entries()));
        onRequestClose();
    };
    return (
        <StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
            {exercises.map((exercise) => (
                <div key={exercise.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedExercises.get(exercise.id)}
                            onChange={() => handleSelectExercise(exercise.id)}
                        />
                        {exercise.nombre}
                    </label>
                    {/* Botón para ver vídeo si es necesario */}
                </div>
            ))}
            <button onClick={handleConfirmSelection}>Confirmar Selección</button>
        </StyledModal>
    );
};

export default ExerciseModal;
