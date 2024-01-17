import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const PageNumber = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#333' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
  border: ${({ isActive }) => (isActive ? 'none' : '1px solid #333')};

  &:hover {
    background-color: #555;
    color: white;
  }
`;