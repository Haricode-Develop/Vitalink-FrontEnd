// ConfiguracionStyle.js

import styled, { css } from 'styled-components';

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
            z-index: 1;
          `}
`;

export const ActiveIndicator = styled.div`
  height: 100%;
  width: 0;
  position: absolute;
  bottom: -2px;
  left: 0;
  background-color: var(--celeste);
  border-radius: 5px 5px 0 0;
  transition: left 0.3s ease, width 0.3s ease;
  z-index: 0;
`;

export const TabContent = styled.div`
  padding: 20px;
  background-color: var(--blanco);
  color: var(--negro);
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

export const ModalContent = styled.div`
    text-align: center;
`;

