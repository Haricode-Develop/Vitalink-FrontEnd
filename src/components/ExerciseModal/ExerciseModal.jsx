import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import {
    LeftSection,
    RightSection,
    SearchBar,
    VideoListContainer,
    FilterSection,
    FilterDropdown, // Asegúrate de definir este estilo para que tenga un scroll
    ConfirmButtonContainer,
    ConfirmButton,
    FilterButton,
    CloseButton,
    FilterCheckbox,
    FilterItem,
    StyledFilterDropdown, FilterButtonContainer
} from './ExerciseModalStyle';
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import SelectedPatientItem from "../SelectedPatientItem/SelectedPatientItem";
import { StyledModal } from "../Modal";
import { API_BASE_URL } from "../../utils/config";

const ExerciseModal = ({ isOpen, onRequestClose, selectedExercises, onExerciseSelect, selectedPatient, onSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ categorias: [], areasCorporales: [], subAreas: [] });
    const [selectedFilters, setSelectedFilters] = useState({
        categoria: [],
        areaCorporal: [],
        subArea: []
    });
    const [showFilterDropdown, setShowFilterDropdown] = useState({ categoria: false, areaCorporal: false, subArea: false });
    const [ejercicios, setEjercicios] = useState([]);


    // Refs para los menús desplegables
    const categoriaRef = useRef(null);
    const areaCorporalRef = useRef(null);
    const subAreaRef = useRef(null);

    const handleOutsideClick = (e, ref, filter) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setShowFilterDropdown(prevState => ({ ...prevState, [filter]: false }));
        }
    };

    useEffect(() => {
        // Función para agregar el listener de eventos
        const addOutsideClickListener = (ref, filter) => {
            document.addEventListener('mousedown', (e) => handleOutsideClick(e, ref, filter));
        };

        // Añade el listener si el menú desplegable correspondiente está abierto
        if (showFilterDropdown.categoria) {
            addOutsideClickListener(categoriaRef, 'categoria');
        }
        if (showFilterDropdown.areaCorporal) {
            addOutsideClickListener(areaCorporalRef, 'areaCorporal');
        }
        if (showFilterDropdown.subArea) {
            addOutsideClickListener(subAreaRef, 'subArea');
        }

        // Función de limpieza para eliminar los listeners
        return () => {
            document.removeEventListener('mousedown', (e) => handleOutsideClick(e, categoriaRef, 'categoria'));
            document.removeEventListener('mousedown', (e) => handleOutsideClick(e, areaCorporalRef, 'areaCorporal'));
            document.removeEventListener('mousedown', (e) => handleOutsideClick(e, subAreaRef, 'subArea'));
        };
    }, [showFilterDropdown]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/asignacion/filtros`)
            .then((response) => response.json())
            .then((data) => {
                setFilters({
                    categorias: data.categorias || [],
                    areasCorporales: data.areasCorporales || [],
                    subAreas: data.subAreas || [],
                });
            })
            .catch((error) => console.error('Error al cargar filtros:', error));
        fetchFilteredExercises(true);
    }, []);

    const fetchFilteredExercises = () => {
        const filterParams = new URLSearchParams();

        if (selectedFilters.categoria.length > 0) {
            filterParams.append('categoria', selectedFilters.categoria.join(','));
        }
        if (selectedFilters.areaCorporal.length > 0) {
            filterParams.append('areaCorporal', selectedFilters.areaCorporal.join(','));
        }
        if (selectedFilters.subArea.length > 0) {
            filterParams.append('subArea', selectedFilters.subArea.join(','));
        }


        const url = `${API_BASE_URL}/asignacion/ejercicios/detalle?${filterParams.toString()}`;
        fetch(url)
            .then(response => response.ok ? response.json() : Promise.reject('Error al cargar ejercicios'))
            .then(data => {
                setEjercicios(data);
            })
            .catch(error => console.error(error));
    };
    const closeOtherDropdowns = (openDropdown) => {
        const newShowFilterDropdown = {
            categoria: false,
            areaCorporal: false,
            subArea: false
        };

        newShowFilterDropdown[openDropdown] = true;
        setShowFilterDropdown(newShowFilterDropdown);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleConfirmSelection = () => {
        onExerciseSelect(Array.from(selectedExercises.entries()));
        onRequestClose();
    };

    const toggleFilterDropdown = (filter) => {
        if (showFilterDropdown[filter]) {
            setShowFilterDropdown(prevState => ({ ...prevState, [filter]: false }));
        } else {
            closeOtherDropdowns(filter);
        }
    };
    const handleFilterSelect = (filterType, id) => {
        setSelectedFilters(prevState => {
            const newSelectedFilters = { ...prevState };

            const currentIndex = newSelectedFilters[filterType].indexOf(id);
            if (currentIndex === -1) {
                newSelectedFilters[filterType] = [...newSelectedFilters[filterType], id];
            } else {
                newSelectedFilters[filterType] = newSelectedFilters[filterType].filter(item => item !== id);
            }

            return newSelectedFilters;
        });
    };


    const isFilterSelected = (filterType, id) => {
        return selectedFilters[filterType].includes(id);
    };

    useEffect(() => {
        if (isOpen) {
            fetchFilteredExercises();
        }
    }, [selectedFilters, isOpen]);
    return (
        <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} width='90vw' maxWidth='90vw' height='85vh' flexDirection={'row'}>
            <CloseButton onClick={onRequestClose}><FaTimes /></CloseButton>
            <LeftSection>
                <SearchBar type="text" placeholder="Buscar ejercicios..." onChange={handleSearch} />
                <FilterSection>
                    {/* Categoría */}
                    <FilterButtonContainer>

                    <FilterButton onClick={() => toggleFilterDropdown('categoria')}>Categoría <FaFilter /></FilterButton>
                    {showFilterDropdown.categoria && (
                        <StyledFilterDropdown ref={categoriaRef}>
                            {filters.categorias.map(categoria => (
                                <FilterItem key={categoria.id}>
                                    <FilterCheckbox
                                        type="checkbox"
                                        checked={isFilterSelected('categoria', categoria.id)}
                                        onChange={() => handleFilterSelect('categoria', categoria.id)}
                                    />
                                    {categoria.nombre}
                                </FilterItem>
                            ))}
                        </StyledFilterDropdown>
                    )}
                    </FilterButtonContainer>
                    <FilterButtonContainer>

                    {/* Área Corporal */}
                    <FilterButton onClick={() => toggleFilterDropdown('areaCorporal')}>Área Corporal <FaFilter /></FilterButton>
                    {showFilterDropdown.areaCorporal && (
                        <StyledFilterDropdown ref={areaCorporalRef}>
                            {filters.areasCorporales.map(area => (
                                <FilterItem key={area.id}>
                                    <FilterCheckbox
                                        type="checkbox"
                                        checked={isFilterSelected('areaCorporal', area.id)}
                                        onChange={() => handleFilterSelect('areaCorporal', area.id)}
                                    />
                                    {area.nombre}
                                </FilterItem>
                            ))}
                        </StyledFilterDropdown>
                    )}
                    </FilterButtonContainer>

                    {/* Sub Área Corporal */}
                    <FilterButtonContainer>

                    <FilterButton onClick={() => toggleFilterDropdown('subArea')}>Sub Área Corporal <FaFilter /></FilterButton>
                    {showFilterDropdown.subArea && (
                        <StyledFilterDropdown ref={subAreaRef}>
                            {filters.subAreas.map(subArea => (
                                <FilterItem key={subArea.id}>
                                    <FilterCheckbox
                                        type="checkbox"
                                        checked={isFilterSelected('subArea', subArea.id)}
                                        onChange={() => handleFilterSelect('subArea', subArea.id)}
                                    />
                                    {subArea.nombre}
                                </FilterItem>
                            ))}
                        </StyledFilterDropdown>
                    )}
                    </FilterButtonContainer>

                </FilterSection>
                <VideoListContainer>
                    {ejercicios.map((exercise) => (
                        <ExerciseItem
                            key={exercise.id}
                            exercise={exercise}
                            onAdd={() => onExerciseSelect(exercise.id, !selectedExercises.get(exercise.id))}
                            selected={selectedExercises.get(exercise.id)}
                        />
                    ))}
                </VideoListContainer>
            </LeftSection>
            <RightSection>
                <SelectedPatientItem key={selectedPatient.id} patient={selectedPatient} />
            </RightSection>
            <ConfirmButtonContainer>
                <ConfirmButton onClick={onSubmit}>Asignar</ConfirmButton>
            </ConfirmButtonContainer>
        </StyledModal>
    );
};

export default ExerciseModal;
