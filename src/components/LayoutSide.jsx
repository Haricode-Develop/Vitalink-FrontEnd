import React, { useState, useContext, createContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Sidebar,
  ProfileImage,
  UserInfo,
  Menu,
  MenuItem,
  SubMenu,
  SubMenuItem,
  ChevronIcon,
  Content,
  Box,
  BoxTitle,
  BoxButton,
  SidebarButton
} from '../views/Dashboard/DashboardStyle';
import profilePicture from '../assets/login/profile/user.png'; // Importa la imagen
import HeartIconAnimation from "./HeartIconAnimation/HeartIconAnimation";
import heartAnimationData from './HeartIconAnimation/AnimationHeart.json';
import { FaBars, FaTimes, FaChevronUp } from 'react-icons/fa';

export const LayoutContext = createContext({
  activeSubMenu: '',
  setActiveSubMenu: () => {},
  handleNavigate: () => {}
});


const LayoutSide = ({ children }) => {
  const { userData, logout } = useContext(AuthContext);
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile()) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSubMenuClick = (menu) => {

    setActiveSubMenu(activeSubMenu === menu ? '' : menu);
  };

  const handleIngresarFisioterapeutaClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/ingresar-medico');
  };

  const handleEliminarFisioterapeutaClick = () =>{
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/eliminar-medico');
  };

  const handleActualizarFisioterapeutaClick = () =>{
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/actualizar-medico');
  };
  const handleReingresoFisioterapeutaClick = () =>{
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/reingreso-medico');
  };
  const handleDashboardClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard');
  };

  const handleAgregarAdministradorClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/agregar-administrador');
  };

  const handleEliminarAdministradorClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/eliminar-administrador');
  };

  const handleActualizarAdministradorClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/actualizar-administrador');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };
  const handleAsignarPacienteClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);

    }
    navigate('/dashboard/asignar-ejercicio');

  }
  const handleFichaEvolucionClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/ficha-evolucion');
  }

  const handleCalendarioCitasClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/calendario-citas');
  }
  const handleReingresarPacienteClick = () =>{
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/reingreso-paciente');
  }
  const handleIngresarPacienteClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/ingresar-paciente');
  };
  const handleDarAltaPacienteClick = () =>{
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/alta-paciente');
  }
  const isMobile = () => window.innerWidth <= 768;
  const handleNavigate = (path) => {
    navigate(path);
    if(isMobile()){
      setIsMenuOpen(false);
      setIsSidebarOpen(false);
    }
  };
  return (
      <LayoutContext.Provider value={{ activeSubMenu, setActiveSubMenu, handleNavigate }}>
    <div style={{ display: 'flex' }}>
      <SidebarButton onClick={toggleSidebar}>
        {isMobile() ? (isMenuOpen ? <FaTimes /> : <FaBars />) : (isSidebarOpen ? <FaTimes /> : <FaBars />)}
      </SidebarButton>
      <Sidebar
          open={isSidebarOpen} menuOpen={isMenuOpen} style={{
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '250px', // Suponiendo un ancho de 250px para el sidebar, ajusta según tus necesidades
      overflowY: 'auto',
        transition: 'transform 0.3s ease-in-out'
    }}>
        <ProfileImage image={profilePicture} />
        <UserInfo>
          <div style={{ paddingTop: '10px' }}>{userData?.name} {userData?.lastName}</div>
          <div>{userData?.role}</div>
        </UserInfo>

        <Menu>
          <MenuItem bold onClick={handleDashboardClick} className="dashboard">
            Dashboard
          </MenuItem>
          {userData?.id_rol === 4 && (
            <>
              <MenuItem bold onClick={() => handleSubMenuClick('Administrador')} className={"administrador"}>
                Administrador
                {activeSubMenu === 'Administrador' ? <FaChevronUp /> : <FaChevronUp />}
              </MenuItem>
              <SubMenu active={activeSubMenu === 'Administrador'}>
                <SubMenuItem onClick={handleAgregarAdministradorClick} className={"administradorSeccionIngreso"}>Añadir</SubMenuItem>
                <SubMenuItem onClick={handleEliminarAdministradorClick} className={"administradorSeccionEliminar"}>Eliminar</SubMenuItem>
                <SubMenuItem onClick={handleActualizarAdministradorClick} className={"administradorSeccionActualizar"}>Actualizar</SubMenuItem>
              </SubMenu>
            </>
          )}

          {userData?.id_rol !== 2 && (
            <>
              <MenuItem bold onClick={() => handleSubMenuClick('Fisioterapeuta')} className={"fisioterapeuta"}>
                Fisioterapeuta
                <ChevronIcon className="fa fa-chevron-up" rotate={activeSubMenu === 'Fisioterapeuta'} />
              </MenuItem>
              <SubMenu active={activeSubMenu === 'Fisioterapeuta'}>
                <SubMenuItem onClick={handleIngresarFisioterapeutaClick} className={"fisioterapeutaSeccionIngreso"}>Añadir</SubMenuItem>
                <SubMenuItem onClick={handleEliminarFisioterapeutaClick} className={"fisioterapeutaSeccionEliminar"}>Eliminar</SubMenuItem>
                <SubMenuItem onClick={handleActualizarFisioterapeutaClick} className={"fisioterapeutaSeccionActualizar"}>Actualizar</SubMenuItem>
                <SubMenuItem onClick={handleReingresoFisioterapeutaClick} className={"fisioterapeutaSeccionReingreso"}>ReIngresar</SubMenuItem>
              </SubMenu>
            </>
          )}

          <MenuItem bold onClick={() => handleSubMenuClick('Pacientes')} className={"paciente"}>
            Pacientes
            <ChevronIcon className="fa fa-chevron-up" rotate={activeSubMenu === 'Pacientes'} />
          </MenuItem>
          <SubMenu active={activeSubMenu === 'Pacientes'}>
            <SubMenuItem onClick={handleIngresarPacienteClick} className={"pacienteSeccionIngreso"}>Ingresar</SubMenuItem>
            <SubMenuItem onClick={handleDarAltaPacienteClick} className={"pacienteSeccionEliminar"}>Dar de alta</SubMenuItem>
            <SubMenuItem onClick={handleReingresarPacienteClick} className={"pacienteSeccionReingreso"}>Reingreso</SubMenuItem>
            <SubMenuItem onClick={handleCalendarioCitasClick} className={"calendarioCitasPaciente"}>Calendario de citas</SubMenuItem>
            <SubMenuItem onClick={handleFichaEvolucionClick} className={"fichaEvolucion"}>Ficha Evolucion</SubMenuItem>
            {/*<SubMenuItem onClick={handleAsignarPacienteClick}>Asignar Ejercicio</SubMenuItem>*/}
          </SubMenu>

          <MenuItem onClick={handleLogoutClick}>
          &nbsp;Cerrar sesión
            <ChevronIcon className="fa fa-sign-out" rotate={activeSubMenu === 'CerrarSesion'} />
          </MenuItem>
        </Menu>
      </Sidebar>
      <HeartIconAnimation animationData={heartAnimationData} />

      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: !isMobile() && isSidebarOpen ? '250px' : '0',  width: '100%', transition: 'margin-left 0.3s', boxSizing: 'border-box' }}>
        <Outlet />
      <div>
        {children}
        </div>
      </div>
    </div>
      </LayoutContext.Provider>
  );
};

export default LayoutSide;
