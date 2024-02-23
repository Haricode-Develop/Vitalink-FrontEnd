import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: var(--blanco);
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  z-index: 10;
`;

export const SocialMediaIcons = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  & > a {
    margin: 0 10px;
    color:var(--gris-oscuro);
    transition: color 0.3s;
    &:hover {
      color: var(--celeste-rgba-65);
    }
  }
`;

export const FooterRights = styled.div`
  text-align: center;
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--gris-oscuro);
`;

export const BrandName = styled.a`
  color:  var(--celeste-rgba-65);
  font-weight: bold;
  margin-left: 5px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
