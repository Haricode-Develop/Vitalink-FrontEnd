import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
`;

export const Name = styled.h3`
  margin: 0;
  color: #333;
  font-size: 20px;
`;

export const Email = styled.p`
  margin: 5px 0 20px;
  color: #666;
`;

export const SelectButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
