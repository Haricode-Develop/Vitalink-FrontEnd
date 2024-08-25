import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StyledModal } from '../../components/Modal';
import { AuthContext } from '../../context/AuthContext';
import { useSpring, animated } from 'react-spring';
import logo from '../../assets/login/logo.png';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';

import {
  BackgroundImage,
  Overlay,
  LoginForm,
  Logo,
  Input,
  ForgotPasswordLink,
  Button,
  PlansTextLink,
  CharacterCircle,
  CharacterCircleContainer
} from './LoginStyles';
import { API_BASE_URL } from '../../utils/config';
import Footer from '../../components/Footer/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserData, setSessionToken } = useContext(AuthContext);
  const [showResetModal, setShowResetModal] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  const footerRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
  }, [footerRef]);

  const handleSubmit = () => {
    let validationErrors = {};

    // Validación de los campos del formulario
    if (!email) {
      validationErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      validationErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!password) {
      validationErrors.password = 'La contraseña es obligatoria';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post(`${API_BASE_URL}/auth/login`, { email, password })
          .then((response) => {
            if (response.data.success) {
              setSessionToken(response.data.sessionToken);
              if (response.data.roles.some(role => role.id === 1)) {
                toast.warn("Lo sentimos, como usuario paciente no tienes acceso a este apartado. Por favor, visita la versión móvil de Vitalink.");
                return;
              }
              console.log("ESTA ES LA RESPUESTA DE LOGIN", response.data);
              setUserData({
                name: response.data.name,
                lastName: response.data.lastName,
                roles: response.data.roles,
                instituciones: response.data.instituciones,
                sedes: response.data.sedes,
                estado_contrasena: response.data.estado_contrasena,
                id_usuario: response.data.id_usuario
              });
              setIsAuthenticated(true);
              navigate('/dashboard');
            } else {
              toast.warn(response.data.error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
              });
            }
          })
          .catch((error) => {
            console.error('Error de inicio de sesión:', error);
            toast.error("Error en la autenticación, por favor intente nuevamente.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
              hideProgressBar: true,
            });
          });
    }
  };

  const navigateToPlans = () => {
    navigate('/planes');
  };

  const handleForgotPasswordClick = () => {
    setShowResetModal(true);
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 150,
  });

  const handleModalSubmit = () => {
    axios.post(`${API_BASE_URL}/auth/olvidoContrasena`, { email: modalEmail })
        .then(response => {
          if (response.data.success) {
            toast.success("Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.");
            setShowResetModal(false);
          } else {
            toast.warn(response.data.error);
          }
        })
        .catch(error => {
          toast.error("Algo salió mal, intente de nuevo más tarde.");
        });
  };

  return (
      <>
        <Helmet>
          <title>Login - Vitalink</title>
          <meta name="description" content="Inicia sesión en Vitalink para gestionar tus citas médicas, historial de salud y ejercicios de rehabilitación." />
          <meta name="keywords" content="login, acceso, salud, gestión médica, citas online" />
        </Helmet>
        <Navbar/>
        <BackgroundImage>
          <CharacterCircleContainer>
            <CharacterCircle />
          </CharacterCircleContainer>

          <Overlay>
            <animated.div style={formAnimation}>
              <LoginForm>
                <Logo src={logo} alt="logo" />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                <Button onClick={handleForgotPasswordClick} style={{ marginTop: "30px" }}>¿Olvidaste tu contraseña?</Button>
                <Button onClick={handleSubmit} style={{ background: "var(--rojo)" }}>Ingresar</Button>
                {/*
                <PlansTextLink onClick={navigateToPlans}>
                  ¿Primera vez con Vitalink? Conoce nuestros planes
                </PlansTextLink>
              */}
              </LoginForm>
            </animated.div>
            <StyledModal isOpen={showResetModal} onRequestClose={() => setShowResetModal(false)}>
              <h2>Recuperar contraseña</h2>
              <Input
                  type="email"
                  placeholder="Email"
                  value={modalEmail}
                  onChange={(e) => setModalEmail(e.target.value)}
              />
              <Button onClick={handleModalSubmit}>Recuperar Contraseña</Button>
              <Button onClick={() => setShowResetModal(false)}>Cancelar</Button>
            </StyledModal>
          </Overlay>

          <ToastContainer />
        </BackgroundImage>
      </>
  );
};

export default LoginPage;