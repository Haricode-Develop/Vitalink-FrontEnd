import React from 'react';
import { ModalBackdrop, ModalWrapper } from './ModalStyle';
import { useSpring } from 'react-spring';
import { FiX } from 'react-icons/fi';

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

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onRequestClose();
        }
    };

    return isOpen ? (
        <ModalBackdrop onClick={handleBackdropClick}>
            <ModalWrapper
                style={animation}
                onClick={(e) => e.stopPropagation()}
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
                            color: 'inherit',
                        }}
                    >
                        <FiX size={24} />
                    </button>
                    {children}
                </div>
            </ModalWrapper>
        </ModalBackdrop>
    ) : null;
};
