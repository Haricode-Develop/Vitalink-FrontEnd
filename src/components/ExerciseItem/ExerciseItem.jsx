import React from 'react';
import { ItemContainer, ItemTitle, ItemDescription, ItemButton, ItemSelect, ItemPreview, ItemCheckbox, ContentContainer } from './ExerciseItemStyle';

const ExerciseItem = ({ exercise, onAdd }) => {
    return (
        <ItemContainer onClick={() => onAdd(exercise.id)}>
            <ItemPreview />
            <ContentContainer>
                <ItemTitle>{exercise.name}</ItemTitle>
                <ItemDescription>{exercise.description}</ItemDescription>
            </ContentContainer>
            <ItemCheckbox type="checkbox" checked={exercise.selected} readOnly />
        </ItemContainer>
    );
};

export default ExerciseItem;