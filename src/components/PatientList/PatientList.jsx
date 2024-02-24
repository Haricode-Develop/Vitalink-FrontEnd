// PatientList.js

import React, { useState } from 'react';
import PatientCard from '../PatientCard/PatientCard';
import { ListButton, CardButton, ListContainer, ListItem, SelectButton, PatientInfo, PatientListContainer } from './PatientListStyle';

const PatientList = ({ patients, onSelectPatient }) => {
    const [viewMode, setViewMode] = useState('card'); // Valor por defecto a 'list' si prefieres eso

    return (
        <div>
            <ListButton onClick={() => setViewMode('list')} active={viewMode === 'list'}>Lista</ListButton>
            <CardButton onClick={() => setViewMode('card')} active={viewMode === 'card'}>Tarjetas</CardButton>
            <PatientListContainer>

                {viewMode === 'list' ? (
                    <ListContainer>
                        {patients.map((patient) => (
                            <ListItem key={patient.id}>
                                <PatientInfo>
                                    {patient.nombre} {patient.apellido} - {patient.email}
                                </PatientInfo>
                                <SelectButton onClick={() => onSelectPatient(patient)}>Seleccionar</SelectButton>
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
            </PatientListContainer>
        </div>
    );
};

export default PatientList;
