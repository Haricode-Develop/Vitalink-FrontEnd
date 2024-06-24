import styled from 'styled-components';

export const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const CardContent = styled.div`
  padding: 15px;
  cursor: pointer;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  color: #333;
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 10px 0;
`;

export const CardPrice = styled.div`
  font-size: 1.25rem;
  color: #007bff;
  font-weight: bold;
`;

export const CardIcons = styled.div`
  margin-top: 10px;

  svg {
    margin-right: 10px;
    color: #888;
  }
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;

  svg {
    cursor: pointer;
    color: #d9534f;

    &:hover {
      color: #c9302c;
    }
  }
`;
