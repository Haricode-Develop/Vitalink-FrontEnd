import styled from 'styled-components';

// Definimos los componentes estilizados aquí.


export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 85vh;
  @media (min-width: 768px) {
    flex: 0 0 60%;
  }
`;
export const SearchAndFilterContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
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
  flex-grow: 1;
  overflow-y: auto;
  height: calc(100% - 120px);
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;


export const FilterSection = styled.div`
  position: relative;
  
  margin-bottom: 20px;
`;

export const ConfirmButtonContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  @media (max-width: 768px) {
    position: fixed; // Cambiar a fixed para dispositivos móviles
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 0;
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
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

export const MainFilterButton = styled.button`
  background: var(--celeste-rgba-65);
  color: var(--blanco);
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const FilterMenuButton = styled.button`
  display: none; // El botón está oculto por defecto

  @media (max-width: 768px) {
    display: block; // Solo se muestra en pantallas menores a 768px
    background-color: var(--celeste-rgba-65);
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    text-align: left;
    font-size: 16px;
    &:after {
      content: '▼';
      float: right;
    }
    &:active, &:focus {
      outline: none;
    }
  }
`;
export const MobileFilterContainer = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    z-index: 20;
    overflow-y: auto;
    max-height: 100vh;
    
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }
`;