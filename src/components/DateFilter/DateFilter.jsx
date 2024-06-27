import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {FilterContainer, FilterInput, FilterLabel } from './DateFilterStyle';
const DateFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
    return (
        <FilterContainer>
            <FilterLabel>Start Date:</FilterLabel>
            <FilterInput
                type="date"
                value={startDate.toISOString().substr(0, 10)}
                onChange={e => onStartDateChange(new Date(e.target.value))}
            />
            <FilterLabel>End Date:</FilterLabel>
            <FilterInput
                type="date"
                value={endDate.toISOString().substr(0, 10)}
                onChange={e => onEndDateChange(new Date(e.target.value))}
            />
        </FilterContainer>
    );
};

export default DateFilter;