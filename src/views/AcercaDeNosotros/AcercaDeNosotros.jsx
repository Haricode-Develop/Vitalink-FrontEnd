import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';
import { FaUserMd, FaCalendarCheck, FaMoneyCheckAlt, FaChartLine, FaFileExport, FaClipboardList, FaUserPlus, FaTachometerAlt } from 'react-icons/fa';
import {
    AboutSection,
    AboutHeader,
    AboutContent,
    AboutImage,
    MissionSection,
    MissionHeader,
    MissionContent,
    ObjectivesSection,
    ObjectivesHeader,
    ObjectiveList,
    ObjectiveCard,
    ObjectiveCardIcon,
    ObjectiveCardTitle,
    ObjectiveCardText,
    WhySection,
    WhyHeader,
    WhyContent,
    SVGContainer,
    VideoContainer,
    AdditionalInfoSection,
    AdditionalInfoContent,
    TextContainer,
    TeamVideo
} from './AcercaDeNosotrosStyle';
import mascotImage from '../../assets/homePage/mascot.png';
import mascotAnimation1 from '../../assets/homePage/1.webm';
import mascotAnimation2 from '../../assets/homePage/2.webm';

const objectives = [
    {
        icon: <FaUserMd size={50} />,
        title: 'Gestión Eficiente',
        text: 'Gestión eficiente de pacientes y médicos.'
    },
    {
        icon: <FaCalendarCheck size={50} />,
        title: 'Citas y Recordatorios',
        text: 'Agendar citas y enviar recordatorios automáticos.'
    },
    {
        icon: <FaMoneyCheckAlt size={50} />,
        title: 'Control Financiero',
        text: 'Control de ganancias y transacciones.'
    },
    {
        icon: <FaChartLine size={50} />,
        title: 'Estadísticas',
        text: 'Visualización de estadísticas y carga de trabajo.'
    },
    {
        icon: <FaFileExport size={50} />,
        title: 'Exportación',
        text: 'Exportación de estadísticas para análisis detallado.'
    },
    {
        icon: <FaClipboardList size={50} />,
        title: 'Gestión de Servicios',
        text: 'Gestión de servicios y paquetes personalizados.'
    },
    {
        icon: <FaUserPlus size={50} />,
        title: 'Ingreso de Pacientes',
        text: 'Ingreso y seguimiento de pacientes con fichas clínicas.'
    },
    {
        icon: <FaTachometerAlt size={50} />,
        title: 'Panel de Control',
        text: 'Panel de control con métricas diarias y filtradas.'
    },
];

