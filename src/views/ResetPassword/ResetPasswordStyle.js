import styled from 'styled-components';

export const BackgroundColor = styled.div`
  background: #FAFAFA;
  width: 100%;
  height: 100vh;
  position: fixed; // Cambiado de 'absolute' a 'fixed' para que ocupe toda la pantalla
  top: 0;
  left: 0;
  z-index: -1;  // Para asegurarse de que el fondo esté detrás de todo
`;

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 191, 165, 0.65);
  width: 100%;
  height: 100vh;  // Asegurarse de que el overlay también ocupe toda la pantalla
  position: fixed; // Cambiado de 'absolute' a 'fixed' para que ocupe toda la pantalla
  top: 0;
  left: 0;
`;



export const ResetPasswordForm = styled.div`
  background: white;
  width: 300px;
  height: 400px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ResetButton = styled.button`
  background: #00bfa5;
  color: white;
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
  background: #ececec;
  border-radius: 5px;
`;
