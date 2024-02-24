import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { ItemContainer, ItemTitle, ItemDescription, ItemPreview, ContentContainer, ItemCheckbox, customStyles, CloseButton } from './ExerciseItemStyle';

Modal.setAppElement('#root');

const ExerciseItem = ({ exercise, onAdd, selected }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const videoRef = useRef(null); // Referencia para el video de la miniatura

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    // Eventos para manejar el hover en la miniatura
    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <ItemContainer>
            {exercise.VIDEO_URL && (
                <ItemPreview
                    onMouseEnter={() => videoRef.current && videoRef.current.play()}
                    onMouseLeave={() => videoRef.current && videoRef.current.pause()}
                    onClick={toggleModal}
                >
                    <video
                        ref={videoRef}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={`${exercise.VIDEO_URL}#t=0.1`}

                        muted
                        loop
                        controls={false}
                    />
                </ItemPreview>
            )}
            <ContentContainer>
                <ItemTitle>{exercise.NombreEjercicio}</ItemTitle>
                <ItemDescription>{exercise.DESCRIPCION}</ItemDescription>
            </ContentContainer>
            <ItemCheckbox
                type="checkbox"
                checked={selected}
                onChange={() => onAdd(exercise.id)}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                style={customStyles}
                contentLabel="Video Modal"
            >
                <CloseButton onClick={toggleModal}>&times;</CloseButton>
                <video width="100%" controls autoPlay loop>
                    <source src={exercise.VIDEO_URL} type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>
            </Modal>
        </ItemContainer>
    );
};

export default ExerciseItem;