const AcercaDeNosotros = () => {
    return (
        <div>
            <Helmet>
                <title>Acerca de Nosotros - Vitalink</title>
                <meta name="description" content="Conoce más sobre el equipo y la misión de Vitalink. Nuestra misión es simplificar el proceso de atención médica a través de tecnología avanzada." />
                <meta name="keywords" content="gestión médica, software médico, citas médicas, estadísticas médicas, control financiero, servicios médicos" />
                <meta name="author" content="Vitalink" />
                <meta property="og:title" content="Acerca de Nosotros - Vitalink" />
                <meta property="og:description" content="Conoce más sobre el equipo y la misión de Vitalink. Nuestra misión es simplificar el proceso de atención médica a través de tecnología avanzada." />
                <meta property="og:image" content={mascotImage} />
                <meta property="og:url" content="https://www.vitalink.com/about" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Vitalink",
                        "url": "https://www.vitalink.com",
                        "logo": mascotImage,
                        "description": "Vitalink se dedica a proporcionar soluciones innovadoras para la gestión de la atención médica. Nuestro equipo está compuesto por profesionales experimentados en tecnología y salud, comprometidos a mejorar la eficiencia y la calidad del servicio médico."
                    })}
                </script>
            </Helmet>
            <Navbar />
            <AboutSection>
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
                <AboutHeader>Acerca de Nosotros</AboutHeader>
                <AboutContent>
                    <AboutImage src={mascotImage} alt="Nuestra Mascota Vitalink" />
                    <MissionSection>
                        <MissionHeader>La Misión de Vitalink</MissionHeader>
                        <MissionContent>
                            <p>Nuestra misión es simplificar el proceso de atención médica a través de tecnología avanzada, permitiendo a los profesionales de la salud centrarse en lo que más importa: sus pacientes.</p>
                            <p>Con nuestro software, gestionamos pacientes, médicos, citas y servicios de manera eficiente, ofreciendo estadísticas personalizadas y herramientas de automatización para mejorar la gestión médica.</p>
                        </MissionContent>
                    </MissionSection>
                </AboutContent>
            </AboutSection>

            <ObjectivesSection>
                <SVGContainer>
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient3" x1="0" x2="1" y1="1" y2="0">
                                <stop stopColor="rgba(3, 114, 255, 1)" offset="0%"></stop>
                                <stop stopColor="rgba(151, 255, 228, 1)" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <path fill="url(#gradient3)" d="M25.5,-29.4C33.3,-29.4,40.1,-22.3,40.7,-14.6C41.4,-6.8,36,1.6,29.9,6.4C23.7,11.2,16.8,12.4,11.7,13.6C6.6,14.9,3.3,16.1,-2.2,19.1C-7.7,22.2,-15.5,27,-22.7,26.5C-30,26,-36.8,20.1,-39.8,12.5C-42.8,5,-41.9,-4.2,-37.4,-10.4C-32.9,-16.5,-24.8,-19.7,-17.9,-19.9C-11.1,-20.2,-5.5,-17.5,1.7,-19.8C8.8,-22.1,17.7,-29.3,25.5,-29.4Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" style={{ transition: 'all 0.3s ease 0s' }}></path>
                    </svg>
                </SVGContainer>
                <ObjectivesHeader>Objetivos</ObjectivesHeader>
                <ObjectiveList>
                    {objectives.map((objective, index) => (
                        <ObjectiveCard key={index}>
                            <ObjectiveCardIcon>{objective.icon}</ObjectiveCardIcon>
                            <ObjectiveCardTitle>{objective.title}</ObjectiveCardTitle>
                            <ObjectiveCardText>{objective.text}</ObjectiveCardText>
                        </ObjectiveCard>
                    ))}
                </ObjectiveList>
            </ObjectivesSection>

            <WhySection>
                <WhyHeader>¿Por qué Vitalink?</WhyHeader>
                <WhyContent>
                    <p>Vitalink ofrece una solución integral para la gestión médica, integrando tecnología avanzada para facilitar el trabajo de los profesionales de la salud. Nuestras principales ventajas incluyen:</p>
                    <ul>
                        <li>Automatización de recordatorios y reasignación de citas.</li>
                        <li>Notificaciones en vivo para mantener informados a los administradores.</li>
                        <li>Gestión completa de servicios médicos y paquetes.</li>
                        <li>Panel de control personalizable con estadísticas detalladas.</li>
                        <li>Ingreso y seguimiento de pacientes mediante fichas clínicas.</li>
                        <li>Exportación de datos en formato Excel para análisis avanzado.</li>
                    </ul>
                </WhyContent>
            </WhySection>

            <AdditionalInfoSection>
                <AdditionalInfoContent>
                    <h2>Información Adicional</h2>
                    <div>
                        <TextContainer>
                            <p>Vitalink se dedica a proporcionar soluciones innovadoras para la gestión de la atención médica. Nuestro equipo está compuesto por profesionales experimentados en tecnología y salud, comprometidos a mejorar la eficiencia y la calidad del servicio médico.</p>
                            <p>Nos esforzamos por mantenernos a la vanguardia de la tecnología médica, ofreciendo continuamente nuevas características y mejoras para satisfacer las necesidades cambiantes de nuestros usuarios. Desde recordatorios automáticos de citas hasta estadísticas detalladas, nuestro software está diseñado para facilitar la vida tanto a los profesionales de la salud como a los pacientes.</p>
                        </TextContainer>
                    </div>
                    <VideoContainer>
                        <TeamVideo autoPlay loop muted playsInline>
                            <source src={mascotAnimation1} type="video/webm" />
                            Tu navegador no soporta el video.
                        </TeamVideo>
                    </VideoContainer>
                </AdditionalInfoContent>
            </AdditionalInfoSection>
        </div>
    );
};

export default AcercaDeNosotros;