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

export const UploadButton = styled.button`
  background-color: #072B4A;
  color: white;
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
export const DownloadLink = styled.a`
  text-align: center;
  padding: 10px 15px;
  background-color: #072B4A;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #082e4f;
  }
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
export const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  display: block;
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
export const CustomFileUpload = styled.label`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #072B4A;
  color: white;
  border: none;
  margin-right: 10px;
  &:hover {
    background-color: #072B4A;
  }
`;
const fade = keyframes `
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;
export const IndicadorGuardado = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 128, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: ${props => props.mostrar ? 'block' : 'none'};
  animation: ${fade} 2s linear;
`;
