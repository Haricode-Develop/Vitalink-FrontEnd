import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
`;


export const ItemPreview = styled.div`
  width: 250px;
  height: 128px;
  background-color: #ddd;
  margin-right: 10px;
`;
export const ContentContainer = styled.div`
  flex-grow: 1;
`;

export const ItemTitle = styled.h4`
  margin: 0;
  font-size: 18px;
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

export const ItemSelect = styled.select`
  width: 100%;
  padding: 5px 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

export const ItemCheckbox = styled.input`
  margin-left: auto; // Alinea el checkbox a la derecha
  cursor: pointer;
`;