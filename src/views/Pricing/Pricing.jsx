import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';
import {
    PricingSection,
    PricingHeader,
    PricingContent,
    PricingCard,
    PricingCardHeader,
    PricingCardBody,
    PricingCardFooter,
    PricingButton,
    RightContainer,
    VideoContainer,
    SVGContainer,
    PopupContainer,
    PopupContent,
    CloseButton
} from './PricingStyle';
import featureImage from '../../assets/homePage/vitaHomePage.webm';

const Pricing = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handlePopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <Helmet>
                <title>Precios - Vitalink</title>
                <meta name="description" content="Descubre nuestro plan de precios para la gestión médica eficiente con Vitalink." />
                <meta name="keywords" content="gestión médica, software médico, citas médicas, precios, servicios médicos" />
                <meta name="author" content="Vitalink" />
                <meta property="og:title" content="Precios - Vitalink" />
                <meta property="og:description" content="Descubre nuestro plan de precios para la gestión médica eficiente con Vitalink." />
                <meta property="og:image" content={featureImage} />
                <meta property="og:url" content="https://www.vitalink.com/pricing" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Precios - Vitalink",
                        "description": "Descubre nuestro plan de precios para la gestión médica eficiente con Vitalink.",
                        "url": "https://www.vitalink.com/pricing"
                    })}
                </script>
            </Helmet>
            <Navbar />
            <PricingSection>
                <SVGContainer>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient1" x1="0" x2="1" y1="1" y2="0">
                                <stop stopColor="rgba(3, 114, 255, 1)" offset="0%"></stop>
                                <stop stopColor="rgba(151, 255, 228, 1)" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <path fill="url(#gradient1)" d="M17.6,-25.1C20.6,-22,19.3,-13.9,23.6,-6.4C27.8,1.2,37.6,8.3,38,14C38.4,19.6,29.4,23.9,21.5,27.2C13.6,30.6,6.8,33,1.5,30.9C-3.8,28.9,-7.7,22.4,-15.4,19C-23.1,15.6,-34.6,15.3,-38.3,10.8C-42,6.3,-37.9,-2.3,-33.7,-9.6C-29.4,-16.8,-25,-22.6,-19.4,-24.8C-13.8,-27.1,-6.9,-25.7,0.2,-26C7.3,-26.3,14.6,-28.2,17.6,-25.1Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" style={{ transition: 'all 0.3s ease 0s' }}></path>
                    </svg>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ top: '50%', left: '10%' }}>
                        <defs>
                            <linearGradient id="gradient2" x1="0" x2="1" y1="1" y2="0">
                                <stop stopColor="rgba(3, 114, 255, 1)" offset="0%"></stop>
                                <stop stopColor="rgba(151, 255, 228, 1)" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <path fill="url(#gradient2)" d="M24.6,-33.6C31.4,-29,35.9,-21.1,38.7,-12.6C41.5,-4.1,42.4,5,40.1,13.3C37.7,21.5,32.1,28.9,24.8,34.9C17.6,40.8,8.8,45.3,-0.3,45.7C-9.4,46.1,-18.8,42.5,-25.5,36.3C-32.1,30.2,-36.1,21.6,-38.3,12.9C-40.5,4.2,-41,-4.6,-38.4,-12.5C-35.9,-20.4,-30.3,-27.2,-23.4,-31.8C-16.5,-36.3,-8.3,-38.5,0.3,-39C8.9,-39.4,17.9,-38.2,24.6,-33.6Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" style={{ transition: 'all 0.3s ease 0s' }}></path>
                    </svg>
                </SVGContainer>
                <PricingContent>
                    <PricingCard>
                        <PricingCardHeader>
                            <h2>Premium</h2>
                            <p>$20 / mes</p>
                        </PricingCardHeader>
                        <PricingCardBody>
                            <ul>
                                <li>Calendarización de citas interactivas</li>
                                <li>Gestión de servicios</li>
                                <li>Reporte financiero</li>
                                <li>Dashboard de visualización de datos generales de la institución</li>
                                <li>Exportación por medio de excel</li>
                                <li>Recordatorios automatizados por medio de inteligencia artificial</li>
                                <li>Gestión de médicos y pacientes</li>
                            </ul>
                        </PricingCardBody>
                        <PricingCardFooter>
                            <PricingButton onClick={handlePopup}>Comenzar</PricingButton>
                        </PricingCardFooter>
                    </PricingCard>
                    <RightContainer>
                        <PricingHeader>Nuestros Planes</PricingHeader>
                        <VideoContainer>
                            <video autoPlay loop muted playsInline>
                                <source src={featureImage} type="video/webm" />
                                Tu navegador no soporta el video.
                            </video>
                        </VideoContainer>
                    </RightContainer>
                </PricingContent>
            </PricingSection>

            {showPopup && (
                <PopupContainer>
                    <PopupContent>
                        <p>Estamos trabajando en esta funcionalidad para ofrecerte el mejor servicio. ¡Gracias por tu paciencia!</p>
                        <CloseButton onClick={closePopup}>Cerrar</CloseButton>
                    </PopupContent>
                </PopupContainer>
            )}
        </div>
    );
};

export default Pricing;