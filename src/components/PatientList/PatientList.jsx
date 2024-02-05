import React, { useState } from 'react';
import PatientCard from '../PatientCard/PatientCard';
import { ListButton, CardButton, ListContainer, ListItem } from './PatientListStyle';

const PatientList = ({ patients, onSelectPatient }) => {
    const [viewMode, setViewMode] = useState('list'); // O 'card'

    return (
        <div>
            <ListButton onClick={() => setViewMode('list')} active={viewMode === 'list'}>Lista</ListButton>
            <CardButton onClick={() => setViewMode('card')} active={viewMode === 'card'}>Tarjetas</CardButton>
            {viewMode === 'list' ? (
                <ListContainer>
                    {patients.map((patient) => (
                        <ListItem key={patient.id}>
                            {patient.nombre} - <button onClick={() => onSelectPatient(patient)}>Seleccionar</button>
                        </ListItem>
                    ))}
                </ListContainer>
            ) : (
                <div>
                    {patients.map((patient) => (
                        <PatientCard key={patient.id} patient={patient} onSelect={onSelectPatient} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientList;
