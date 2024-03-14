// StyledModal.js
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ModalBackdrop, ModalWrapper, PdfContainer, ControlButton, CloseButton } from './ModalPdfStyle';
import { useSpring } from 'react-spring';
import { FaSearchMinus, FaSearchPlus, FaArrowLeft, FaArrowRight, FaDownload, FaTimes, FaRedo } from 'react-icons/fa';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const StyledModal = ({ isOpen, onRequestClose, pdfUrl, title }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const mobileScale = 0.6;
    const minScale = 0.3;
    const maxScale = 2.0;
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setTimeout(() => {
            setScale(1);
        }, 100);
    }

    useEffect(() => {
        if (isOpen) {
            setPageNumber(1);
            setScale(1.0);
        }
    }, [isOpen, pdfUrl]);


    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        config: { duration: 200 },
    });

    // Función para normalizar titulo de ficha que viene en formato "Alan Turing - 2023-12-31"
    const normalizeTitle = (title) => {
        const [patientName, dateTime] = title.split(' - ');
        const [date, time] = dateTime.split(' ');

        const [year, month, day] = date.split('-');
        const [hour, minute, second] = time.split(':');

        const formattedDateTime = `${day}${month}${year}${hour}${minute}${second}`;
        return `${patientName.replace(' ', '')}${formattedDateTime}`;
    }

    const handleZoomOut = () => {
        setScale(prevScale => Math.max(prevScale * 0.9, minScale));
    };

    const handleZoomIn = () => {
        setScale(prevScale => Math.min(prevScale / 0.9, maxScale));
    };


    const handleDownload = () => {
        // Utiliza 'fetch' si es necesario para obtener el PDF desde el backend
        fetch(pdfUrl)
            .then(response => response.blob())
            .then(blob => {
                // Crea una URL local para el blob descargado
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = blobUrl;
                link.setAttribute('download', normalizeTitle(title)+'.pdf');
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(blobUrl);
                link.remove();
            })
            .catch(() => alert('No se pudo descargar el archivo'));
    };
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            setScale(isMobile ? mobileScale : 1.0);
        };

        if (isOpen) {
            handleResize();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);
    return isOpen ? (
        <ModalBackdrop onClick={onRequestClose}>
            <ModalWrapper style={animation} onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onRequestClose}>
                    <FaTimes />
                </CloseButton>
                <h2>{title}</h2>
                <PdfContainer className="PdfContainer">
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) => console.error("Error cargando el archivo PDF:", error.message)}
                    >
                        <Page pageNumber={pageNumber} scale={scale || 1.0} />
                    </Document>
                </PdfContainer>

                <div>
                    <ControlButton onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
                        <FaArrowLeft />
                    </ControlButton>
                    <ControlButton onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
                        <FaArrowRight />
                    </ControlButton>
                    <ControlButton onClick={handleZoomOut}>
                        <FaSearchMinus />
                    </ControlButton>
                    <ControlButton onClick={handleZoomIn}>
                        <FaSearchPlus />
                    </ControlButton>
                    <ControlButton onClick={() => setScale(0.45)}>
                        <FaRedo />
                    </ControlButton>
                    <ControlButton onClick={handleDownload}>
                        <FaDownload />
                    </ControlButton>
                </div>

            </ModalWrapper>
        </ModalBackdrop>
    ) : null;
};

