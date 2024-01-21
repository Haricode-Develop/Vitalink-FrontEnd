import React from 'react';
import {
    PlansContainer,
    PlanCard,
    PlanHeader,
    PlanFeatures,
    FeatureItem,
    PlanPrice,
    SubscribeButton,
    PlanInfo,
    HeaderContainer,
    HeaderTitle,
    HeaderSubtitle,
    IndividualPlanDescription,
    IndividualPlanHeader,
    IndividualPlansContainer
} from './PlansPageStyle';
const plansDataIndividual = [
    {
        id: 1,
        name: 'Básico',
        price: '9.99',
        features: [
            'Acceso a todas las funcionalidades básicas',
            'Soporte por email',
            'Acceso a la comunidad'
        ]
    },
    {
        id: 2,
        name: 'Profesional',
        price: '19.99',
        features: [
            'Todo en Básico',
            'Reportes avanzados',
            'Soporte prioritario'
        ]
    },
    {
        id: 3,
        name: 'Empresarial',
        price: '29.99',
        features: [
            'Todo en Profesional',
            'API de integración',
            'Gestión de equipos'
        ]
    }
];
const plansData = [
    {
        id: 1,
        name: 'Básico',
        price: '9.99',
        features: [
            'Acceso a todas las funcionalidades básicas',
            'Soporte por email',
            'Acceso a la comunidad'
        ]
    },
    {
        id: 2,
        name: 'Profesional',
        price: '19.99',
        features: [
            'Todo en Básico',
            'Reportes avanzados',
            'Soporte prioritario'
        ]
    },
    {
        id: 3,
        name: 'Empresarial',
        price: '29.99',
        features: [
            'Todo en Profesional',
            'API de integración',
            'Gestión de equipos'
        ]
    }
];

const PlansPage = () => {
    return (
        <>
            <HeaderContainer>
                <HeaderTitle>Elige el plan que mejor se ajuste a ti</HeaderTitle>
                <HeaderSubtitle>Únete a nosotros y mejora la gestión con tus pacientes.</HeaderSubtitle>
            </HeaderContainer>
            <PlansContainer>
                {plansData.map((plan, index) => (
                    <PlanCard key={plan.id} active={index === 1}>
                        <h2>{plan.name}</h2>
                        <PlanPrice>${plan.price}/mes</PlanPrice>
                        <PlanFeatures>
                            {plan.features.map((feature, index) => (
                                <FeatureItem key={index}>{feature}</FeatureItem>
                            ))}
                        </PlanFeatures>
                        <SubscribeButton>Subscribirse</SubscribeButton>
                        <PlanInfo>1 mes gratis al comenzar. Cancela en cualquier momento.</PlanInfo>
                    </PlanCard>
                ))}
            </PlansContainer>
            <IndividualPlansContainer>
                <IndividualPlanHeader>Planes Individuales</IndividualPlanHeader>
                <IndividualPlanDescription>
                    Diseñados para profesionales independientes, estos planes ofrecen flexibilidad y herramientas personalizadas para potenciar la atención individualizada y mejorar la experiencia de tus pacientes.
                </IndividualPlanDescription>
                <PlansContainer>
                    {plansDataIndividual.map((plan, index) => (
                        <PlanCard key={plan.id} active={index === 1}>
                            <h2>{plan.name}</h2>
                            <PlanPrice>${plan.price}/mes</PlanPrice>
                            <PlanFeatures>
                                {plan.features.map((feature, index) => (
                                    <FeatureItem key={index}>{feature}</FeatureItem>
                                ))}
                            </PlanFeatures>
                            <SubscribeButton>Subscribirse</SubscribeButton>
                            <PlanInfo>1 mes gratis al comenzar. Cancela en cualquier momento.</PlanInfo>
                        </PlanCard>
                    ))}
                </PlansContainer>
            </IndividualPlansContainer>
        </>
    );
};

export default PlansPage;
