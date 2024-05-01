import styled, { css, keyframes } from 'styled-components';
import Modal from 'react-modal';
const mobileScreen = '768px';
const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;


const slideDownAnimation = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const CustomModal = styled(Modal)`
  position: fixed;
  top: 25%;
  left: 30%;
  right: auto;
  bottom: auto;
  transform: translateY(-50%) translateX(-50%);
  transition: transform 0.3s ease-out;
  background: #FFF;
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1030;
  width: 50vw;
  max-width: 500px;

  ${props => props.isOpen && css`
    animation: ${slideDownAnimation} 0.3s ease-out forwards;
  `}
  @media (max-width: ${mobileScreen}) {
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    width: 95%;
    height: 100%;
    overflow-y: scroll;
    max-height: 50%;
    border-radius: 10px;
    transform: none;

    // La animación para móviles permanece igual
    ${props => props.isOpen && css`
      animation: ${slideUpAnimation} 0.3s ease-out forwards;
    `}
  }
`;


export const EventList = styled.ul`
  list-style: none;
  padding: 0;

  @media (max-width: ${mobileScreen}) {
    padding: 0;
  }
`;

export const EventListItem = styled.li`
  background: #f9f9f9;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${mobileScreen}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
`;


export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background: var(--limon);
  color: var(--negro);
  font-weight: 700;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;

  position: absolute;
  top: 20px;
  right: 20px;

  @media (max-width: ${mobileScreen}) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

export const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;  
`;
export const StyledLabel = styled.label`
  margin-right: 10px;
  margin-bottom: 0.5rem;
  min-width: 50px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;


export const StyledSelect = styled.select`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;

`;
export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 254px; // Valor predeterminado para no móviles
  left: 59px;
  width: 208px;
  max-height: 100px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1040;

  @media (max-width: 768px) {
    top: 264px;
  }
`;

export const StyledListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;