import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  padding: 100px 0;
  background-color: #7D4CDB;
  margin-bottom: -100px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const HeaderTitle = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0;
`;

export const HeaderSubtitle = styled.p`
  color: #ffffff;
  font-size: 1.25rem;
  margin-top: 0.5rem;
`;

export const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 20px;
  gap: 20px;
  flex-wrap: wrap;
`;

export const PlanCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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
    box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  `}
  
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
    color: #7D4CDB; // Color a juego con el encabezado.
  }
`;

export const PlanPrice = styled.div`
  color: #E63946;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const SubscribeButton = styled.button`
  background-color: #2A9D8F;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2C7A7B;
  }
`;

export const PlanInfo = styled.p`
  color: #2A2A2A;
  font-size: 0.9rem;
  margin-top: 1rem;
`;


export const IndividualPlansContainer = styled.section`
  padding: 50px 20px;
  text-align: center;
`;

export const IndividualPlanHeader = styled.h2`
  color: #2A2A2A;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const IndividualPlanDescription = styled.p`
  color: #4A4A4A;
  font-size: 1rem;
  margin-bottom: 2rem;
`;