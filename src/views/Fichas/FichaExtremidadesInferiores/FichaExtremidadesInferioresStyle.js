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
  background: var(--blanco);
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
  border: 1px solid var(--gris);
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
  border: 1px solid var(--gris);
  border-radius: 4px;
  font-size: 16px;
  background: var(--blanco);
`;

export const Title = styled.h2`
  text-align: center;
  color: var(--negro);
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: var(--azul);
  color: var(--blanco);
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: var(--azul);
  }
`;

export const DatePickerWrapper = styled.div`
  margin-bottom: 20px;
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
  background-color: var(--verde-indicador);
  color: var(--blanco);
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
    background-color: var(--gris);
    cursor: pointer;
    transform: scale(1.02);
  }

  &.selected {
    background-color: var(--gris);
  }
`;


export const ButtonAceptar = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: var(--azul);
  color: var(--blanco);
  border-radius: 5px;
  box-shadow: 0 2px 5px var(--negro-rgba-03);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--azul);
    cursor: pointer;
    transform: translateY(-2px);
  }
`;


export const ButtonCancelar = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: var(--gris);
  color: var(--negro);
  border-radius: 5px;
  margin-left: 10px; // para añadir espacio entre los botones
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--gris);
    cursor: pointer;
    transform: translateY(-2px);
  }
`;
