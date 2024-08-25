import React from 'react';
import { PaginationContainer, PageNumber } from './PaginationStyle';

const Pagination = ({ patientsPerPage, totalPatients, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPatients / patientsPerPage);

    // Determina el número de páginas visibles basándose en el tamaño de la pantalla
    const visiblePages = window.innerWidth <= 768 ? 5 : 10; // 5 en móviles, 10 en pantallas grandes

    // Calcular el rango de páginas visibles
    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = startPage + visiblePages - 1;

    // Ajusta si el rango excede el número total de páginas
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <PaginationContainer>
            {/* Botón de retroceso para ir al bloque anterior de páginas */}
            {startPage > 1 && (
                <PageNumber onClick={() => paginate(startPage - 1)}>
                    &laquo;
                </PageNumber>
            )}

            {pageNumbers.map(number => (
                <PageNumber
                    key={number}
                    isActive={currentPage === number}
                    onClick={() => paginate(number)}
                >
                    {number}
                </PageNumber>
            ))}

            {/* Botón de avance para ir al siguiente bloque de páginas */}
            {endPage < totalPages && (
                <PageNumber onClick={() => paginate(endPage + 1)}>
                    &raquo;
                </PageNumber>
            )}
        </PaginationContainer>
    );
};

export default Pagination;
