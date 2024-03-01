import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StyledModal } from '../../components/Modal';
import { AuthContext } from '../../context/AuthContext';
import { useSpring, animated } from 'react-spring';
import logo from '../../assets/login/logo.png'
import Swal from 'sweetalert2';
import {
  BackgroundImage,
  Overlay,
  LoginForm,
  Logo,
  Input,
  ForgotPasswordLink,
  Button,
  PlansTextLink, CharacterCircle, CharacterCircleContainer
} from './LoginStyles';
import {API_BASE_URL} from "../../utils/config";
import Footer from "../../components/Footer/Footer";

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
    } else if (
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
    ) {
      validationErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!password) {
      validationErrors.password = 'La contraseña es obligatoria';
    }

    setErrors(validationErrors);

    // Si no hay errores de validación, proceder con la solicitud de inicio de sesión
    if (Object.keys(validationErrors).length === 0) {
      axios.post(`${API_BASE_URL}/auth/login`, { email, password })
          .then((response) => {
            if (response.data.success) {

              // Establecer los datos del usuario y actualizar el estado de autenticación
              setSessionToken(response.data.sessionToken);
              if (response.data.id_rol === 1) {
                toast.warn("Lo sentimos, como usuario paciente no tienes acceso a este apartado. Por favor, visita la versión móvil de Vitalink.");
                return;
              }
              setUserData({
                name: response.data.name,
                lastName: response.data.lastName,
                role: response.data.role,
                id_empresa: response.data.id_empresa,
                id_rol: response.data.id_rol,
                estado_contrasena: response.data.estado_contrasena,
                id_usuario: response.data.id_usuario
              });
              setIsAuthenticated(true);

              // Navegar al dashboard después del inicio de sesión exitoso
              navigate('/dashboard');
            } else {
              // Mostrar un mensaje de error si la autenticación falla
              toast.warn(response.data.error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
              });
            }
          })
          .catch((error) => {
            console.error('Error de inicio de sesión:', error);
            // Manejar errores de la solicitud, como problemas de conexión
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
            setShowResetModal(false); // Aquí cerramos el modal con showResetModal
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
              <Button onClick={handleForgotPasswordClick} style={{marginTop: "30px"}}>¿Olvidaste tu contraseña?</Button>
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
