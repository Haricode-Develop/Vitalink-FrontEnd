import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  padding: 100px 0;
  background-color: var(--verde-claro);
  margin-bottom: -100px;
  text-align: center;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 50px 0;
    margin-bottom: -50px;
  }
`;

export const HeaderTitle = styled.h1`
  color: var(--negro);
  font-size: 2.5rem;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeaderSubtitle = styled.p`
  color: var(--negro);
  font-size: 1.25rem;
  margin-top: 0.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 20px;
  gap: 20px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    padding: 25px 10px;
  }
`;

export const PlanCard = styled.div`
  background-color: var(--blanco);
  border-radius: 20px;
  box-shadow: 0 8px 24px var(--negro-rgba-01);
  padding: 1.5rem;
  margin: 0 10px;
  width: 300px;
  text-align: center;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
z-index: 3;
  ${({ active }) =>
          active &&
          `
    transform: scale(1.1);
    z-index: 3;
    box-shadow: 0 12px 30px var(--negro-rgba-03);
  `};

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;

    ${({ active }) => active && `
      transform: scale(1);
      box-shadow: 0 8px 24px var(--negro-rgba-01);
    `};
  }
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
`;

export const FeatureItem = styled.li`
  margin-bottom: 10px;
  &:before {
    content: '✔️';
    margin-right: 10px;
    color:  var(--verde-claro);
  }
`;

export const PlanPrice = styled.div`
  color: var(--azul);
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const SubscribeButton = styled.button`
  background-color: var(--verde-medio);
  color: var(--blanco);
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--verde-oscuro);
  }
`;

export const PlanInfo = styled.p`
  color: var(--negro);
  font-size: 0.9rem;
  margin-top: 1rem;
`;


export const IndividualPlansContainer = styled.section`
  padding: 50px 20px;
  text-align: center;
  @media (max-width: 768px) {
    padding: 25px 10px;
  }
`;

export const IndividualPlanHeader = styled.h2`
  color: var(--negro);
  font-size: 2rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const IndividualPlanDescription = styled.p`
  color: var(--negro);
  font-size: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;