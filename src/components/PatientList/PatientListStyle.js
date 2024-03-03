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
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  background: var(--blanco);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--gris-claro);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--gris-claro);
  }

  &:last-child {
    border-bottom: none;
  }
`;
export const SelectButton = styled.button`
  background-color: var(--verde-medio);
  color: var(--blanco);
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--verde-oscuro);
  }
`;
export const PatientListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const PatientInfo = styled.span`
  font-size: 1em;
`;