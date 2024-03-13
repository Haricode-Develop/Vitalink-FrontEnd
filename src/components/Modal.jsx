import React from 'react';
import {
    ModalBackdrop,
    ModalWrapper
} from './ModalStyle';
import { useSpring } from 'react-spring';

export const StyledModal = ({ isOpen, onRequestClose, children, width, maxWidth, height, flexDirection, display }) => {
    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        config: {
            duration: 200,
        },
    });

    return isOpen ? (
        <ModalBackdrop onClick={onRequestClose}>
            <ModalWrapper
                style={animation}
                onClick={e => e.stopPropagation()}
                width={width}
                maxWidth={maxWidth}
                height={height}
                flexDirection={flexDirection}
                display={display}
            >
                {children}
            </ModalWrapper>
        </ModalBackdrop>
    ) : null;
};