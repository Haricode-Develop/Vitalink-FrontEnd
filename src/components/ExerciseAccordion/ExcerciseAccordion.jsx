import React, { useState } from 'react';
import { Accordion, AccordionHeader, AccordionContent, ExerciseItem, ExerciseCheckbox } from "./ExcerciseAccordionStyle";
import { animated, useSpring } from 'react-spring';

const ExerciseAccordion = ({ area, exercises, onSelectExercise, openExerciseModal  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const expand = useSpring({
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
    });
    const handleExerciseSelection = (exercise, isSelected) => {
        onSelectExercise(exercise, isSelected);
    };

    return (
        <Accordion>
            <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
                {area.nombre}
            </AccordionHeader>
            {isOpen && (
                <AccordionContent>
                    {/* Aquí simplemente listamos los ejercicios para información */}
                    {area.ejercicios.map((exercise) => (
                        <ExerciseItem key={exercise.id}>
                            <h4>{exercise.nombre}</h4>
                            <p>{exercise.descripcion}</p>
                        </ExerciseItem>
                    ))}
                </AccordionContent>
            )}
        </Accordion>
    );
};

export default ExerciseAccordion;
