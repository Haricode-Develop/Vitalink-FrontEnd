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
  height: 140px;
  background-color: #ddd;
  margin-right: 10px;
  cursor: pointer;
  overflow: hidden; 
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-left: auto; 
  cursor: pointer;
`;
export const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 10000,
    },
    content: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-25%%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        zIndex: 10001,
    }
};

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;
