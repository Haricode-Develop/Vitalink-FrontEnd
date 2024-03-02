// PatientList.js

import React, { useState } from 'react';
import PatientCard from '../PatientCard/PatientCard';
import { ListButton, CardButton, ListContainer, ListItem, SelectButton, PatientInfo, PatientListContainer } from './PatientListStyle';
import Pagination from "../Pagination/Pagination";
const PatientList = ({ patients, onSelectPatient }) => {
    const [viewMode, setViewMode] = useState('card');
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = viewMode === 'list' ? 8 : 4;

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <ListButton onClick={() => { setViewMode('list'); setCurrentPage(1); }} active={viewMode === 'list'}>Lista</ListButton>
            <CardButton onClick={() => { setViewMode('card'); setCurrentPage(1); }} active={viewMode === 'card'}>Tarjetas</CardButton>
            <PatientListContainer>

                {viewMode === 'list' ? (
                    <ListContainer>
                        {currentPatients.map((patient) => (
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
                        {currentPatients.map((patient) => (
                            <PatientCard key={patient.id} patient={patient} onSelect={onSelectPatient} />
                        ))}
                    </div>
                )}
            </PatientListContainer>
            <Pagination patientsPerPage={patientsPerPage} totalPatients={patients.length} paginate={paginate} currentPage={currentPage} />

        </div>
    );
};

export default PatientList;
