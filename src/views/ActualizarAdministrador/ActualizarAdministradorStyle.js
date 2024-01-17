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
export const AdminInfo = styled.span`
    font-size: 14px;
`;
export const SelectButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #072B4A;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #051f34;
  }
`;
export const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch; // Asegúrate de que los hijos ocupen todo el espacio disponible
`;
export const ModalBody = styled.div`
  margin-bottom: 20px;
`;
export const ModalHeader = styled.div`
  margin-bottom: 15px;
  text-align: center;
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around; // Separar los botones uniformemente
`;
export const ButtonCancel = styled.button`
  padding: 10px 20px;
  margin: 0 10px; // Dar espacio entre los botones
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  ${({ cancelBtn }) => cancelBtn && `
    background-color: #ff6347; // Color rojo para cancelar acciones
    color: white;
  `}
`;
export const Title = styled.h1`
  color: #333;
  font-size: 40px; /* Tamaño de fuente más grande */
  margin-bottom: 30px; /* Espaciado debajo del título más grande */
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px; /* Más padding para una mayor separación */
  margin-bottom: 20px; /* Separación más grande entre los inputs */
  border: none;
  background-color: #D9D9D9;
`;

export const DateInput = styled(Input).attrs({ type: 'date' })``;

export const EmailInput = styled(Input).attrs({ type: 'email' })``;

export const Select = styled.select`
  width: 100%;
  padding: 15px; /* Más padding para una mayor separación */
  margin-bottom: 20px; /* Separación más grande entre los inputs */
  border: none;
  background-color: #D9D9D9;
`;

export const PictureColumn = styled.div`
  width: 50%; /* Toma la mitad del ancho disponible */
  display: flex;
  flex-direction: column; /* Para que la imagen esté arriba del botón */
  align-items: center; /* Centrar los elementos */
  padding: 20px;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column; /* Para que el botón esté debajo de la imagen */
  align-items: flex-end; /* Alinear a la derecha pero no en la esquina */
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
  background-color: #D9D9D9;
  border: 1px solid #ccc;
`;
export const AdminList = styled.ul`
    list-style-type: none; /* Para eliminar los bullets de la lista */
    padding: 0;
    max-height: 200px; /* Limita el alto para que no sea demasiado largo */
    overflow-y: scroll; /* Habilita el desplazamiento vertical en caso de muchos elementos */
    border: 1px solid #D9D9D9;
`;
export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    border-bottom: 1px solid #D9D9D9;

    &:hover {
        background-color: #f3f3f3;
    }
`;
export const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;
export const DatePickerWrapper = styled.div`
  margin-bottom: 20px; /* Añadir espacio debajo del selector de fecha */
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    width: 100%;
  }
  input {
    width: 100%;
    padding: 15px;
    border: none;
    background-color: #D9D9D9;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #333;
  color: white;
  border: none;
  &:hover {
    background-color: #555;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
