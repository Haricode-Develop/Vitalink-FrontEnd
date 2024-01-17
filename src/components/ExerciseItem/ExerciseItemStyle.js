import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const ItemTitle = styled.h4`
  margin: 0;
  padding-bottom: 5px;
`;

export const ItemDescription = styled.p`
  font-size: 14px;
`;

export const ItemButton = styled.button`
  align-self: center;
  padding: 5px 15px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
