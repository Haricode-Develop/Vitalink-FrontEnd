import { motion } from 'framer-motion';
// Estilos para el contenedor de búsqueda y resultados
import styled from "styled-components";

// Estilos para el contenedor de búsqueda y resultados
export const SearchWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 100px);
  padding: 30px; // Añadido padding para mejor espaciado
  margin: 0 auto; // Ajustado para auto para centralizar
  background-color: #f5f5f5; // Color de fondo suave
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra para dar profundidad
  border-radius: 20px; // Bordes redondeados para una apariencia suave
`;

export const GreetingText = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 24px; // Espaciado antes del campo de búsqueda
  text-align: center; // Centrar texto
`;
export const Input = styled.input`
  width: calc(100% - 40px); // Considerando el padding
  padding: 15px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: box-shadow 0.2s; // Transición suave para el foco

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #00BFA5;
  }
`;

export const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #00BFA5;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s; // Transición suave para el hover

  &:hover {
    background-color: #008c7a;
  }
`;

export const ResultsContainer = styled(motion.div)`
  width: 100%;
  margin-top: 20px;
`;

export const ResultCard = styled(motion.div)`
  background-color: white;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.2s; // Transición suave para la animación

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

// Animaciones para framer-motion
export const listVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

export const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};
