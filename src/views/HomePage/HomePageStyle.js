import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHeartbeat, FaSyringe, FaStethoscope } from 'react-icons/fa';

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Nueva animación de fondo con iconos médicos dispersos
const moveIcons = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem;
  animation: ${fadeIn} 1s ease-in;
  height: 80vh;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const HeroContent = styled.div`
  width: 100%;
  animation: ${slideIn} 1s ease-in;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--negro);
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    margin-bottom: 2rem;
    color: var(--negro);
  }

  @media (min-width: 768px) {
    width: 60%;
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: var(--negro);
      font-weight: 700;
    }

  }
`;

export const HeroImage = styled.div`
  width: 100%;
  background-color: var(--blanco);

  video {
    width: 100%;
    height: auto;
  }

  @media (min-width: 768px) {
    width: 40%;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const Features = styled.section`
  padding: 4rem 2rem;
  z-index: 0;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    color: var(--negro);
    animation: ${fadeIn} 1s ease-in;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const FeatureItem = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  padding: 2rem;
  background-color: var(--blanco);
  border-radius: 8px;
  color: var(--negro);
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.9rem;
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--celeste);
  }
`;

export const Testimonials = styled.section`
  padding: 4rem 2rem;
  background-color: var(--celeste);
  color: var(--blanco);

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    animation: ${fadeIn} 1s ease-in;
  }
`;

export const TestimonialList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


export const TestimonialItem = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  padding: 2rem;
  background-color: var(--blanco);
  color: var(--negro);
  border-radius: 8px;
  text-align: center;
  animation: ${slideIn} 1s ease-in;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; // Asegura que ocupa toda la altura

  p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    margin-left: 0px;
    width: 75%!important;
  }
`;

export const CTAButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: var(--celeste);
  color: var(--blanco);
  text-decoration: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: var(--celeste-rgba);
    transform: translateY(-2px);
  }
`;

// Estilos del nuevo Banner
export const Banner = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, #0372FF, #00ccff, #00ccff00);
  height: 300px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;

  h1 {
    font-size: 2.5rem;
    z-index: 2;
  }
`;

export const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  animation: ${moveIcons} 30s linear infinite;

  & > svg {
    position: absolute;
    width: 50px;
    height: 50px;
    opacity: 0.2;
  }

  & > svg:nth-child(1) {
    top: 10%;
    left: 20%;
  }

  & > svg:nth-child(2) {
    top: 30%;
    left: 40%;
  }

  & > svg:nth-child(3) {
    top: 50%;
    left: 60%;
  }

  & > svg:nth-child(4) {
    top: 70%;
    left: 80%;
  }

  & > svg:nth-child(5) {
    top: 90%;
    left: 20%;
  }

  & > svg:nth-child(6) {
    top: 50%;
    left: 30%;
  }

  & > svg:nth-child(7) {
    top: 10%;
    left: 80%;
  }

  & > svg:nth-child(8) {
    top: 80%;
    left: 40%;
  }

  ${({ inView }) => inView && `
    animation-play-state: running;
  `}
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: var(--negro);
  background-color: var(--blanco);
  position: fixed; /* Cambiado a fixed */
  top: 0; /* Asegurar que se pega en la parte superior */
  width: 100%; /* Asegurar que ocupa todo el ancho */
  z-index: 1000; /* Asegurar que está por encima de otros contenidos */

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Logo = styled.div`
  img {
    height: 40px;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: var(--blanco);
    border-top: 1px solid #ddd;
    z-index: 1000;
  }
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
  }
`;

export const MenuItem = styled.li`
  @media (max-width: 768px) {
    text-align: center;
    padding: 0.5rem 0;
  }
`;

export const MenuLink = styled(Link)`
  color: var(--negro);
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  display: block;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;

  &:hover {
    background: #efefef;
    border-radius: 10px;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  justify-content: center;

  .login-button,
  .register-button {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.3s;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      margin-left: 0;
      margin-top: 0.5rem;
      width: 100%;
    }
  }

  .login-button {
    background-color: var(--limon);
    color: var(--negro);

    &:hover {
      background-color: var(--limon);
    }
  }

  .register-button {
    background-color: var(--rojo);
    color: var(--blanco);

    &:hover {
      background-color: var(--rojo-oscuro);
    }
  }
`;


export const IconBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--celeste);
  padding: 1rem 0;
  color: var(--blanco);
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 20px 20px 0 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 33.33%;
  }

  span {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    position: static;
    padding: 0.5rem 0;
    div {
      width: auto;
    }
    span {
      font-size: 0.8rem;
    }
    svg {
      width: 1.5em;
      height: 1.5em;
    }
  }
`;