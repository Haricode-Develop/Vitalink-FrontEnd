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
  background: var(--blanco);
  margin-right: 20px;
  padding: 10px;
  border-radius: 5px;
`;

export const Patient = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: var(--blanco);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border-left: 5px solid ${props => props.color || 'var(--limon)'};

  &:hover {
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.2rem;
    color: var(--azul);
    margin: 0;
  }

  p {
    font-size: 0.9rem;
    color: var(--gris-oscuro);
    margin-top: 5px;
  }

  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.statusColor ||`var(--limon)`};
    display: inline-block;
    margin-right: 10px;
  }
`;

export const CalendarContainer = styled.div`
  flex: 1;
  @media (min-width: 768px) {
    max-width: calc(100% - 320px);
  }
  @media (max-width: 768px) {
    .fc-daygrid-day-number {
      font-size: 1.5rem;
      color: var(--negro);
      padding: 0.5em;
      display: inline-block;
      width: 100%;
      text-align: center;
    }

    .fc-daygrid-day {
      border: none;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    .fc-day-today {
      background-color: var(--verde-oscuro-rgba);
    }
    .fc-daygrid-day.fc-day-today {
      background-color: var(--verde-claro);
    }

    .fc-toolbar-chunk {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px 0;
    }

    .fc-button {
      font-size: 1rem;
      padding: 0.5em 1em;
      margin: 0 5px;
      border-radius: 4px;
      &:hover {
        background-color: var(--blanco);
      }
    }
    .fc-event {
      background-color: var(--gris);
      border: none;
      border-radius: 6px;      
      font-size: 0.8rem;
      padding: 0.25rem;
      cursor: pointer;
    }
    .fc-daygrid-day-top {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
    }
    .fc-button-primary {
      background-color:var(--blanco);
      color: var(--azul);
      border: 1px solid var(--azul);
    }
    .fc-day-selected {
      border: 2px solid var(--color-primario);
    }
    .fc .fc-toolbar{
      display: block!important;
    }
  }

`;


export const PatientSearch = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--gris);
  border-radius: 4px;
`;

export const ScrollablePatientList = styled(PatientList)`
  overflow-y: auto;
  
  max-height: 100vh;
  position: relative;
  margin-left: 0;
  @media (min-width: 768px) {
    flex-basis: 300px;
    max-width: 300px;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 0px;

    max-height: 100vh;
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
  top: -20px;
  background-color: white;
  padding: 20px;
  z-index: 10;
  margin-left: -20px;
  width: calc(95%);
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
  background-color: var(--limon);
  color: var(--negro);
  font-size: 16px;
  cursor: pointer;

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
  position: absolute;
  top: 25px;
  left: 500px;
  z-index: 100;
  background-color: var(--limon);
  color: var(--negro);
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    position: relative;
    margin-bottom: 10px;
    left: auto;
    top: auto;
    width: 100%;
  }
`;


export const LegendContainer = styled.div`
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 12px;
  margin-right: 16px;
  border-radius: 16px;
  margin: 10px;
  background-color: ${props => `${props.color}20`};
  font-size: 0.875rem;
`;

export const LegendColor = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

export const LegendText = styled.span`
  color: ${props => props.color};
`;
