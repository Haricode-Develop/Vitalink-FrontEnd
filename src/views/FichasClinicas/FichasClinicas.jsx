import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PatientList from '../../components/PatientList/PatientList';
import { StyledModal } from '../../components/Modal';
import { FaSearchPlus, FaSearchMinus, FaDownload } from 'react-icons/fa'; // Importar iconos
import {
    PdfViewer,
    PdfControls,
    DownloadButton,
    ZoomButton,
    PdfContainer,
    LoaderSpinner, // Nuevo componente para mostrar el spinner
    LoaderContainer,
    FichaClinicaContainer, // Contenedor principal
    Title // Título del componente
} from './FichasClinicasStyle';
import { API_BASE_URL } from "../../utils/config";

const FichaClinica = () => {
    const [patients, setPatients] = useState([]); // Estado para la lista de pacientes
    const [filteredPatients, setFilteredPatients] = useState([]); // Estado para los pacientes filtrados
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [zoomLevel, setZoomLevel] = useState(1);
    const pdfRef = useRef(null); // Referencia para el iframe del PDF
    const [loading, setLoading] = useState(false); // Estado de carga

    useEffect(() => {
        // Cargar la lista de pacientes al montar el componente
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/fichasClinicas/fichas/pacientes`);
                if (response.data.success) {
                    setPatients(response.data.patients);
                    setFilteredPatients(response.data.patients); // Inicialmente, muestra todos los pacientes
                }
            } catch (error) {
                console.error('Error al obtener la lista de pacientes:', error);
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
        // Filtrar pacientes basado en el término de búsqueda
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            setFilteredPatients(
                patients.filter((patient) => {
                    const fullName = `${patient.nombre || ''} ${patient.apellido || ''}`.toLowerCase();
                    const email = patient.email ? patient.email.toLowerCase() : '';
                    return fullName.includes(lowercasedTerm) || email.includes(lowercasedTerm);
                })
            );
        } else {
            setFilteredPatients(patients); // Mostrar todos si no hay término de búsqueda
        }
    }, [searchTerm, patients]);

    const handleSelectPatient = async (patient) => {
        try {
            setLoading(true); // Iniciar la carga
            const response = await axios.get(`${API_BASE_URL}/fichasClinicas/ficha/fichaCliente/${patient.idUsuario}`);
            if (response.data.success) {
                setPdfUrl(response.data.signedUrl);
                setSelectedPatient(patient);
                setIsModalOpen(true);
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Sin Ficha',
                    text: 'Este paciente no tiene ficha médica disponible.',
                });
            }
        } catch (error) {
            console.error('Error al obtener el enlace del PDF:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al intentar obtener la ficha médica.',
            });
        } finally {
            setLoading(false); // Finalizar la carga
        }
    };

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => prevZoom + 0.1);
    };

    const handleZoomOut = () => {
        if (zoomLevel > 0.1) {
            setZoomLevel((prevZoom) => prevZoom - 0.1);
        }
    };

    const handleDownloadPdf = async () => {
        if (selectedPatient) {
            try {
                setLoading(true); // Iniciar la carga
                // Request PDF content from backend
                const downloadUrl = `${API_BASE_URL}/fichasClinicas/ficha/download/${selectedPatient.uuid}`;
                const response = await axios.get(downloadUrl, { responseType: 'blob' });

                // Create a URL for the blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `ficha_${selectedPatient.nombre || 'desconocido'}_${selectedPatient.apellido || 'desconocido'}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Revoke the URL object to free up memory
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error al descargar el PDF:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de descarga',
                    text: 'Hubo un problema al intentar descargar el PDF.',
                });
            } finally {
                setLoading(false); // Finalizar la carga
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPdfUrl('');
        setSelectedPatient(null);  // Limpiar el paciente seleccionado
        setZoomLevel(1);  // Restablecer el zoom al cerrar el modal
    };

    return (
        <FichaClinicaContainer> {/* Aplicar padding al contenedor */}
            <Title>Fichas Clínicas</Title> {/* Título agregado */}

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '20px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />

            <PatientList patients={filteredPatients} onSelectPatient={handleSelectPatient} />

            <StyledModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                width="90%"
                maxWidth="1000px"
                height="80%"
            >
                <PdfContainer>
                    {loading && ( // Mostrar spinner mientras se carga el PDF
                        <LoaderContainer>
                            <LoaderSpinner />
                        </LoaderContainer>
                    )}
                    {!loading && pdfUrl && (
                        <PdfViewer src={pdfUrl} style={{ transform: `scale(${zoomLevel})` }} ref={pdfRef} />
                    )}
                    <PdfControls>
                        <ZoomButton onClick={handleZoomIn}><FaSearchPlus /> Acercar</ZoomButton>
                        <ZoomButton onClick={handleZoomOut}><FaSearchMinus /> Alejar</ZoomButton>
                        <DownloadButton onClick={handleDownloadPdf}><FaDownload /> Descargar PDF</DownloadButton>
                    </PdfControls>
                </PdfContainer>
            </StyledModal>
        </FichaClinicaContainer>
    );
};

export default FichaClinica;
