import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Accordion = styled.div`
  border-bottom: 1px solid var(--gris-oscuro);
  margin-bottom: 0.5rem;
`;

export const AccordionHeader = styled.div`
  padding: 15px;
  background-color: var(--verde-medio);
  color: var(--blanco);
  cursor: pointer;
  &:hover {
    background-color: var(--verde-oscuro);
  }
`;

export const AccordionContent = styled(motion.div)`
  padding: 15px;
  background-color: var(--verde-claro);
  color: var(--azul);
`;

export const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  background-color: var(--gris);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px var(--negro-rgba-03);
`;

export const ExerciseCheckbox = styled.input`
  margin-right: 10px;
`;