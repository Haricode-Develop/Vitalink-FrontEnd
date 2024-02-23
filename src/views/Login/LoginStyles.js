import styled from 'styled-components';
import logo from '../../assets/login/background.jpg';
import circleGraphic from '../../assets/login/Vita_Login.png'

export const BackgroundImage = styled.div`
  background: url(${logo}) no-repeat center center;
  background-size: cover;
  background-position: left center;
  width: 100%;
  min-height: 100vh;
`;

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--celeste-rgba);
  width: 40%;
  height: 100%;
  position: absolute;
  right: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Estilos actualizados para CharacterCircle para posicionarlo correctamente
export const CharacterCircleContainer = styled.div`
  overflow: hidden;
  width: 800px; // El ancho total del CharacterCircle
  height: 450px; // La mitad de la altura para mostrar solo la parte superior
  position: absolute;
  bottom: 0;
  right: 70%;
  transform: translateX(50%);
  z-index: 10;
  @media (max-width: 1200px) {
    width: 600px;
    height: 300px;
  }
  @media (max-width: 992px) {
    width: 500px;
    height: 250px;
  }
  @media (max-width: 768px) {
    width: 400px;
    height: 200px;
    right: 50%;
    transform: translateX(55%);
  }
  @media (max-width: 576px) {
    width: 300px;
    height: 150px;
  }
`;


// Componente para el círculo gráfico
export const CharacterCircle = styled.div`
  background: #fff;
  border-radius: 50%;
  width: 800px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &::before {
    content: '';
    background: url(${circleGraphic}) no-repeat center center;
    background-size: contain;
    width: 80%;
    height: 80%;
    display: block;
  }
  @media (max-width: 1200px) {
    width: 575px;
    height: 575px;
  }
  @media (max-width: 992px) {
    width: 475px;
    height: 475px;
  }
  @media (max-width: 768px) {
    width: 375px;
    height: 375px;
  }
  @media (max-width: 576px) {
    width: 275px;
    height: 275px;
  }
`;





export const LoginForm = styled.div`
  background: #fff;
  width: 300px;
  height: 400px;
  padding: 70px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

export const Logo = styled.img`
  display: block;
  margin: 0 auto 20px;
  width: 60%;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 2px 0;
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
  background: var(--azul);
  color: var(--blanco);
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 20px;
  width: 80%;
  cursor: pointer;
  display: block;
  margin: 3px 0;
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
  font-size: 3em;
  font-weight: bold;
  color: #0000ff; // Un color azul para el nombre de la app
  position: absolute;
  top: 20%;
  left: 5%;
  transform: translate(-5%, -20%);
  white-space: nowrap;
  z-index: 2; // Para asegurarse de que esté encima del círculo
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
