import React, { useState, useContext, createContext, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useWebSocket } from "../context/WebSocketContext";
import { useSede } from '../context/SedeContext';
import {SidebarContext} from "../context/SidebarContext";
import {
  Sidebar,
  UserInfo,
  Menu,
  MenuItem,
  SubMenu,
  SubMenuItem,
  ChevronIcon,
  SidebarButton,
  Sede
} from '../views/Dashboard/DashboardStyle';
import profilePicture from '../assets/login/profile/user.png'; // Importa la imagen
import HeartIconAnimation from "./HeartIconAnimation/HeartIconAnimation";
import heartAnimationData from './HeartIconAnimation/AnimationHeart.json';
import animationData from '../assets/profile.json';
import axios from "axios";
import {FaBars, FaTimes, FaUsersCog, FaUserMd, FaUserInjured, FaChartLine, FaCog, FaBusinessTime } from 'react-icons/fa';

import Lottie from 'react-lottie';
import NotificationBell from "./NotificationBell/NotificationBell";
import {API_BASE_URL} from "../utils/config";

export const LayoutContext = createContext({
  activeSubMenu: '',
  setActiveSubMenu: () => {},
  handleNavigate: () => {}
});


const LayoutSide = ({ children }) => {
  const { sidebarState } = useContext(SidebarContext);
  const { userData, logout } = useContext(AuthContext);
  const { nombreSedeActual, isSedeInfoLoaded } = useSede();
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [notificationCount, setNotificationCount] = useState(5);
  const [profileImageUrl, setProfileImageUrl] = useState(null); // Estado para la URL de la imagen de perfil

  const wsContext = useWebSocket();

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

  const handleConfiguracionClick = () =>{
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/configuracion');
  }

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
    navigate('/login');
    if (wsContext.closeWebSocket) {
      wsContext.closeWebSocket();
    }
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

  const handleFichaClinicaClick = () => {
    if(isMobile()){
      setIsMenuOpen(false);
    }
    navigate('/dashboard/ficha-clinica');
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

  const handleGestionNegocioClick = () => {
    if (isMobile()) {
      setIsMenuOpen(false);
    }
    navigate('/dashboard/gestion-negocio');
  };

  const handleGestionServiciosClick = () => {
    if (isMobile()) {
      setIsMenuOpen(false);
    }
    navigate('/dashboard/gestion-servicios');
  };

  const handleReporteDeServicisClick = () => {
    if (isMobile()) {
      setIsMenuOpen(false);
    }
    navigate('/dashboard/reporte-servicios');
  };


  const userHasRole = (roleName) => {
    return userData?.roles.some(role => role.name.toLowerCase() === roleName.toLowerCase());
  }
  const showFisioterapeutaMenu = userHasRole('Gestor') || userHasRole('Administrador');
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  const animationRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prevKey => prevKey + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const renderProfilePicture = () => {
    if (sidebarState.profileImageUrl) {
      return <img src={sidebarState.profileImageUrl} alt="Foto de Perfil" style={{ width: '130px', height: '130px', borderRadius: '50%', marginTop: '15px' }} />;
    } else {
      // Si no hay foto de perfil, muestra la animación
      return <Lottie options={{ loop: false, autoplay: true, animationData }} height={200} width={200} />;
    }
  };

  useEffect(() => {
  }, [nombreSedeActual]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cuenta/fotoPerfil/${userData.id_usuario}`);
        if (response.data.success && response.data.fotoPerfilUrl) {
          setProfileImageUrl(response.data.fotoPerfilUrl);
        }
      } catch (error) {
        console.error('Error al obtener la foto de perfil:', error);
      }
    };

    fetchProfileImage();
  }, [userData.id_usuario]);

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
            width: '250px',
            overflowY: 'auto',
            transition: 'transform 0.3s ease-in-out'
          }}>
            <UserInfo>
              {renderProfilePicture()}
              <div style={{ paddingTop: '10px' }}>{userData?.name} {userData?.lastName}</div>
              <div>{userData?.roles.map(role => role.name).join(', ')}</div>
              <Sede>Sede Actual: {nombreSedeActual}</Sede>
            </UserInfo>

            <Menu>
              <MenuItem bold onClick={handleDashboardClick} className="dashboard">
                <FaChartLine /> Dashboard
                <div></div>
              </MenuItem>
              { userHasRole('Gestor') && (
                  <>
                    <MenuItem bold onClick={() => handleSubMenuClick('Administrador')} className={"administrador"}>
                      <FaUsersCog />Administrador
                      <ChevronIcon className="fa fa-chevron-up" rotate={activeSubMenu === 'Administrador'} />

                    </MenuItem>
                    <SubMenu active={activeSubMenu === 'Administrador'}>
                      <SubMenuItem onClick={handleAgregarAdministradorClick} className={"administradorSeccionIngreso"}>Añadir</SubMenuItem>
                      <SubMenuItem onClick={handleEliminarAdministradorClick} className={"administradorSeccionEliminar"}>Eliminar</SubMenuItem>
                      <SubMenuItem onClick={handleActualizarAdministradorClick} className={"administradorSeccionActualizar"}>Actualizar</SubMenuItem>
                    </SubMenu>
                  </>
              )}

              {showFisioterapeutaMenu && (
                  <>
                    <MenuItem bold onClick={() => handleSubMenuClick('Fisioterapeuta')} className={"fisioterapeuta"}>
                      <FaUserMd /> Fisioterapeuta
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
                <FaUserInjured />  Pacientes
                <ChevronIcon className="fa fa-chevron-up" rotate={activeSubMenu === 'Pacientes'} />
              </MenuItem>
              <SubMenu active={activeSubMenu === 'Pacientes'}>
                <SubMenuItem onClick={handleIngresarPacienteClick} className={"pacienteSeccionIngreso"}>Ingresar</SubMenuItem>
                <SubMenuItem onClick={handleDarAltaPacienteClick} className={"pacienteSeccionEliminar"}>Dar de alta</SubMenuItem>
                <SubMenuItem onClick={handleReingresarPacienteClick} className={"pacienteSeccionReingreso"}>Reingreso</SubMenuItem>
                <SubMenuItem onClick={handleCalendarioCitasClick} className={"calendarioCitasPaciente"}>Calendario de citas</SubMenuItem>
                <SubMenuItem onClick={handleFichaEvolucionClick} className={"fichaEvolucion"}>Ficha Evolucion</SubMenuItem>
                <SubMenuItem onClick={handleFichaClinicaClick} className={"fichaClinica"}>Ficha clínica</SubMenuItem>
                {/*<SubMenuItem onClick={handleAsignarPacienteClick}>Asignar Ejercicio</SubMenuItem>*/}
              </SubMenu>
              <MenuItem bold onClick={() => handleSubMenuClick('GestionNegocio')} className={"gestionNegocio"}>
                <FaBusinessTime /> Gestión del negocio
                <ChevronIcon className="fa fa-chevron-up" rotate={activeSubMenu === 'GestionNegocio'} />
              </MenuItem>
              <SubMenu active={activeSubMenu === 'GestionNegocio'}>
                <SubMenuItem onClick={handleGestionServiciosClick} className={"gestionServiciosSeccion"}>Gestión de servicios</SubMenuItem>
                <SubMenuItem onClick={handleReporteDeServicisClick} className={"reporteDeServiciosSeccion"}>Reporte de servicios</SubMenuItem>
              </SubMenu>

              <MenuItem bold onClick={handleConfiguracionClick} className={"configuracion"}>
                <FaCog />  Configuración
                <div></div>
              </MenuItem>


              <MenuItem onClick={handleLogoutClick}>
                &nbsp;Cerrar sesión
                <ChevronIcon className="fa fa-sign-out" rotate={activeSubMenu === 'CerrarSesion'} />
              </MenuItem>
            </Menu>
          </Sidebar>
          <HeartIconAnimation animationData={heartAnimationData} />
               <div style={{ display: 'flex', flexDirection: 'column', marginLeft: !isMobile() && isSidebarOpen ? '250px' : '0',  width: '100%', transition: 'margin-left 0.3s', boxSizing: 'border-box' }}>
                 <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px', position: 'relative' }}>
                   <NotificationBell />
                 </div>
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