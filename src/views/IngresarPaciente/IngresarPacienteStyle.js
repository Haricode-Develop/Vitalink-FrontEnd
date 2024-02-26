// IngresarPacienteStyle.js
import styled, { css, keyframes  } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-left: 0!important;
`;

export const Title = styled.h1`
  color: var(--negro);
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;


export const Tabs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-bottom: 20px;
  padding-bottom: 2px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  box-sizing: border-box;
  display: ${({ isMobile }) => (isMobile ? 'none' : 'flex')};
  @media (max-width: 768px) {
    display: ${({ isDropdownVisible }) => isDropdownVisible ? 'none' : 'flex'};
  }

  @media (min-width: 769px) {
    justify-content: center;
  }
`;

export const Tab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background: none;
  white-space: nowrap;
  display: ${({ isMobile }) => (isMobile ? 'none' : 'inline-block')};
  ${({ active }) =>
          active &&
          css`
            font-weight: bold;
            color: var(--azul);
          `}
  &:focus {
    outline: none;
  }
  &:hover {
    color: var(--azul);
  }

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 0.8em;
    min-width: 0;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.7em;
  }
`;

export const TabPanel = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
  width: 100%;
  opacity: ${({ active }) => (active ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
`;


export const FormWrapper = styled.section`
  width: 100%;
  transition: transform 0.3s ease-in-out; 
`;


export const Indicator = styled.div`
  height: 2px;
  background-color: var(--azul);
  position: absolute;
  bottom: 0;
  transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
  @media (min-width: 769px) {
    left: 50%;
    transform: translateX(-50%);
  }

`;



export const MobileMenuButton = styled.button`
  background-color: var(--azul);
  color: var(--blanco);
  padding: 0.5rem;
  border: none;
  border-radius: 0.3rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const DesktopTabsContainer = styled.div`
  display: ${({ isMobileMenuOpen }) => isMobileMenuOpen ? 'none' : 'block'};
`;
export const MobileDropdown = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 120px;
  background-color: var(--blanco);
  z-index: 5;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-out forwards;

  & > div {
    margin: 0.2rem 0;
    padding: 0.8rem;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 0.3rem;
    background-color: var(--azul);
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background-color: var(--azul);
      color: var(--blanco);
    }
  }
`;


export const MobileDropdownItem = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid var(--gris-claro); /* Asegúrate de tener esta variable de color definida */
  background-color: ${({ active }) => (active ? 'var(--azul)' : 'transparent')};
  color: ${({ active }) => (active ? 'var(--blanco)' : 'var(--gris-oscuro)')}; /* Cambiar a un gris oscuro para visibilidad */
  transition: color 0.5s ease, background-color 0.5s ease; /* Suavizar las transiciones */
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: var(--azul-claro); /* Asegúrate de que este color contraste bien con el blanco */
    color: var(--blanco);
  }
  ${({ active }) =>
          active &&
          css`
            background-color: var(--azul);
            color: var(--blanco);
            font-weight: bold;
          `}
`;
