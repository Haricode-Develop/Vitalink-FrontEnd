import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  padding: 20px;
  margin: 10px 0;
  border: 1px solid var(--gris);
  border-radius: 8px;
  background-color: var(--blanco);
  box-shadow: 0 2px 5px var(--negro-rgba-01);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px var(--negro-rgba-01);
  }
`;

export const Name = styled.h3`
  margin: 0;
  color: var(--negro);
  font-size: 20px;
`;

export const Email = styled.p`
  margin: 5px 0 20px;
  color: var(--negro);
`;

export const SelectButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--celeste);
  color: white;
  cursor: pointer;

`;
