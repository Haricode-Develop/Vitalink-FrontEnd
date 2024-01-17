import styled, {keyframes} from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background: white;
`;

export const BodyMapStyle = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background: white;
`;

export const Title = styled.h2`
  text-align: center;
  color: #333;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: #0056b3;
  }
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
  }
`;
const fade = keyframes `
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;
export const IndicadorGuardado = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 128, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: ${props => props.mostrar ? 'block' : 'none'};
  animation: ${fade} 2s linear;
`;



export const ListItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  list-style: none;
  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
    transform: scale(1.02);
  }

  &.selected {
    background-color: #e0e0e0;
  }
`;


export const ButtonAceptar = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
    cursor: pointer;
    transform: translateY(-2px);
  }
`;


export const ButtonCancelar = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #6c757d;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  margin-left: 10px; // para añadir espacio entre los botones
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #5a6268;
    cursor: pointer;
    transform: translateY(-2px);
  }
`;
