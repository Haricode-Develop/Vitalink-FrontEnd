// SelectedPatientItem.js
import React from 'react';
import { SelectedItemContainer, ItemTitle, ItemDescription } from './SelectedPatientItemStyle';

const SelectedPatientItem = ({ patient }) => {
    return (
        <SelectedItemContainer>
            <ItemTitle>{patient.name}</ItemTitle>
            <ItemDescription>{patient.description}</ItemDescription>
        </SelectedItemContainer>
    );
};

export default SelectedPatientItem;
