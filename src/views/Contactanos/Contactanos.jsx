import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';
import {
    ContactSection,
    ContactHeader,
    ContactContent,
    ContactForm,
    FormField,
    FormLabel,
    FormInput,
    FormTextarea,
    FormButton,
    SVGContainer,
    VideoContainer
} from './ContactanosStyle';
import contactVideo from '../../assets/homePage/3.webm';

const Contactanos = () => {
    return (
        <div>
            <Helmet>
                <title>Contáctanos - Vitalink</title>
                <meta name="description" content="Ponte en contacto con el equipo de Vitalink para cualquier consulta o información adicional." />
            </Helmet>
            <Navbar />
            <ContactSection>
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
                <ContactHeader>Contáctanos</ContactHeader>
                <ContactContent>
                    <ContactForm>
                        <FormField>
                            <FormLabel>Nombre</FormLabel>
                            <FormInput type="text" name="name" placeholder="Tu nombre" />
                        </FormField>
                        <FormField>
                            <FormLabel>Email</FormLabel>
                            <FormInput type="email" name="email" placeholder="Tu email" />
                        </FormField>
                        <FormField>
                            <FormLabel>Mensaje</FormLabel>
                            <FormTextarea name="message" rows="4" placeholder="Tu mensaje" />
                        </FormField>
                        <FormButton type="submit">Enviar</FormButton>
                    </ContactForm>
                    <VideoContainer>
                        <video autoPlay loop muted playsInline>
                            <source src={contactVideo} type="video/webm" />
                            Tu navegador no soporta el video.
                        </video>
                    </VideoContainer>
                </ContactContent>
            </ContactSection>
        </div>
    );
};

export default Contactanos;