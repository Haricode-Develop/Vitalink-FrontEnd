import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Accordion, AccordionHeader, AccordionContent, ExerciseItem } from "./ExcerciseAccordionStyle";

const ToggleableSection = ({ title, children, isOpen, setIsOpen }) => {
    const springProps = useSpring({
        to: {
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
        },
    });
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Accordion>
            <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
                {title}
            </AccordionHeader>
            <animated.div style={springProps}>
                <AccordionContent>
                    {children}
                </AccordionContent>
            </animated.div>
        </Accordion>
    );
};

const ExerciseAccordion = ({ exercisesGrouped }) => {
    const initialOpenSections = Object.keys(exercisesGrouped).reduce((acc, category) => {
        acc[category] = false;
        Object.keys(exercisesGrouped[category]).forEach((area) => {
            acc[`${category}->${area}`] = false;
            Object.keys(exercisesGrouped[category][area]).forEach((subArea) => {
                acc[`${category}->${area}->${subArea}`] = false;
            });
        });
        return acc;
    }, {});

    const [openSections, setOpenSections] = useState(initialOpenSections);

    const toggleSection = (path) => {
        setOpenSections(prevOpenSections => ({
            ...prevOpenSections,
            [path]: !prevOpenSections[path],
        }));
    };

    return (
        <>
            {Object.entries(exercisesGrouped).map(([categoria, areas]) => {
                return (
                    <ToggleableSection
                        key={categoria}
                        title={categoria}
                        isOpen={openSections[categoria]}
                        setIsOpen={() => toggleSection(categoria)}
                    >
                        {Object.entries(areas).map(([area, subareas]) => {
                            return (
                                <ToggleableSection
                                    key={area}
                                    title={area}
                                    isOpen={openSections[`${categoria}->${area}`]}
                                    setIsOpen={() => toggleSection(`${categoria}->${area}`)}
                                >
                                    {Object.entries(subareas).map(([subarea, ejercicios]) => {
                                        return (
                                            <ToggleableSection
                                                key={subarea}
                                                title={subarea}
                                                isOpen={openSections[`${categoria}->${area}->${subarea}`]}
                                                setIsOpen={() => toggleSection(`${categoria}->${area}->${subarea}`)}
                                            >
                                                {ejercicios.map(ejercicio => (
                                                    <ExerciseItem key={ejercicio.ID_EJERCICIO}>
                                                        {ejercicio.NombreEjercicio}: {ejercicio.DESCRIPCION}
                                                    </ExerciseItem>
                                                ))}
                                            </ToggleableSection>
                                        );
                                    })}
                                </ToggleableSection>
                            );
                        })}
                    </ToggleableSection>
                );
            })}
        </>
    );
};

export default ExerciseAccordion;
