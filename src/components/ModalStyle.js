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
  width: ${props => props.width || '500px'};
  max-width: ${props => props.maxWidth || '500px'};
  height: ${props => props.height || 'auto'};;
  margin: 0 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-out;
  transform: translateY(0); 
  opacity: 1; 
`;
