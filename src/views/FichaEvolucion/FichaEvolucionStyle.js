import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
`;

export const Title = styled.h1`
  color: var(--azul);
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

export const SearchContainer = styled.div`
  margin-bottom: 30px;
`;

export const EvolutionCard = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
`;

export const EvolutionModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--blanco);
  padding: 20px;
  z-index: 1050;
  border-radius: 8px;
  box-shadow: 0 10px 30px var(--verde-claro-rgba);
  width: 80%; // Ajusta el ancho del modal
  max-width: 800px; // Asegura que el modal no sea demasiado grande
`;


export const EvolutionForm = styled.form`
  display: block;
  flex-direction: column;
  gap: 20px;
`;


export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--rojo);
  cursor: pointer;
`;


export const ModalContent = styled.div`
  padding: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gris-oscuro);
`;



export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: var(--azul);
`;
export const ModalBody = styled.div`
  padding: 0;
`;


export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;


export const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 5px 0 20px 0;
  border: 2px solid var(--verde-medio);
  border-radius: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: var(--verde-oscuro);
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 100%; // Asegura que el textarea ocupa todo el ancho disponible
  height: 150px; // Ajusta la altura del textarea
  padding: 10px 15px;
  margin-bottom: 20px;
  border: 2px solid var(--verde-medio);
  border-radius: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: var(--verde-oscuro);
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  width: auto;
  background-color: var(--verde-oscuro);
  color: var(--blanco);
  padding: 10px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--verde-medio);
  }
`;