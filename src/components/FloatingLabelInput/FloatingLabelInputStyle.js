import styled, { css } from 'styled-components';

export const FloatingLabelGroup = styled.div`
  position: relative;
`;

const floatLabel = css`
  top: -20px;
  font-size: 12px;
  color: #8b8b8b;
`;

export const FloatingLabel = styled.label`
  position: absolute;
  left: 0;
  top: 10px;
  padding: 0 0.25rem;
  transition: 0.3s ease all;
  background: white;
  pointer-events: none;
  ${({ isFocused }) => isFocused && floatLabel};
`;

export const FloatingInput = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  outline: none;
  padding: 12px 0.25rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  &:focus + ${FloatingLabel} {
    ${floatLabel}
  }
`;
