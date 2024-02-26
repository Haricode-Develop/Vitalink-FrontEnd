import styled from 'styled-components';

export const BackgroundColor = styled.div`
  background: var(--gris);
  width: 100%;
  height: calc(100vh - 100px);
  position: fixed;
  top: 0;
  left: 0;
`;

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--verde-oscuro-rgba-65);
  width: 100%;
  height: calc(100vh - 100px);
  position: fixed;
  padding-bottom: 100px;
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
  margin-bottom: 100px;
  justify-content: center;
  align-items: flex-start;
`;
export const Label = styled.label`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ResetButton = styled.button`
  background: var(--verde-medio);
  color: var(--blanco);
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 20px;
  width: calc(100% - 40px);

  cursor: pointer;
  display: block;
  margin: 20px 0;

`;

export const Input = styled.input`
  display: block;
  width: 100%; 
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  background: var(--gris);
  border-radius: 5px;
  box-sizing: border-box;
`;
