import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #ffffff;
  border-top: 1px solid #E8E8E8;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60px;
`;

export const SocialMediaIcons = styled.div`
  font-size: 24px;
  margin-bottom: 10px; // Asegura espacio entre los íconos y el texto de los derechos
  & > a {
    margin: 0 10px;
    color: #707070;
    transition: color 0.3s;
    &:hover {
      color: #2A9D8F;
    }
  }
`;

export const FooterRights = styled.div`
  text-align: center;
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #707070;
`;

export const BrandName = styled.a`
  color: #2A9D8F;
  font-weight: bold;
  margin-left: 5px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
