import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './views/Login/LoginPage';
import Dashboard from './views/Dashboard/Dashboard';
import IngresarFisioterapeuta from './views/IngresarFisio/IngresarFisio';
import IngresarAdministrador from './views/IngresarAdmin/IngresarAdmin';
import LayoutSide from './components/LayoutSide';
import { AuthContext } from './context/AuthContext';
import IngresarPaciente from './views/IngresarPaciente/IngresarPaciente';
import EliminarAdministrador from "./views/EliminarAdministrador/EliminarAdministrador";
import ResetPasswordPage from "./views/ResetPassword/ResetPassword";
import ActualizarFisio from "./views/ActualizarFisio/ActualizarFisio";
import ActualizarAdministrador from "./views/ActualizarAdministrador/ActualizarAdministrador";
import EliminarFisio from "./views/EliminarFisio/EliminarFisio";
import ReingresoFisio from "./views/Reingreso/ReingresoFisio";
import AltaPaciente from "./views/AltaPaciente/AltaPaciente";
import AsignarEjercicioPaciente from "./views/AsignarEjercicioPaciente/AsignarEjercicioPaciente";
import ReingresoPaciente from "./views/ReingresoPaciente/ReingresoPaciente";
import CalendarioCitas from "./views/CalendarioCitas/CalendarioCitas";

const MainRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
      <Routes>
          <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/dashboard/*" element={isAuthenticated ? <LayoutSide /> : <Navigate to="/" replace />}>
              <Route path="" element={<Dashboard />} />
              <Route path="ingresar-medico" element={<IngresarFisioterapeuta />} />
              <Route path="agregar-administrador" element={<IngresarAdministrador />} />
              <Route path="eliminar-administrador" element={<EliminarAdministrador />} />
              <Route path="actualizar-administrador" element={<ActualizarAdministrador />} />
              <Route path="ingresar-paciente" element={<IngresarPaciente />} />
              <Route path="eliminar-medico" element={<EliminarFisio />} />
              <Route path="actualizar-medico" element={<ActualizarFisio />} />
              <Route path="reingreso-medico" element={<ReingresoFisio />} />
              <Route path="alta-paciente" element={<AltaPaciente />} />
              <Route path="asignar-ejercicio" element={<AsignarEjercicioPaciente />} />
              <Route path="reingreso-paciente" element={<ReingresoPaciente />} />
              <Route path="calendario-citas" element={<CalendarioCitas />} />

          </Route>
      </Routes>

  );
};

export default MainRoutes;
