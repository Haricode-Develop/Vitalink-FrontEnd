// ModalStyle.js
import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 1040;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWrapper = styled.div`
  z-index: 1050;
  background: white;
  padding: 20px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  max-width: 100vw;
  height: auto;
  max-height: 90vh;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-out;
  transform: translateY(0);
  opacity: 1;
  resize: both;
  overflow: auto;
  @media (max-width: 768px) {
    width: 80vw;
    max-width: 80vw;
    height: 90vh;
    max-height: 90vh;
  }
  @media (max-height: 700px) {
    max-height: 85vh;
  }
`;

export const PdfContainer = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  max-height: calc(100% - 60px);
  overflow-y: auto;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    max-height: 80vh;
  }
  .react-pdf__Page {
    width: auto !important;
    height: auto !important;
    display: block !important;
  }
  .react-pdf__Page canvas {
    width: 100% !important;
  }

`;

export const ControlButton = styled.button`
  cursor: pointer;
  background: var(--verde-medio);
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 0 5px;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--verde-oscuro);
  }

  &:disabled {
    background: var(--verde-claro);
    cursor: not-allowed;
  }

  i {
    margin-right: 5px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  padding-bottom: 20px;
  border: none;
  font-size: 25px;
  color:var(--rojo); // O el color que prefieras
z-index: 10000;
  &:hover {
    cursor: pointer;
    color: var(--rojo); // O el color que prefieras para el hover
  }
`;
