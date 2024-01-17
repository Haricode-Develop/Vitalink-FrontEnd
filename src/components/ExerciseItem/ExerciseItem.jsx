import React from 'react';
import { ItemContainer, ItemTitle, ItemDescription, ItemButton } from './ExerciseItemStyle';

const ExerciseItem = ({ exercise, onAdd }) => {
    return (
        <ItemContainer>
            <ItemTitle>{exercise.name}</ItemTitle>
            <ItemDescription>{exercise.description}</ItemDescription>
            <ItemButton onClick={() => onAdd(exercise)}>Agregar</ItemButton>
        </ItemContainer>
    );
};

export default ExerciseItem;
