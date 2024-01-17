import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from "../../components/SerchBar/SearchBar";
import UserList from '../../components/UserList/UserList';
import CategoryAccordion from '../../components/CategoryAccordion/CategoryAccordion';
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import SelectedExerciseList from '../../components/SelectedExerciseList/SelectedExerciseList';
import {API_BASE_URL} from "../../utils/config";

// Importa aquí los estilos globales o específicos que necesites.

const ExerciseAssignment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
        // Cargar todas las categorías al inicio
        axios.get(`${API_BASE_URL}/ejercicio/categoriasEjercicios`)
            .then(response => {

                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error al cargar categorías:', error);
            });
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
        axios.get(`${API_BASE_URL}/ejercicio/buscarUsuarios?searchTerm=${term}`)
            .then(response => {

                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error al buscar usuarios:', error);
            });
    };

    const handleSelectUser = (userId) => {
        setSelectedUser(userId);
        // Aquí podrías cargar más detalles del usuario si es necesario
    };

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        axios.get(`${API_BASE_URL}/ejercicio/ejerciciosPorCategoria/${categoryId}`)
            .then(response => {

                setExercises(response.data);
            })
            .catch(error => {
                console.error('Error al cargar ejercicios:', error);
            });
    };

    const handleAddExercise = (exercise) => {
        setSelectedExercises(prevExercises => [...prevExercises, exercise]);
        // Aquí podrías hacer una llamada a la API para asignar el ejercicio al usuario
    };

    const handleRemoveExercise = (exerciseId) => {
        setSelectedExercises(prevExercises => prevExercises.filter(e => e.id !== exerciseId));
        // Aquí podrías hacer una llamada a la API para eliminar el ejercicio asignado al usuario
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <UserList users={users} onSelectUser={handleSelectUser} />
            <CategoryAccordion categories={categories} onSelectCategory={handleSelectCategory} />
            <ExerciseList exercises={exercises} onAddExercise={handleAddExercise} />
            <SelectedExerciseList selectedExercises={selectedExercises} onRemove={handleRemoveExercise} />
        </div>
    );
};

export default ExerciseAssignment;
