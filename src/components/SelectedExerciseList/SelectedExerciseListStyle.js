import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e1e1e1;
  &:last-child {
    border-bottom: none;
  }
`;

export const Name = styled.span`
  font-size: 16px;
`;

export const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ff7875;
  }
`;
