import React from 'react';
import { ExerciseContainer, ExerciseItem, ExerciseName, ExerciseDescription, SelectButton } from './ExerciseListStyle';

const ExerciseList = ({ exercises, onAddExercise }) => {
    return (
        <ExerciseContainer>
            {exercises.map((exercise) => (
                <ExerciseItem key={exercise.ID_EJERCICIO}>
                    <ExerciseName>{exercise.NOMBRE}</ExerciseName>
                    <ExerciseDescription>{exercise.DESCRIPCION}</ExerciseDescription>
                    <SelectButton onClick={() => onAddExercise(exercise)}>Seleccionar</SelectButton>
                </ExerciseItem>
            ))}
        </ExerciseContainer>
    );
};

export default ExerciseList;
