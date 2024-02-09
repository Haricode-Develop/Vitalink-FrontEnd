import styled from 'styled-components';


export const SelectedItemContainer = styled.div`
  display: flex;
  flex-direction: column; // Los elementos se apilarán verticalmente
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const ItemTitle = styled.h4`
  margin: 0;
  font-size: 18px;
`;
export const ItemDescription = styled.p`
  font-size: 14px;
`;