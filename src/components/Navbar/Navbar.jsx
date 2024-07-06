// src/components/Navbar/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Header, Logo, Navigation, AuthButtons, Hamburger, Menu, MenuLink, MenuItem} from './NavbarStyle';
import logo from '../../assets/homePage/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Header>
            <Logo>
                <img src={logo} alt="Vitalink Logo" />
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
                    <MenuItem>
                        <AuthButtons>
                            <Link to="/login" className="login-button">Iniciar Sesión</Link>
                            <Link to="/pricing" className="pricing-button">Precios</Link>
                        </AuthButtons>
                    </MenuItem>
                </Menu>
            </Navigation>
        </Header>
    );
};

export default Navbar;
