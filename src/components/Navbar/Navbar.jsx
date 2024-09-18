import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Logo, Navigation, AuthButtons, Hamburger, Menu, MenuLink, MenuItem } from './NavbarStyle';
import logo from '../../assets/homePage/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Header>
            <Logo>
                <Link to="/">
                    <img src={logo} alt="Vitalink Logo" />
                </Link>
            </Logo>
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                <span />
                <span />
                <span />
            </Hamburger>
            <Navigation isOpen={isOpen}>
                <Menu>
                    <MenuItem><MenuLink to="/">Inicio</MenuLink></MenuItem>
                    <MenuItem><MenuLink to="/about">Acerca de Nosotros</MenuLink></MenuItem>
                    <MenuItem><MenuLink to="/contact">Contacto</MenuLink></MenuItem>
                    <MenuItem className="no-hover" style={{background: 'var(--celeste)', fontWeight: 700, borderRadius: '20px'}}>
                        <MenuLink style={{color: '#fff'}} to="/login">Iniciar Sesión</MenuLink>
                    </MenuItem>
                    <MenuItem className="no-hover" style={{background: 'var(--rojo)', borderRadius: '20px'}}>
                        <MenuLink style={{color: '#fff', fontWeight: 700}} to="/pricing">Precios</MenuLink>
                    </MenuItem>
                </Menu>
            </Navigation>
        </Header>
    );
};

export default Navbar;