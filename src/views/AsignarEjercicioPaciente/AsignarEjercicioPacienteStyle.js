import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import UserList from './UserList/UserList';
import CategoryAccordion from './CategoryAccordion/CategoryAccordion';
import ExerciseList from './ExerciseList/ExerciseList';
import SelectedExerciseList from './SelectedExerciseList/SelectedExerciseList';
// Asegúrate de importar los estilos globales o específicos que necesites aquí.

const ExerciseAssignment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        // Aquí iría la lógica para filtrar usuarios basado en la búsqueda.
    };

    const handleSelectUser = (userId) => {
        setSelectedUser(userId);
        // Aquí puedes manejar la selección del usuario.
    };

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        // Aquí manejas la selección de categoría y cargas los ejercicios correspondientes.
    };

    const handleAddExercise = (exercise) => {
        setSelectedExercises([...selectedExercises, exercise]);
        // Aquí manejas la adición de ejercicios a la lista de seleccionados.
    };

    const handleRemoveExercise = (exerciseId) => {
        setSelectedExercises(selectedExercises.filter(e => e.id !== exerciseId));
        // Aquí manejas la eliminación de ejercicios de la lista de seleccionados.
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <UserList users={/* Aquí pasarías los usuarios filtrados */} onSelectUser={handleSelectUser} />
            <CategoryAccordion categories={/* Aquí pasarías las categorías */} onSelectCategory={handleSelectCategory} />
            <ExerciseList exercises={/* Aquí pasarías los ejercicios de la categoría seleccionada */} onAddExercise={handleAddExercise} />
            <SelectedExerciseList selectedExercises={selectedExercises} onRemove={handleRemoveExercise} />
        </div>
    );
};

export default ExerciseAssignment;
