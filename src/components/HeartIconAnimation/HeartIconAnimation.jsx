import React, {useContext, useEffect, useRef, useState} from 'react';
import { FaArrowLeft, FaBuilding, FaAngleDown } from 'react-icons/fa';
import {
    PopupWindow,
    MessagePopup,
    MenuItem,
    FormContainer,
    Input,
    TextArea,
    Button,
    BackButton,
    ModalBackdrop, IconContainer, StyledDropdown, StyledDropdownContainer, FloatingButton, StyledIcon, StyledOption
} from './HeartIconAnimationStyle';
import Tutorial from "../Tutorial/Tutorial";
import {API_BASE_URL} from "../../utils/config";
import {toast, ToastContainer } from "react-toastify";
import Vita from "./img/vita.png"
import {AuthContext} from "../../context/AuthContext";
import { useSede } from '../../context/SedeContext';

const messages = [
    "Bienvenido!", // Español
    "Soy Vita, tu asistente de bienestar. ¿Cómo puedo asistirte hoy?",
    "Welcome!", // Inglés
    "Bienvenue!", // Francés
    "Cuida tu salud",
    "¡Encantado de verte! Soy Vita. No olvides tomar agua hoy.",
    "Soy Vita, tu compañero de salud. Recuerda: ¡un pequeño cambio puede hacer una gran diferencia!",
    "No olvides hacer ejercicio",
    "El ejercicio regular fortalece tu cuerpo",
    "Come bien, vive bien",
    "La prevención es mejor que la cura",
    "Vita a bordo. Recordarte cuidar de ti mismo es mi trabajo favorito."
];

const HeartIconAnimation = ({ animationData }) => {
    const { userData } = useContext(AuthContext);
    const { idSedeActual, changeSede } = useSede();

    const [showPopup, setShowPopup] = useState(false);
    const [messageQueue, setMessageQueue] = useState([]);
    const [showContactForm, setShowContactForm] = useState(false);
    const animationContainer = useRef(null);
    const [selectedSede, setSelectedSede] = useState(idSedeActual);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isTouching, setIsTouching] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const [formData, setFormData] = useState({
        nombreCompleto: '',
        email: '',
        mensaje: '',
    });
    const [isTutorialActive, setIsTutorialActive] = useState(false);

    const iconSize = 75;
    useEffect(() => {


        // Función para agregar un nuevo mensaje a la cola
        const addMessageToQueue = (msg) => {
            if (!showPopup) {
                setMessageQueue((prevQueue) => [...prevQueue, msg]);
                setTimeout(() => {
                    setMessageQueue((prevQueue) => prevQueue.slice(1));
                }, 10000);
            }
        };

        const messageInterval = setInterval(() => {
            if (!showPopup) {
                const randomIndex = Math.floor(Math.random() * messages.length);
                addMessageToQueue(messages[randomIndex]);
            }
        }, 30000);

        return () => {
            clearInterval(messageInterval);
        };
    }, [showPopup]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const handleContactClick = () => {
        setShowContactForm(true);
        setShowPopup(true);
    };
    const handleBackClick = () => {
        setShowContactForm(false);
    };
    const closePopup = () => {
        setShowPopup(false);
        setShowContactForm(false);
    };
    const handleInputEmailChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        fetch(`${API_BASE_URL}/asistente/emailSoporte`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Correo enviado exitosamente", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                    // No cerrar el popup aquí. Solo mostrar el mensaje de éxito.
                } else {
                    toast.error("Ocurrió un error, contacte con su administrador", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                }
            })
            .catch((error) => {
                alert('Hubo un error al enviar el mensaje.');
                console.error('Error:', error);
            });
    };

    const startTutorial = () => {
        setIsTutorialActive(true);
        setShowPopup(false);
    };

    const closeTutorial = () => {
        setIsTutorialActive(false);
    };
    const handleSedeChange = (e) => {
        const newSedeId = e.target.value;
        setSelectedSede(newSedeId);
        changeSede(newSedeId);
    };


    useEffect(() => {
        if (userData?.sedes?.length > 0) {
            setSelectedSede(userData.sedes[0].ID_SEDE);
        }
    }, [userData]);

    useEffect(() => {
        setSelectedSede(idSedeActual);
    }, [idSedeActual]);

    useEffect(() => {
        if (!idSedeActual && userData?.sedes?.length > 0) {
            changeSede(userData.sedes[0].ID_SEDE);
        }
    }, [userData, idSedeActual, changeSede]);


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 2000);
        };

        const handleTouchStart = () => {
            setIsTouching(true);
        };
        const handleTouchEnd = () => {
            setIsTouching(false);
        };


        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);


    return (
        <>
            {showPopup && <ModalBackdrop onClick={closePopup} />}
            <IconContainer onClick={togglePopup} size={iconSize}>
                <img src={Vita} alt="Vita" width={iconSize} height={iconSize} />
            </IconContainer>
            {userData?.sedes?.length > 1 && (
                <FloatingButton onClick={toggleDropdown}>
                    <FaBuilding />
                    <StyledDropdownContainer>
                        <StyledDropdown value={selectedSede} onChange={handleSedeChange}>
                            {userData.sedes.map((sede) => (
                                <StyledOption key={sede.ID_SEDE} value={sede.ID_SEDE}>
                                    {sede.NOMBRE}
                                </StyledOption>
                            ))}
                        </StyledDropdown>
                    </StyledDropdownContainer>
                </FloatingButton>
            )}
            {showPopup && (
                <PopupWindow>
                    {!showContactForm && (
                        <>
                            <MenuItem onClick={handleContactClick}>Contactar a soporte</MenuItem>
                            <MenuItem onClick={startTutorial} hideOnMobile>Tutorial Interactivo</MenuItem>
                        </>
                    )}
                    {showContactForm && (
                        <FormContainer>
                            <BackButton onClick={handleBackClick}><FaArrowLeft /></BackButton>

                            <Input
                                name="nombreCompleto"
                                placeholder="Nombre completo"
                                value={formData.nombreCompleto}
                                onChange={handleInputEmailChange}
                            />
                            <Input
                                name="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleInputEmailChange}
                            />
                            <TextArea
                                name="mensaje"
                                placeholder="Escribe tu mensaje aquí"
                                value={formData.mensaje}
                                onChange={handleInputEmailChange}
                            />
                            <Button onClick={handleSubmitEmail}>Enviar</Button>
                        </FormContainer>
                    )}
                </PopupWindow>
            )}
            <Tutorial isActive={isTutorialActive} onClose={closeTutorial} />


            {!showPopup  && !isScrolling && !isTouching && messageQueue.map((message, index) => (
                <MessagePopup key={index}>
                    <p>{message}</p>
                </MessagePopup>
            ))}
            <ToastContainer />
        </>
    );
};

export default HeartIconAnimation;