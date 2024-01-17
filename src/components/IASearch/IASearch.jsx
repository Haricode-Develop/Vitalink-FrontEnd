import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import {SearchWrapper, Input, Button, ResultCard, ResultsContainer, listVariants, itemVariants, GreetingText} from "./IASearchStyle";

const SearchComponent = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [typingText, setTypingText] = useState('');

    const handleSearch = () => {
        setResults([{ id: 1, text: 'Resultado 1' }, { id: 2, text: 'Resultado 2' }]);
        if (onSearch) onSearch(searchTerm);
    };

    const simulatedTyping = ["Escribiendo consulta...", "Buscando resultados..."];

    useEffect(() => {
        let typingIndex = 0;
        const typingEffect = setInterval(() => {
            setTypingText(simulatedTyping[typingIndex].substring(0, typingText.length + 1));
            if (typingText === simulatedTyping[typingIndex]) {
                typingIndex = (typingIndex + 1) % simulatedTyping.length;
                setTypingText('');
            }
        }, 150);

        return () => clearInterval(typingEffect);
    }, [typingText]);

    return (
        <SearchWrapper>
            <GreetingText>¿Deseas Buscar algo?</GreetingText>
            <Input
                type="text"
                placeholder="Escribe para buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setTypingText('')}
                onBlur={() => setTypingText('Escribiendo consulta...')}
            />
            <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
            >
                Buscar
            </Button>
            <AnimatePresence>
                <ResultsContainer
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {results.map((result) => (
                        <ResultCard
                            key={result.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {result.text}
                        </ResultCard>
                    ))}
                </ResultsContainer>
            </AnimatePresence>
        </SearchWrapper>
    );
};

export default SearchComponent;
