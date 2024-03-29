// PopupStyles.js
import styled, { keyframes } from 'styled-components';
import { FaChevronDown, FaAngleDown } from 'react-icons/fa';

const popIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  font-size: 1.5em;
  color: #555;

  &:hover {
    color: #000;
  }
`;

export const PopupWindow = styled.div`
  position: fixed;
  bottom: 30px;
  right: 100px;
  width: 55%;
  max-width: 55%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1050;
  opacity: 0;
  padding: 45px 10px;
  transform: scale(0);
  animation: ${popIn} 0.5s ease forwards;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  height: auto;
  transition: max-width 0.3s, padding 0.3s;
  ${({ contactFormVisible }) => contactFormVisible && `
    max-width: 100%;
    padding: 30px;
    width: auto;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    border-radius: 0;
  `};
  @media (min-width: 700px) {
    bottom: 30px;
    padding: 35px;
    right: 100px;
    max-width: 500px;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 100px;
`;
export const Button = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #072B4A;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #08365d;
  }
`;



const fadeInOut = keyframes`
  0% { bottom: 50px; opacity: 0; }
  10% { bottom: 70px; opacity: 1; }
  90% { bottom: 70px; opacity: 1; }
  100% { bottom: 90px; opacity: 0; }
`;


export const MessagePopup = styled.div`
  position: fixed;
  bottom: 100px!important;
  right: 10px;
  width: auto;
  max-width: 300px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1050;
  opacity: 0;
  animation: ${fadeInOut} 4s ease-in-out forwards;

  &:after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: 20px;
    border-width: 10px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
    filter: drop-shadow(0 -2px 6px rgba(0,0,0,0.2));
  }

  @media (min-width: 600px) {
    right: 40px;
    &:after {
      right: 10px;
    }
  }
`;


export const MenuItem = styled.div`
  background-color: #f9f9f9;
  padding: 10px 15px;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #e9e9e9;
  }
  ${({ hideOnMobile }) => hideOnMobile && `
    @media (max-width: 768px) {
      display: none;
    }
  `}
  
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  background-color: transparent;
`;


export const IconContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  z-index: 1000;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  
`;

export const StyledDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;


export const StyledDropdown = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 5px var(--negro-rgba);
  background: var(--celeste);
  color: var(--blanco);
  font-weight: 700;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;


export const StyledIcon = styled(FaAngleDown)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--negro);
  font-size: 1.25rem;

  @media (max-width: 768px) {
    right: 0.5rem;
  }
`;

export const DropdownLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;


export const FloatingButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 0.5rem 1rem;
  background-color: var(--celeste);
  color: var(--blanco);
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px var(--negro-rgba);
  transition: box-shadow 0.3s, transform 0.3s;
  z-index: 10000;
  &:hover {
    background-color: var(--celeste-rgba);
    box-shadow: 0 4px 10px var(--negro-rgba);
  }

  @media (max-width: 768px) {
    bottom: 150px;
    top: auto;
    right: 12vw;
    transform: translateX(50%);
  }
`;


export const StyledOption = styled.option`
  color: var(--blanco)!important;
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem;
  }
`;



