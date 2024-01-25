import styled from 'styled-components';
import logo from '../../assets/login/background.png';

export const BackgroundImage = styled.div`
  background: url(${logo}) no-repeat center center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
`;

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: var(--verde-oscuro-rgba-65);
  width: 40%;
  height: 100%;
  position: absolute;
  right: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LoginForm = styled.div`
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

export const Logo = styled.img`
  display: block;
  margin: 0 auto 20px;
  border-radius: 50%;
  width: 100px;
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

export const ForgotPasswordLink = styled.a`
  color:  var(--gris);
  text-align: center;
  display: block;
  margin: 10px 0;
  text-decoration: none;
`;

export const Button = styled.button`
  background: #072B4A;
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


export const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background-color: var(--blanco);
  border-radius: 20px;
  box-shadow: 0 5px 15px var(--negro-rgba-03);
  z-index: 1000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const AppName = styled.h1`
  font-size: 3em; // Puedes ajustar esto según tus necesidades
  font-weight: bold;
  color: var(--azul); // Este es el color que usamos para el botón, pero puedes cambiarlo
  position: absolute;
  top: 20%;
  left: 5%;
  transform: translate(-5%, -20%);
  white-space: nowrap;
`;

export const PlansTextLink = styled.div`
  color: var(--azul-oscuro);
  text-decoration: underline;
  cursor: pointer;
  margin-top: 24px;
  font-size: 0.9rem;
  text-align: center;
  &:hover {
    color: var(--azul-oscuro);
  }
`;
