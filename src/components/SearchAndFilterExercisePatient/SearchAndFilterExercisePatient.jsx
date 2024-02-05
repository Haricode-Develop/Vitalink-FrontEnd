// SearchAndFilter.js
import React from 'react';
import { SearchInput, SearchWrapper } from './SearchAndFilterExercisePatientStyle';

const SearchAndFilter = ({ onSearch }) => {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    return (
        <SearchWrapper>
            <SearchInput type="text" placeholder="Buscar..." onChange={handleSearch} />
        </SearchWrapper>
    );
};

export default SearchAndFilter;
