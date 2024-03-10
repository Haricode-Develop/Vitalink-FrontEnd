import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Loader from "./components/Loader/Loader";
import LoginPage from './views/Login/LoginPage';
import Dashboard from './views/Dashboard/Dashboard';
import IngresarFisioterapeuta from './views/IngresarFisio/IngresarFisio';
import IngresarAdministrador from './views/IngresarAdmin/IngresarAdmin';
import LayoutSide from './components/LayoutSide';
import IngresarPaciente from './views/IngresarPaciente/IngresarPaciente';
import EliminarAdministrador from "./views/EliminarAdministrador/EliminarAdministrador";
import ResetPasswordPage from "./views/ResetPassword/ResetPassword";
import ActualizarFisio from "./views/ActualizarFisio/ActualizarFisio";
import ActualizarAdministrador from "./views/ActualizarAdministrador/ActualizarAdministrador";
import EliminarFisio from "./views/EliminarFisio/EliminarFisio";
import ReingresoFisio from "./views/ReingresoFisio/ReingresoFisio";
import AltaPaciente from "./views/AltaPaciente/AltaPaciente";
import ExerciseAssignment from "./views/AsignarEjercicioPaciente/ExerciseAssignment";
import ReingresoPaciente from "./views/ReingresoPaciente/ReingresoPaciente";
import CalendarioCitas from "./views/CalendarioCitas/CalendarioCitas";
import PlansPage from "./views/PlansPage/PlansPage";
import useSessionVerification from "./Hook/sessionToken";
import FichaEvolucion from "./views/FichaEvolucion/FichaEvolucion";
import Configuracion from "./views/Configuración/Configuracion";
import { MainContainer, Content, StyledFooter } from './MainContainerStyle';

const MainRoutes = () => {
    const { isAuthenticated, setIsAuthenticated, userData, loading, logout } = useContext(AuthContext);
    const location = useLocation(); // Hook para obtener la ubicación actual
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
                    <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
                    <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
                    <Route path="/planes" element={<PlansPage />} />
                    <Route path="/resetPassword" element={<ResetPasswordPage />} />

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
                        <Route path="configuracion" element={<Configuracion/>}/>
                    </Route>

                    <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
                </Routes>
            </Content>
            {!isDashboardRoute() && <StyledFooter />}
        </MainContainer>
    );
};

export default MainRoutes;
