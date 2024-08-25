// src/MainRoutes.js

import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Loader from "./components/Loader/Loader";
import LoginPage from './views/Login/LoginPage';
import Dashboard from './views/Dashboard/Dashboard';
import IngresarFisioterapeuta from './views/IngresarFisio/IngresarFisio';
import Pricing from "./views/Pricing/Pricing";
import useSessionVerification from "./Hook/sessionToken";
import ReingresoPaciente from "./views/ReingresoPaciente/ReingresoPaciente";
import CalendarioCitas from "./views/CalendarioCitas/CalendarioCitas";
import FichaEvolucion from "./views/FichaEvolucion/FichaEvolucion";
import Configuracion from "./views/Configuración/Configuracion";
import AltaPaciente from "./views/AltaPaciente/AltaPaciente";
import ExerciseAssignment from "./views/AsignarEjercicioPaciente/ExerciseAssignment";
import ActualizarAdministrador from "./views/ActualizarAdministrador/ActualizarAdministrador";
import EliminarFisio from "./views/EliminarFisio/EliminarFisio";
import ReingresoFisio from "./views/ReingresoFisio/ReingresoFisio";
import ActualizarFisio from "./views/ActualizarFisio/ActualizarFisio";
import ResetPasswordPage from "./views/ResetPassword/ResetPassword";
import IngresarPaciente from './views/IngresarPaciente/IngresarPaciente';
import EliminarAdministrador from "./views/EliminarAdministrador/EliminarAdministrador";
import LayoutSide from './components/LayoutSide';
import IngresarAdministrador from './views/IngresarAdmin/IngresarAdmin';
import { MainContainer, Content, StyledFooter } from './MainContainerStyle';
import GestionServicios from './views/GestionServicios/GestionServicios';
import ReporteServicios from './views/ReporteServicios/ReporteServicios';
import HomePage from './views/HomePage/HomePage';
import AcercaDeNosotros from "./views/AcercaDeNosotros/AcercaDeNosotros";
import Contactanos from "./views/Contactanos/Contactanos";
import Princing from "./views/Pricing/Pricing";
import FichaClinica from "./views/FichasClinicas/FichasClinicas";
import Billing from "./views/Billing/Billing";

const MainRoutes = () => {
    const { isAuthenticated, setIsAuthenticated, userData, loading, logout } = useContext(AuthContext);
    const location = useLocation();
    useSessionVerification(isAuthenticated, userData, setIsAuthenticated, logout);
    if (loading) {
        return <Loader />;
    }

    const isDashboardRoute = () => {
        return location.pathname.startsWith('/dashboard');
    }

    return (
        <MainContainer>
            <Content>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AcercaDeNosotros />} />
                    <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
                    <Route path="/planes" element={<Pricing />} />
                    <Route path="/resetPassword" element={<ResetPasswordPage />} />
                    <Route path="/contact" element={<Contactanos />} />
                    <Route path="/pricing" element={<Princing />} />
                    <Route path="/billing" element={<Billing/>}></Route>
                    <Route path="/dashboard/*" element={isAuthenticated ? <LayoutSide /> : <Navigate to="/login" replace />}>
                        <Route index element={<Dashboard />} />
                        <Route path="ingresar-medico" element={<IngresarFisioterapeuta />} />
                        <Route path="agregar-administrador" element={<IngresarAdministrador />} />
                        <Route path="eliminar-administrador" element={<EliminarAdministrador />} />
                        <Route path="actualizar-administrador" element={<ActualizarAdministrador />} />
                        <Route path="ingresar-paciente" element={<IngresarPaciente />} />
                        <Route path="eliminar-medico" element={<EliminarFisio />} />
                        <Route path="actualizar-medico" element={<ActualizarFisio />} />
                        <Route path="reingreso-medico" element={<ReingresoFisio />} />
                        <Route path="alta-paciente" element={<AltaPaciente />} />
                        <Route path="asignar-ejercicio" element={<ExerciseAssignment />} />
                        <Route path="reingreso-paciente" element={<ReingresoPaciente />} />
                        <Route path="calendario-citas" element={<CalendarioCitas />} />
                        <Route path="ficha-evolucion" element={<FichaEvolucion />} />
                        <Route path="configuracion" element={<Configuracion />} />
                        <Route path="gestion-servicios" element={<GestionServicios />} />
                        <Route path="reporte-servicios" element={<ReporteServicios />} />
                        <Route path="ficha-clinica" element={<FichaClinica/>}></Route>
                    </Route>

                    <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
                </Routes>
                {!isDashboardRoute() && <StyledFooter />}
            </Content>
        </MainContainer>
    );
};

export default MainRoutes;