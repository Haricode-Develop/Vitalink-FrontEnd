// src/components/ServiciosPorUsuario/ServiciosPorUsuarioStyle.js

import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  background-color: var(--blanco);
  color: var(--negro);
`;

export const Button = styled.button`
  padding: 10px;
  background-color: var(--celeste);
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: var(--celeste-rgba-65);
  }
`;

export const ServiceAssignmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ServiceAssignmentTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const ServiceAssignmentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;

export const ServiceAssignmentItem = styled.li`
  padding: 10px;
  border: 1px solid var(--gris);
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'var(--celeste)' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  &:hover {
    background-color: ${({ selected }) => (selected ? 'var(--celeste)' : 'var(--gris)')};
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FilterInput = styled.input`
  padding: 10px;
  border: 1px solid var(--gris);
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const FilterButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FilterButton = styled.button`
  padding: 10px;
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? 'var(--celeste)' : 'var(--gris)')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  &:not(:last-child) {
    margin-right: 5px;
  }
  &:hover {
    background-color: ${({ active }) => (active ? 'var(--celeste)' : 'var(--gris)')};
  }
`;
