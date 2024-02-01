import styled, { keyframes } from 'styled-components';

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    
  }
`;


export const PatientList = styled.div`
  width: 300px;
  background: #f8f8f8;
  margin-right: 20px;
  padding: 10px;
  border-radius: 5px;
`;

export const Patient = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #e9e9e9;
  }
  &.removing {
    animation: ${slideOut} 0.5s ease forwards;
  }
`;

export const CalendarContainer = styled.div`
  flex: 1;
  @media (min-width: 768px) {
    max-width: calc(100% - 320px);
  }
  @media (max-width: 768px) {
    width: 100%;
    order: 2;
    .fc-button {
      font-size: 1rem;
    }
    .fc-daygrid-day {
      transition: background-color 0.3s ease;
    }
    .fc-daygrid-day.fc-day-today {
      background-color: #d3f9d8;
    }
    .fc-toolbar {
      flex-direction: column;
    }
    .fc-daygrid-day {
      font-size: 1.2rem;
    }
  }

`;


export const PatientSearch = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ScrollablePatientList = styled(PatientList)`
  overflow-y: scroll;
  max-height: 100vh;
  @media (min-width: 768px) {
    flex-basis: 300px;
    max-width: 300px;
  }
  @media (max-width: 768px) {
    width: 100%;
    max-height: 50vh;
    margin-right: 0;
  }
`;



export const TimeInput = styled.input`
  width: 48%;
  padding: 8px 12px;
  margin: 5px 1%;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  display: inline-block;
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;
export const FixedSearchContainer = styled.div`
  position: sticky;
  top: 0; // Fijar en la parte superior del contenedor ScrollablePatientList
  background-color: white;
  padding-right: 20px;
  margin-bottom: 20px ;
  z-index: 10; // Asegurarse que se muestre encima del contenido al desplazar
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`
export const SearchButton = styled.button`
  margin-left: 0.5rem;
`

export const ResetButton  = styled.button`
  margin-left: 0.5rem;

`
export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`




export const StyledButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;


export const StyledSelect = styled.select`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;

`;


export const CloseButton = styled.button`
  align-self: center;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;


export const ModalHeader  = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;  
`;

export const StyledLabel = styled.label`
  margin-right: 10px;
  margin-bottom: 0.5rem;
  min-width: 50px;
`;


export const FixedFilterButton = styled.button`
  position: fixed;
  top: 20px;
  
  right: 190px;
  z-index: 100;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    position: relative;
    margin-bottom: 10px;
    right: auto;
    top: auto;
    width: 100%;
  }
`;