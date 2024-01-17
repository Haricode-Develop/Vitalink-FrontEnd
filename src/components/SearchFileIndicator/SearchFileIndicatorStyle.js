import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const FileList = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

export const FileItem = styled.div`
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;
