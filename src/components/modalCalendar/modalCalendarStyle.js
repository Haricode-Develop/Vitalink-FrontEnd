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
  top: 35%;
  left: 35%;
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
  z-index: 10000;
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
  background: #007bff;
  color: white;
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