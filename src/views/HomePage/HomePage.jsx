import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import logo from '../../assets/homePage/logo.png';
import Navbar from '../../components/Navbar/Navbar';
import { useInView } from 'react-intersection-observer';
import {
    Hero,
    HeroContent,
    HeroImage,
    Features,
    FeatureList,
    FeatureItem,
    Testimonials,
    TestimonialItem,
    CTAButton,
    Banner,
    AnimatedBackground,
    IconBar
} from './HomePageStyle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroVideo from '../../assets/homePage/vitaHomePage.webm';
import { FaUser, FaMedkit, FaStethoscope, FaChartLine, FaUserMd, FaHeartbeat, FaSyringe, FaCalendarAlt, FaClock, FaChartBar } from 'react-icons/fa';

const HomePage = () => {
    const navigate = useNavigate();
    const { ref, inView } = useInView({ triggerOnce: true });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            }
        ],
        beforeChange: (current, next) => {
            const slides = document.querySelectorAll('.slick-slide');
            slides.forEach((slide) => {
                slide.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            });
        },
        afterChange: (current) => {
            const slides = document.querySelectorAll('.slick-slide');
            slides.forEach((slide, index) => {
                if (index === current) {
                    slide.style.transform = 'scale(1.05)';
                    slide.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                } else {
                    slide.style.transform = 'scale(1)';
                    slide.style.boxShadow = 'none';
                }
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Gestión Médica - Vitalink</title>
                <meta name="description" content="Descubre cómo nuestro software de gestión médica puede ayudarte a gestionar pacientes, doctores, citas y servicios de manera eficiente." />
                <meta name="keywords" content="gestión médica, software médico, citas médicas, administración de clínicas, salud, doctores, pacientes" />
                <meta property="og:title" content="Mejor Solución de Gestión Médica - Vitalink" />
                <meta property="og:description" content="Nuestro software te ayuda a gestionar pacientes, doctores, citas, servicios y más de manera eficiente." />
                <meta property="og:image" content={logo} />
                <meta property="og:url" content="https://www.vitalink.es/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Mejor Solución de Gestión Médica - Vitalink" />
                <meta name="twitter:description" content="Nuestro software te ayuda a gestionar pacientes, doctores, citas, servicios y más de manera eficiente." />
                <meta name="twitter:image" content={logo} />
                <link rel="canonical" href="https://www.vitalink.es/" />
                <script type="application/ld+json">
                    {`
                    {
                      "@context": "https://schema.org",
                      "@type": "SoftwareApplication",
                      "name": "Vitalink",
                      "url": "https://www.vitalink.es/",
                      "logo": "${logo}",
                      "description": "Nuestro software de gestión médica ayuda a gestionar pacientes, doctores, citas y servicios de manera eficiente.",
                      "applicationCategory": "MedicalApplication",
                      "operatingSystem": "All",
                      "offers": {
                        "@type": "Offer",
                        "price": "99.99",
                        "priceCurrency": "USD"
                      }
                    }
                    `}
                </script>
            </Helmet>
            <Navbar />
            <Hero>
                <HeroContent>
                    <h1>Gestión Médica Eficiente</h1>
                    <p>Simplifica la gestión de pacientes, doctores y citas con nuestro software avanzado.</p>
                    <CTAButton to="/pricing">Precios</CTAButton>
                </HeroContent>
                <HeroImage>
                    <video autoPlay muted playsInline>
                        <source src={heroVideo} type="video/webm" />
                        Tu navegador no soporta el video.
                    </video>
                </HeroImage>
                <IconBar>
                    <div>
                        <FaCalendarAlt size="2em" />
                        <span>Calendarización de Citas</span>
                    </div>
                    <div>
                        <FaChartBar size="2em" />
                        <span>Estadísticas Personalizadas</span>
                    </div>
                    <div>
                        <FaClock size="2em" />
                        <span>Administración Efectiva de Tiempo</span>
                    </div>
                </IconBar>
            </Hero>

            <Features>
                <h2>Características</h2>
                <FeatureList>
                    <FeatureItem>
                        <FaUser size="2em" />
                        <h3>Gestión de Pacientes</h3>
                        <p>Gestiona los registros de pacientes, citas e historial médico.</p>
                    </FeatureItem>
                    <FeatureItem>
                        <FaStethoscope size="2em" />
                        <h3>Gestión de Doctores</h3>
                        <p>Rastrea horarios de doctores, especialidades e información de contacto.</p>
                    </FeatureItem>
                    <FeatureItem>
                        <FaMedkit size="2em" />
                        <h3>Gestión de Servicios</h3>
                        <p>Controla y monitorea los servicios ofrecidos por tu institución.</p>
                    </FeatureItem>
                    <FeatureItem>
                        <FaChartLine size="2em" />
                        <h3>Seguimiento Financiero</h3>
                        <p>Calcula ganancias, transacciones y gestiona registros financieros.</p>
                    </FeatureItem>
                </FeatureList>
            </Features>
            <Banner ref={ref}>
                <AnimatedBackground inView={inView}>
                    <FaUserMd />
                    <FaHeartbeat />
                    <FaSyringe />
                    <FaStethoscope />
                    <FaUserMd />
                    <FaHeartbeat />
                    <FaSyringe />
                    <FaStethoscope />
                </AnimatedBackground>
                <h1>¡Salvemos vidas juntos con la mejor tecnología médica!</h1>
            </Banner>
            <Testimonials>
                <h2>Lo que Dicen Nuestros Clientes</h2>
                <Slider {...settings}>
                    <TestimonialItem>
                        <p>"Este software ha transformado cómo gestionamos nuestra institución médica."</p>
                        <h4>- Ernesto Ribaí</h4>
                    </TestimonialItem>
                    <TestimonialItem>
                        <p>"Altamente recomendable por su eficiencia y facilidad de uso."</p>
                        <h4>- Kenny Estuardo</h4>
                    </TestimonialItem>
                    <TestimonialItem>
                        <p>"Recomendaría ste software para cualquier institución médica."</p>
                        <h4>- Diego Ortiz</h4>
                    </TestimonialItem>
                </Slider>
            </Testimonials>
        </div>
    );
};

export default HomePage;