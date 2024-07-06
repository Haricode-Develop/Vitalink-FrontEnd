import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: var(--negro);
  background-color: var(--blanco);
  position: fixed;
  top: 0;
  width: 96%;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 86%;
  }
`;

export const Logo = styled.div`
  img {
    height: 40px;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: var(--blanco);
    border-top: 1px solid #ddd;
    z-index: 1000;
  }
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 1rem 0;
    gap: 0rem;
  }
`;

export const MenuItem = styled.li`
  @media (max-width: 768px) {
    text-align: center;
    padding: 0.5rem 0;
  }
`;

export const MenuLink = styled(Link)`
  color: var(--negro);
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: block;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;

  &:hover {
    background: #efefef;
    border-radius: 10px;
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  justify-content: center;

  .login-button,
  .pricing-button {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.3s;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      margin-left: 0;
      margin-top: 0.5rem;
      width: 100%;
    }
  }

  .login-button {
    background-color: var(--limon);
    color: var(--negro);

    &:hover {
      background-color: var(--limon);
    }
  }

  .pricing-button {
    background-color: var(--rojo);
    color: var(--blanco);

    &:hover {
      background-color: var(--rojo-oscuro);
    }
  }
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 3px;
    width: 25px;
    background: var(--negro);
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;