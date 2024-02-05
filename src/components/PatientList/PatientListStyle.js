import styled from 'styled-components';
export const ListButton = styled.button`
  background-color: ${({ active }) => active ? 'var(--verde-medio)' : 'var(--blanco)'};
  color: ${({ active }) => active ? 'var(--blanco)' : 'var(--verde-oscuro)'};
  border: 2px solid var(--verde-medio);
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: var(--verde-oscuro);
    color: var(--blanco);
  }
`;

export const CardButton = styled(ListButton)`
  // Estilos para el botón que muestra la vista de tarjetas, heredando de ListButton
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid var(--gris-oscuro);
  &:last-child {
    border-bottom: none;
  }
`;