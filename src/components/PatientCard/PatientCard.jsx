import React from 'react';
import { Card, Name, Email, SelectButton } from "./PatientCardStyle";

const PatientCard = ({ patient, onSelect }) => (
    <Card
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
    >
        <Name>{patient.nombre} {patient.apellido}</Name>
        <Email>{patient.email}</Email>
        <SelectButton onClick={() => onSelect(patient)}>Seleccionar</SelectButton>
    </Card>
);

export default PatientCard;
