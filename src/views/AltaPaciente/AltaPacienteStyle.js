import styled, { keyframes } from 'styled-components';
const breakpoints = {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
};
export const Container = styled.div`
  display: flex;
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
  }
`;
export const Label = styled.label`
  font-size: 16px;
  color: var(--negro);
  margin-bottom: 5px;
  display: block;
 
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    padding: 20px 20px 20px 8px;

  }
  @media (max-width: ${breakpoints.mobile}){
    padding: 0;

  }
`;
export const Title = styled.h1`
  color: var(--negro);
  font-size: 40px; 
  margin-bottom: 30px; 
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px; 
  margin-bottom: 20px; 
  border: none;
  background-color: var(--gris);
  @media (max-width: ${breakpoints.tablet}) {
    padding-right: 0px;
    padding-left: 0px;
    width: 95%;
  }
`;

export const DateInput = styled(Input).attrs({ type: 'date' })``;

export const EmailInput = styled(Input).attrs({ type: 'email' })``;

export const Select = styled.select`
  width: 100%;
  padding: 15px; 
  margin-bottom: 20px; 
  border: none;
  background-color: var(--gris);
`;

export const PictureColumn = styled.div`
  width: 50%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
  margin-bottom: 15px;
`;

export const FormColumn = styled.div`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;

  }
`;
export const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  background-color: var(--gris);
  border: 1px solid #ccc;
`;

export const UploadButton = styled.button`
  background-color: var(--azul);
  color: var(--blanco);
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--negro);
  color: var(--blanco);
  border: none;
  &:hover {
    background-color: var(--gris-oscuro);
  }
  &:disabled {
    background-color: var(--gris);
    cursor: not-allowed;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding-right: 0px;
    padding-left: 0px;
    width: 95%;
  }
`;
export const FisioList = styled.ul`
    list-style-type: none; 
    padding: 0;
    max-height: 200px; 
    overflow: scroll;
    overflow-x: hidden;
    border: 1px solid var(--gris);
`;





export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    border-bottom: 1px solid var(--gris);

    &:hover {
        background-color: var(--gris);
    }
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around; // Separar los botones uniformemente
`;

export const ModalHeader = styled.div`
  margin-bottom: 15px;
  text-align: center;
`;
export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--gris);
  margin-bottom: 20px;
  font-size: 16px;
  resize: vertical;

`;
export const FisioInfo = styled.span`
    font-size: 14px;
`;
export const ButtonCancel = styled.button`
  padding: 10px 20px;
  margin: 0 10px; // Dar espacio entre los botones
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 2px 2px 10px var(--negro-rgba-03);

  ${({ cancelBtn }) => cancelBtn && `
    background-color: #FF5465; // Color rojo para cancelar acciones
    color: white;
  `}
`;
export const ModalBody = styled.div`
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
  padding: 10px;
`;

export const PatientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; // Espacio entre elementos de la lista
`;
export const SelectButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: var(--azul);
  color: var(--blanco);
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: var(--azul);
  }
`;
export const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const PatientItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto; 
  align-items: center;
  gap: 10px;
`;

export const PatientNumber = styled.span`
  white-space: nowrap;
`;
export const PatientDetails = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export const MotiveInput = styled.input`
  padding: 5px;
  width: 100%;
  max-width: 400px;
`;