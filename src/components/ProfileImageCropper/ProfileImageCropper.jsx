import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { StyledModal } from '../Modal';
import { ButtonContainer, GuardarButton, CancelarButton } from './ProfileImageCropperStyle';

const ProfileImageCropper = ({ image, onClose, onSave }) => {
    const cropperRef = useRef(null);

    const handleSave = () => {
        const cropper = cropperRef.current.cropper;
        const croppedImage = cropper.getCroppedCanvas().toDataURL();
        onSave(croppedImage);
    };

    return (
        <StyledModal isOpen={!!image} onRequestClose={onClose}>
            <div style={{ textAlign: 'center' }}>
                <h2>Recorta tu imagen</h2>
                <Cropper
                    src={image}
                    style={{ height: 400, width: '100%' }}
                    aspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                    viewMode={1}
                    dragMode="move"
                    responsive
                    autoCropArea={1}
                />
                <ButtonContainer>
                    <GuardarButton onClick={handleSave}>Guardar</GuardarButton>
                    <CancelarButton onClick={onClose}>Cancelar</CancelarButton>
                </ButtonContainer>
            </div>
        </StyledModal>
    );
};

export default ProfileImageCropper;
