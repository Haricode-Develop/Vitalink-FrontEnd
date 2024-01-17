import React from 'react';

import { PaginationContainer, PageNumber} from '../Pagination/PaginationStyle';
const Pagination = ({ patientsPerPage, totalPatients, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPatients / patientsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <PaginationContainer>
            {pageNumbers.map(number => (
                <PageNumber key={number} isActive={currentPage === number} onClick={() => paginate(number)}>
                    {number}
                </PageNumber>
            ))}
        </PaginationContainer>
    );
};

export default Pagination;