import styled from 'styled-components';

export const Notification = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  background-color: ${({ leido }) => (leido ? '#f9f9f9' : '#fff')};
  cursor: pointer; // Asegurar que el cursor sea un puntero para indicar que es clicable
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Details = styled.div`
  flex: 1;
  margin-left: 10px;
`;

export const Message = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

export const Time = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 0.8rem;
  color: #888;
`;

export const MarkAsReadCheckbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;
