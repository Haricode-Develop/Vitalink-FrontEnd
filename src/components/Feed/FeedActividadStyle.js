import styled, { keyframes } from 'styled-components';
const breakpoints = {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
};

export const ActivityFeedContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background: #f0f2f5;
  height: calc(75vh - 70px); 
  overflow-y: auto;
  @media (min-width: ${breakpoints.tablet}) {
    height: calc(100vh - 70px);
    margin-left: 30px; 
  }

`;

export const ActivityTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ActivityItem = styled.li`
  background: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: start;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

export const ActivityDescription = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

export const ActivityTime = styled.span`
  color: #999;
  font-size: 0.8rem;
`;


export const ActivityIcon = styled.span`
  margin-right: 10px; // Espacio entre el icono y el texto
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem; // Iconos más grandes

  svg {
    margin-right: 5px;
  }
`;
