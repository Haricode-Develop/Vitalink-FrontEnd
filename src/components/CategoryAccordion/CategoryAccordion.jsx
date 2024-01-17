import React, { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from './CategoryAccordionStyle';

const CategoryAccordion = ({ categories, onSelectCategory }) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleCategory = (categoryId) => {
        setActiveCategory(activeCategory === categoryId ? null : categoryId);
        onSelectCategory(categoryId);
    };

    return (
        <div>
            {categories.map((category) => (
                <Accordion key={category.ID_CATEGORIA_EJERCICIO}>
                    <AccordionHeader onClick={() => toggleCategory(category.ID_CATEGORIA_EJERCICIO)}>
                        {category.NOMBRE}
                    </AccordionHeader>
                    {activeCategory === category.ID_CATEGORIA_EJERCICIO && (
                        <AccordionBody>
                            {/* Render subcategories or any other content here */}
                        </AccordionBody>
                    )}
                </Accordion>
            ))}
        </div>
    );
};

export default CategoryAccordion;

