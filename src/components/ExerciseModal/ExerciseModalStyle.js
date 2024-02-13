import styled from 'styled-components';

// Definimos los componentes estilizados aquí.


export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    order: 1; // Cambia esto para que LeftSection esté arriba en dispositivos móviles
  }

  @media (min-width: 768px) {
    flex: 0 0 60%;
    order: 1; // En pantallas más grandes, será el primero
  }
`;

export const RightSection = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    order: 2; // Cambia esto para que RightSection esté abajo en dispositivos móviles
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
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

export const VideoListContainer = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

export const FilterSection = styled.div`
  margin-bottom: 20px;
`;

export const ConfirmButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    position: static;
    transform: none;
  }
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  margin: 20px auto;
  display: block;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const FilterButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  color: #007bff;
  font-size: 16px;
  margin-bottom: 10px;
`;
