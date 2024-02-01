import styled, { keyframes } from 'styled-components';
const breakpoints = {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
};


export const Container = styled.div`
  display: flex;
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    padding: 20px 20px 20px 8px;

  }
  @media (max-width: ${breakpoints.mobile}){
    padding: 0;

  }
`;

export const Title = styled.h1`
  color: #333;
  font-size: 40px;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: none;
  background-color: var(--gris);
  @media (max-width: ${breakpoints.tablet}) {
    padding-right: 0px;
    padding-left: 0px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 95%;
    margin-left: 0px;

  }
`;

export const DateInput = styled(Input).attrs({ type: 'date' })``;

export const EmailInput = styled(Input).attrs({ type: 'email' })``;

export const Select = styled.select`
  width: calc(100% + 30px);
  padding: 15px;
  margin-bottom: 20px;
  border: none;
  background-color: var(--gris);
  @media (max-width: ${breakpoints.tablet}) {
    padding-right: 0px;
    padding-left: 0px;
    width: 100%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 95%;
    margin-left: 0px;

  }
`;

export const PictureColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 15px;
  @media (max-width: ${breakpoints.tablet}) {
    padding-right: 0px;
    padding-left: 0px;
  }
`;

export const FormColumn = styled.div`
  width: 50%;
  padding: 20px;
  display: flex; 
  flex-direction: column;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;

  }
`;

export const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  background-color: var(--gris);
  border: 1px solid var(--gris-oscuro);
`;

export const UploadButton = styled.button`
  background-color: var(--azul);
  color: var(--blanco);
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;

`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0px;

  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 95%;
    margin-left: 0px;

  }
`;
export const DownloadLink = styled.a`
  text-align: center;
  padding: 10px 15px;
  background-color: var(--azul);
  color: var(--blanco);
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 30px;

  @media (max-width: ${breakpoints.tablet}) {
    padding-right: 0px;
    padding-left: 0px;
    margin-left: 0px;

  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 95%;
    margin-left: 0px;

  }

  &:hover {
    background-color: var(--azul);
  }
`;
export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--negro);
  color: var(--blanco);
  border: none;
  &:hover {
    background-color: var(--gris-oscuro);
  }
  &:disabled {
    background-color: var(--gris);
    cursor: not-allowed;
  }
`;
export const Label = styled.label`
  font-size: 16px;
  color: var(--negro);
  margin-bottom: 5px;
  display: block;
`;
export const DatePickerWrapper = styled.div`
  margin-bottom: 20px;
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    width: 100%;
  }
  input {
    width: 100%;
    padding: 15px;
    border: none;
    background-color: var(--gris);
    @media (max-width: ${breakpoints.tablet}) {
      padding-right: 0px;
      padding-left: 0px;
    }
    @media (max-width: ${breakpoints.tablet}) {
      width: 95%;
      margin-left: 0px;

    }
  }
`;
export const CustomFileUpload = styled.label`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: var(--azul);
  color: var(--blanco);
  border: none;
  margin-right: 10px;
  &:hover {
    background-color: var(--azul);
  }
`;
const fade = keyframes `
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;
export const IndicadorGuardado = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--verde-indicador);
  color: var(--blanco);
  padding: 10px;
  border-radius: 5px;
  display: ${props => props.mostrar ? 'block' : 'none'};
  animation: ${fade} 2s linear;
`;
