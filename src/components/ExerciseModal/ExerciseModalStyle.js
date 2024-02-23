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
  min-height: 60vh;
  height: 60vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    min-height: 50vh;
    height: 50vh;
  }
`;


export const FilterSection = styled.div`
  position: relative;
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
  display: flex;
  align-items: center;
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

export const FilterDropdown = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  padding: 10px;
  position: absolute;
  width: 100%;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  top: 100%;
  left: 0;
  right: 0;
`;
export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 12px;
  
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const FilterCheckbox = styled.input`
  cursor: pointer;
  margin-right: 10px;
`;


export const StyledFilterDropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  min-width: 150px;
  width: auto;
  max-width: 300px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  top: calc(100% + 5px);
  left: 0;
  padding: 0;
`;

export const FilterButtonContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 15px;
`;
