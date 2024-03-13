import React from 'react';
import { ModalBackdrop, ModalWrapper } from './ModalStyle';
import { useSpring } from 'react-spring';
import { FiX } from 'react-icons/fi'; // Importa el ícono FiX de react-icons

export const StyledModal = ({
                                isOpen,
                                onRequestClose,
                                children,
                                width,
                                maxWidth,
                                height,
                                flexDirection,
                                display
                            }) => {
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
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <button
                        onClick={onRequestClose}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'inherit', // Ajusta este color según tu tema
                        }}
                    >
                        <FiX size={24} /> {/* Puedes ajustar el tamaño si es necesario */}
                    </button>
                    {children}
                </div>
            </ModalWrapper>
        </ModalBackdrop>
    ) : null;
};
