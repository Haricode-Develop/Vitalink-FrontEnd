import styled from 'styled-components';

export const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExerciseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f3f3f3;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  &:hover {
    background-color: #e9ecef;
  }
`;

export const ExerciseName = styled.h3`
  margin: 0;
`;

export const ExerciseDescription = styled.p`
  margin: 0;
`;

export const SelectButton = styled.button`
  padding: 5px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
