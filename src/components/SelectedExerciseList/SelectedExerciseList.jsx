import React from 'react';
import { List, Item, Name, RemoveButton } from './SelectedExerciseListStyle';

const SelectedExerciseList = ({ selectedExercises, onRemoveExercise }) => {
    return (
        <List>
            {selectedExercises.map((exercise) => (
                <Item key={exercise.ID_EJERCICIO}>
                    <Name>{exercise.NOMBRE}</Name>
                    <RemoveButton onClick={() => onRemoveExercise(exercise.ID_EJERCICIO)}>Eliminar</RemoveButton>
                </Item>
            ))}
        </List>
    );
};

export default SelectedExerciseList;
