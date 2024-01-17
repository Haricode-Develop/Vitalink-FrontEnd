import styled from 'styled-components';

export const Accordion = styled.div`
  background: #f7f7f7;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const AccordionHeader = styled.div`
  padding: 15px;
  cursor: pointer;
  background: #e7e7e7;
  border-top: 1px solid #ddd;
  &:first-of-type {
    border-top: none;
  }
  &:hover {
    background: #d7d7d7;
  }
`;

export const AccordionBody = styled.div`
  padding: 15px;
  border-top: 1px solid #ddd;
  background: #fff;
`;
