import styled from 'styled-components';

// Definimos los componentes estilizados aquí.


export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;


  @media (max-width: 768px) {
    order: 1;
    height: 50%; // Ajuste para mostrar más ejercicios en pantalla
  }

  @media (min-width: 768px) {
    flex: 0 0 60%;
    order: 1; // En pantallas más grandes, será el primero
  }
`;

export const RightSection = styled.div`
  flex: 1;
  background-color: var(--gris);
  padding: 20px;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
  }

  @media (min-width: 768px) {
    flex: 0 0 40%;
    order: 2; // En pantallas más grandes, será el segundo
  }
`;

export const SearchBar = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  width: 95%;
  outline: none;
  border: none;
  border-bottom: 2px solid var(--gris);
  margin-bottom: 20px;
`;

export const VideoListContainer = styled.div`
  border: 1px solid var(--gris);
  padding: 15px;
  margin-top: 20px;
  max-height: 60vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-height: none;
    flex: 1;
  }
`;


export const FilterSection = styled.div`
  margin-bottom: 20px;
`;

export const ConfirmButtonContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-top: 20px;
  }
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: var(--celeste-rgba-65);
  color: var(--blanco);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 2px 4px var(--negro-rgba-03);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--azul);
  }
`;

export const FilterButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  color: var(--celeste-rgba-65);
  font-size: 16px;
  margin-bottom: 10px;
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;
