import React, { useState } from 'react';
import { FloatingLabel, FloatingInput, FloatingLabelGroup } from './FloatingLabelInputStyle';

const FloatingLabelInput = ({ label, value, onChange, type = 'text' }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <FloatingLabelGroup>
            <FloatingInput
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                isFocused={isFocused || value !== ''}
            />
            <FloatingLabel isFocused={isFocused || value !== ''}>{label}</FloatingLabel>
        </FloatingLabelGroup>
    );
};

export default FloatingLabelInput;
