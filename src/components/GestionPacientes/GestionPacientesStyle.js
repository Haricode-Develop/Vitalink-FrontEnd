// GestionPacientesStyle.js
import styled, { css } from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const SearchInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 300px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

export const PatientCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${props => props.noEmail && css`
    background-color: #ffdddd; // Fondo rojo claro para pacientes sin correo electrónico
  `}
`;

export const PatientInfo = styled.div`
  text-align: center;
`;

export const PatientName = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

export const PatientEmail = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #666;
`;

export const EditButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const NoEmailIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 16px;
  margin: 5px 0;

  svg {
    margin-right: 5px;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;


export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;


export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
  &:focus {
    outline: none;
  }
`;


export const ModalContent = styled.div`

`;


export const ModalHeader = styled.h3`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export const AssignedDoctor = styled.div`
  background-color: #f4f4f4;
  margin-top: 15px;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
 

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const DoctorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DoctorName = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

export const DoctorEmail = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

export const ChangeDoctorButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  width: auto; 
  margin-top:10px; 
  &:hover {
    background-color: #0056b3;
  }

  svg {
    font-size: 20px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;