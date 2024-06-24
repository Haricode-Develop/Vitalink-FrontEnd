import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 88%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 4px;
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Search = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  font-size: 1rem;
  margin-left: 10px;
  flex: 1;
`;

export const AddServiceButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.3s;
  width: 45px;
  height: 45px;
  position: fixed;
  right: 20px;
  top: 100px;
  z-index: 100;

  &:hover {
    background: #218838;
  }

  svg {
    margin: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InputIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  height: 100px;
  resize: none;
`;

export const Select = styled.select`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 10%;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 1rem;
  color: #555;
  gap: 5px;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%; // Ensure button width matches the modal

  &:hover {
    background: #0056b3;
  }
`;

export const Footer = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Section = styled.div`
  margin-bottom: 15px;
`;

export const Error = styled.p`
  color: red;
  margin-bottom: 15px;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #888;
`;

export const ServiceSelection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  flex: 1 1 auto;
`;

export const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  span {
    flex: 1;
    color: #333;
  }
`;

export const ServiceQuantityInput = styled.input`
  width: 80px;
`;

export const ServiceSearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 10px;
`;

export const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EditPackageButton = styled.button`
  padding: 5px 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #17a2b8;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  width: 45px;
  height: 45px;
  margin-top: 10px; // Espacio entre el botón de añadir y el de filtrar
  position: fixed;
  right: 20px;
  top: 150px;
  z-index: 100;
  &:hover {
    background: #138496;
  }
`;

export const FilterMenuContainer = styled.div`
  position: fixed;
  top: calc(150px + 45px + 5px); /* Espacio debajo del botón de filtrar */
  right: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
  z-index: 1000;

  @media (max-width: 768px) {
    top: calc(100% + 5px); /* Para asegurar que se muestre debajo del botón en pantallas pequeñas */
  }
`;

export const FilterMenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px; // Espacio entre el ícono y el texto

  &:hover {
    background: #f1f1f1;
  }

  ${({ active }) => active && `
    background: #007bff;
    color: white;
    border-radius: 4px;

    svg {
      color: white;
    }
  `}
`;

export const TabBar = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
  background-color: var(--blanco);
  border-bottom: 1px solid var(--negro);
`;

export const Tab = styled.button`
  padding: 15px 30px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: color 0.3s ease;
  color: var(--negro);
  font-size: 1.2rem;
  border-radius: 5px 5px 0 0;
  display: inline-block;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 1rem;
  }

  ${(props) =>
      props.active &&
      css`
        font-weight: bold;
        color: var(--blanco);
        background-color: var(--celeste);
      `}
`;

export const TabContent = styled.div`
  padding: 20px;
  background-color: var(--blanco);
  color: var(--negro);
`;

