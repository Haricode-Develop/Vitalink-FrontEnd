import React, { useState } from 'react';
import { SearchInput } from './SearchBarStyle';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div>
            <SearchInput
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
