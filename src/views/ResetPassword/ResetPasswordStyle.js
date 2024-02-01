import styled from 'styled-components';

export const BackgroundColor = styled.div`
  background: var(--gris);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--verde-oscuro-rgba-65);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;



export const ResetPasswordForm = styled.div`
  background: var(--blanco);
  width: 300px;
  height: 400px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px var(--negro-rgba-01);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ResetButton = styled.button`
  background: var(--verde-medio);
  color: var(--blanco);
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 20px;
  width: 80%;
  cursor: pointer;
  display: block;
  margin: 10px auto;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  background: var(--gris);
  border-radius: 5px;
`;
