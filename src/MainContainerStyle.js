import styled from 'styled-components';
import Footer from './components/Footer/Footer';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex-grow: 1;
`;

export const StyledFooter = styled(Footer)`
  flex-shrink: 0;
  
`;
