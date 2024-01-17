import styled, { keyframes } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0); // Se cambia la opacidad a 0 para total transparencia
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const TutorialContainer = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  z-index: 10000;
  pointer-events: none;
`;

const fadeInScale = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const TutorialStep = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeInScale} 0.3s ease forwards;
  pointer-events: all;
  max-width: 300px;
  @media (max-width: 600px) {
    max-width: 90%;
    left: 50%;
    transform: translateX(-50%); // Ajusta la transformación para centrar
    bottom: ${({ isMobile }) => isMobile ? '10%' : 'initial'};
  }
`;

export const StepContent = styled.div`
  color: #333;
`;

export const NextButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;


export const ExitButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;