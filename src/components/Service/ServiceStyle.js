import styled from 'styled-components';

export const CardContainer = styled.div`
  background: var(--blanco);
  border-radius: 8px;
  box-shadow: 0 4px 8px var(--negro-rgba-01);
  overflow: hidden;
  width: calc(33.33% - 10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    box-shadow: 0 8px 16px var(--negro-rgba-03);
  }
`;

export const CardContent = styled.div`
  padding: 15px;
  cursor: pointer;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  color: var(--negro);
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: var(--blanco);
  margin: 10px 0;
`;

export const CardPrice = styled.div`
  font-size: 1.25rem;
  color: var(--celeste);
  font-weight: bold;
`;

export const CardIcons = styled.div`
  margin-top: 10px;

  svg {
    margin-right: 10px;
    color: var(--gris-oscuro);
  }
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: var(--gris);
  border-top: 1px solid var(--gris-oscuro);

  svg {
    cursor: pointer;
    color: var(--rojo);

    &:hover {
      color: var(--rojo-oscuro);
    }
  }
`;
