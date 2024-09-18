import styled, { css } from 'styled-components';

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
            z-index: 1;
          `}
`;
export const ConfigurationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ConfigurationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

export const ConfigurationLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  color: #333;
`;

export const ConfigurationInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ConfigurationInputCheckbox = styled.input`
  margin-left: 10px;
`;

export const ConfigurationTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px;
`;

export const ModalContent = styled.div`
  text-align: center;
`;

export const TooltipButton = styled.button`
  background-color: var(--celeste);
  color: var(--blanco);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: var(--gris-oscuro);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
`;