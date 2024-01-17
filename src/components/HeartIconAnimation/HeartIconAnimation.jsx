import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { FaArrowLeft } from 'react-icons/fa';
import {
    PopupWindow,
    MessagePopup,
    MenuItem,
    FormContainer,
    Input,
    TextArea,
    Button,
    BackButton,
    ModalBackdrop
} from './HeartIconAnimationStyle';
import Tutorial from "../Tutorial/Tutorial";
import {API_BASE_URL} from "../../utils/config";
import {toast, ToastContainer } from "react-toastify";

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
    const [showPopup, setShowPopup] = useState(false);
    const [messageQueue, setMessageQueue] = useState([]);
    const [showContactForm, setShowContactForm] = useState(false);
    const animationContainer = useRef(null);
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        email: '',
        mensaje: '',
    });
    const [isTutorialActive, setIsTutorialActive] = useState(false);

    const size = { width: 250, height: 250 };

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });

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
            anim.destroy();
            clearInterval(messageInterval);
        };
    }, [animationData, showPopup]);

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

    return (
        <>
            {showPopup && <ModalBackdrop onClick={closePopup} />}
            <div onClick={togglePopup} ref={animationContainer} style={{
                position: 'fixed',
                bottom: '-70px',
                right: '-70px',
                width: `${size.width}px`,
                height: `${size.height}px`,
                zIndex: 1000,
                cursor: 'pointer'
            }} />
            {showPopup && (
                <PopupWindow>
                    {!showContactForm && (
                        <>
                            <MenuItem onClick={handleContactClick}>Contactar a soporte</MenuItem>
                            <MenuItem onClick={startTutorial}>Tutorial Interactivo</MenuItem>
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


            {!showPopup && messageQueue.map((message, index) => (
                <MessagePopup key={index}>
                    <p>{message}</p>
                </MessagePopup>
            ))}
            <ToastContainer />
        </>
    );
};

export default HeartIconAnimation;