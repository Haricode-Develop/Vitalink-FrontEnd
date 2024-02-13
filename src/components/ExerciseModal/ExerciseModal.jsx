import React from 'react';
import { FaFilter } from 'react-icons/fa';
import {
    LeftSection,
    RightSection,
    SearchBar,
    VideoListContainer,
    FilterSection,
    ConfirmButtonContainer,
    ConfirmButton,
    FilterButton
} from './ExerciseModalStyle'; // Suponiendo que los componentes estilizados están aquí
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import SelectedPatientItem from "../SelectedPatientItem/SelectedPatientItem";
import {StyledModal} from "../Modal";
const ExerciseModal = ({ isOpen, onRequestClose, exercises, onExerciseSelect, selectedExercises, setSelectedExercises }) => {
    const handleSelectExercise = (exerciseId) => {
        const newSelection = new Map(selectedExercises);
        newSelection.set(exerciseId, !newSelection.get(exerciseId));
        setSelectedExercises(newSelection);
    };

    const handleConfirmSelection = () => {
        onExerciseSelect(Array.from(selectedExercises.entries()));
        onRequestClose();
    };
    const sampleExercises = [
        { id: 1, name: 'Sentadillas', description: 'Ejercicio para piernas' },
        { id: 2, name: 'Flexiones', description: 'Ejercicio para pecho y brazos' },
        { id: 3, name: 'Abdominales', description: 'Ejercicio para abdomen' },
        // Agrega más ejercicios de ejemplo aquí
    ];

    const selectedPatients = [
        { id: 'p1', name: 'Juan Perez', description: 'Paciente seleccionado 1' },
        { id: 'p2', name: 'Maria Gomez', description: 'Paciente seleccionado 2' },
        // ... más pacientes ...
    ];
    return (
        <StyledModal   isOpen={isOpen}
                       onRequestClose={onRequestClose}
                       width='80vw'
                       maxWidth='80vw'
                       height='80vh'
                       flexDirection={'row'}>
            <LeftSection>
                <SearchBar type="text" placeholder="Buscar ejercicios..." />
                <FilterSection>
                    <FilterButton><FaFilter /> Categoria</FilterButton>
                    <FilterButton><FaFilter /> Area Corporal</FilterButton>
                    <FilterButton><FaFilter /> Sub Area Corporal</FilterButton>
                </FilterSection>
                <VideoListContainer>
                    {sampleExercises.map((exercise) => (
                        <ExerciseItem
                            key={exercise.id}
                            exercise={exercise}
                            onAdd={() => handleSelectExercise(exercise.id)}
                        />
                    ))}
                </VideoListContainer>
            </LeftSection>
            <RightSection>
                {selectedPatients.map((patient) => (
                    <SelectedPatientItem key={patient.id} patient={patient} />
                ))}
            </RightSection>
            <ConfirmButtonContainer>
                <ConfirmButton onClick={handleConfirmSelection}>
                    Confirmar Selección
                </ConfirmButton>
            </ConfirmButtonContainer>
        </StyledModal>
    );
};

export default ExerciseModal;
