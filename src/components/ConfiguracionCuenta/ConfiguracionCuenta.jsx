import React, { useState, useEffect, useContext, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {
    ConfiguracionCuentaWrapper,
    ConfiguracionCuentaInput,
    FileUploadWrapper,
    DropZone,
    DropZoneLabel,
    DropZoneText,
    ProfilePictureWrapper,
    ProfilePicturePreview,
    ButtonContainer,
    GuardarButton,
    CancelarButton
} from './ConfiguracionCuentaStyle';
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from "../../utils/config";
import { FaFilePdf, FaTrashAlt } from 'react-icons/fa';
import { StyledModal } from '../Modal';
import { SidebarContext } from "../../context/SidebarContext";
import {base64ToBlob} from "../../utils/general";
const ConfiguracionCuenta = () => {
    const { userData } = useContext(AuthContext);
    const { sidebarState, updateProfileImageUrl } = useContext(SidebarContext);
    const [profileData, setProfileData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        fotoPerfil: null,
        archivos: [],
        fotoPerfilUrl: null,
        fotoPerfilId: null,
    });
    const [dragging, setDragging] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // Nueva variable para almacenar la imagen seleccionada
    const [isCropperOpen, setIsCropperOpen] = useState(false); // Estado para abrir el recorte de imagen

    const fileInputRef = useRef(null);
    const profileInputRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/configuraciones/cuenta/${userData.id_usuario}`);

                if (response.data.success) {
                    const { nombre, apellido, correo, telefono, fotoPerfilUrl, fotoPerfilId, titulos } = response.data.data;

                    setProfileData(prevState => ({
                        ...prevState,
                        nombre: nombre || '',
                        apellido: apellido || '',
                        correo: correo || '',
                        telefono: telefono || '',
                        fotoPerfilUrl: fotoPerfilUrl || null,
                        fotoPerfilId: fotoPerfilId || null,
                        archivos: titulos || []
                    }));
                    if (fotoPerfilUrl) {
                        updateProfileImageUrl(fotoPerfilUrl);
                    }
                }
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
                toast.error('Error al cargar los datos del usuario');
            }
        };

        if (userData?.id_usuario) {
            fetchUserData();
        }
    }, [userData.id_usuario]);

    const handleProfileInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setProfileData({ ...profileData, archivos: files });
    };

    // Nueva función para manejar la carga y abrir el Cropper
    const handleFotoPerfilUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                setIsCropperOpen(true); // Abre el recortador de imagen
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveCroppedImage = async (croppedImage) => {
        setIsCropperOpen(false);

        // Convertir la imagen base64 en un Blob
        const contentType = 'image/png';
        const blob = base64ToBlob(croppedImage, contentType);

        const formData = new FormData();
        formData.append('fotoPerfil', blob, 'fotoPerfil.png');
        formData.append('id_usuario', userData.id_usuario);

        try {
            const response = await axios.post(`${API_BASE_URL}/configuraciones/cuenta/subir-fotoPerfil`, formData);
            if (response.data.success) {
                setProfileData({ ...profileData, fotoPerfilUrl: response.data.fotoPerfilUrl });
                updateProfileImageUrl(response.data.fotoPerfilUrl);
                toast.success('Imagen de perfil actualizada correctamente');
            } else {
                toast.error('Error al actualizar la imagen de perfil');
            }
        } catch (error) {
            toast.error('Error al subir la imagen');
        }
    };


    const handleDeleteFotoPerfil = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/configuraciones/cuenta/${userData.id_usuario}/fotoPerfil`);
            if (response.data.success) {
                setProfileData(prevState => ({
                    ...prevState,
                    fotoPerfilUrl: null,
                    fotoPerfilId: null,
                }));
                updateProfileImageUrl(null);
                toast.success('Foto de perfil eliminada correctamente');
            } else {
                toast.error('No se pudo eliminar la foto de perfil');
            }
        } catch (error) {
            console.error('Error al eliminar la foto de perfil:', error);
            toast.error('Error al eliminar la foto de perfil');
        }
    };

    const handleDeletePdf = async (idTitulo) => {
        if (!idTitulo) {
            toast.error('ID del título no válido');
            return;
        }

        try {
            const response = await axios.delete(`${API_BASE_URL}/configuraciones/cuenta/${userData.id_usuario}/titulos/${idTitulo}`);
            if (response.data.success) {
                setProfileData(prevState => ({
                    ...prevState,
                    archivos: prevState.archivos.filter(archivo => archivo.idTitulo !== idTitulo),
                }));
                toast.success('Título eliminado correctamente');
            }
        } catch (error) {
            console.error('Error al eliminar el título:', error);
            toast.error('Error al eliminar el título');
        }
    };

    const handleSaveConfig = async () => {
        const formData = new FormData();
        formData.append('nombre', profileData.nombre);
        formData.append('apellido', profileData.apellido);
        formData.append('correo', profileData.correo);
        formData.append('telefono', profileData.telefono);
        formData.append('id_usuario', userData.id_usuario);

        profileData.archivos.forEach((file) => {
            formData.append('titulos', file);
        });

        try {
            const response = await axios.post(`${API_BASE_URL}/configuraciones/cuenta`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success('Configuración actualizada correctamente');
            } else {
                toast.error('Error al actualizar la configuración');
            }
        } catch (error) {
            console.error('Error al actualizar la configuración:', error);
            toast.error('Error al actualizar la configuración');
        }
    };

    const handleCancelSubscription = () => {
        toast.warn('Suscripción cancelada.');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setProfileData({ ...profileData, archivos: files });
        setDragging(false);
    };

    const handleDropZoneClick = () => {
        fileInputRef.current.click();
    };

    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };

    const handlePdfClick = (url) => {
        setSelectedPdf(url);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPdf('');
    };

    return (
        <ConfiguracionCuentaWrapper>
            {/* Foto de perfil */}
            <FileUploadWrapper>
                <label>Foto de Perfil</label>
                <ProfilePictureWrapper>
                    <ConfiguracionCuentaInput
                        type="file"
                        accept="image/*"
                        onChange={handleFotoPerfilUpload}
                        ref={profileInputRef}
                        style={{ display: 'none' }}
                    />
                    {profileData.fotoPerfilUrl || sidebarState.profileImageUrl ? (
                        <>
                            <ProfilePicturePreview
                                src={profileData.fotoPerfilUrl || sidebarState.profileImageUrl}
                                alt="Foto de Perfil"
                                onClick={() => profileInputRef.current.click()}
                                style={{ cursor: 'pointer' }}
                            />
                            <button
                                onClick={handleDeleteFotoPerfil}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    marginTop: '10px'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                <FaTrashAlt size={20} color="#FF4D4F" />
                            </button>
                        </>
                    ) : (
                        <ProfilePicturePreview as="div" onClick={() => profileInputRef.current.click()}>
                            Seleccionar Foto
                        </ProfilePicturePreview>
                    )}
                </ProfilePictureWrapper>

            </FileUploadWrapper>

            {/* Inputs de perfil */}
            <div>
                <label>Nombre</label>
                <ConfiguracionCuentaInput
                    type="text"
                    name="nombre"
                    value={profileData.nombre}
                    onChange={handleProfileInputChange}
                />
            </div>
            <div>
                <label>Apellido</label>
                <ConfiguracionCuentaInput
                    type="text"
                    name="apellido"
                    value={profileData.apellido}
                    onChange={handleProfileInputChange}
                />
            </div>
            <div>
                <label>Correo</label>
                <ConfiguracionCuentaInput
                    type="email"
                    name="correo"
                    value={profileData.correo}
                    onChange={handleProfileInputChange}
                />
            </div>
            <div>
                <label>Número de Teléfono</label>
                <ConfiguracionCuentaInput
                    type="tel"
                    name="telefono"
                    value={profileData.telefono}
                    onChange={handleProfileInputChange}
                />
            </div>

            {/* Zona para subir archivos */}
            <FileUploadWrapper>
                <DropZone
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleDropZoneClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    dragging={dragging}
                    hovering={hovering}
                >
                    <DropZoneLabel>Subir Títulos</DropZoneLabel>
                    <DropZoneText>{dragging ? "Suelta los archivos aquí" : "Arrastra y suelta los archivos aquí o haz clic para seleccionar"}</DropZoneText>
                    <ConfiguracionCuentaInput
                        type="file"
                        name="archivos"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </DropZone>
                {profileData.archivos.length > 0 && (
                    <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <h3>Títulos Subidos</h3>
                        <ul style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px',
                            justifyContent: 'center'
                        }}>
                            {profileData.archivos.map((archivo, index) => (
                                <li key={index} style={{ listStyleType: 'none', textAlign: 'center', flex: '1 0 150px' }}>
                                    <FaFilePdf size={40} color="red" />
                                    <p style={{ fontSize: '0.9rem' }}>{archivo.nombreTitulo}</p>
                                    <button
                                        onClick={() => handleDeletePdf(archivo.idTitulo)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '5px',
                                            transition: 'transform 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        <FaTrashAlt size={20} color="#FF4D4F" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </FileUploadWrapper>

            {/* Modal para vista de PDF */}
            <StyledModal isOpen={modalOpen} onRequestClose={handleCloseModal} width="80%" height="80%">
                <iframe src={selectedPdf} width="100%" height="100%" title="Vista previa del PDF"></iframe>
            </StyledModal>

            {/* Cropper Modal */}
            {isCropperOpen && (
                <StyledModal isOpen={isCropperOpen} onRequestClose={() => setIsCropperOpen(false)} width="80%" height="80%">
                    <div style={{ textAlign: 'center' }}>
                        <h2>Recorta tu imagen</h2>
                        <Cropper
                            src={selectedImage}
                            style={{ height: 400, width: '100%' }}
                            aspectRatio={1}
                            guides={false}
                            ref={profileInputRef}
                            viewMode={1}
                            dragMode="move"
                            responsive
                            autoCropArea={1}
                        />
                        <ButtonContainer>
                            <GuardarButton onClick={() => handleSaveCroppedImage(profileInputRef.current.cropper.getCroppedCanvas().toDataURL())}>
                                Guardar
                            </GuardarButton>
                            <CancelarButton onClick={() => setIsCropperOpen(false)}>
                                Cancelar
                            </CancelarButton>
                        </ButtonContainer>
                    </div>
                </StyledModal>
            )}

            {/* Botones de Guardar y Cancelar */}
            <ButtonContainer>
                <GuardarButton onClick={handleSaveConfig}>
                    Guardar Configuración
                </GuardarButton>
                {/*
    <CancelarButton onClick={handleCancelSubscription}>
        Cancelar Suscripción
    </CancelarButton>
    */}
            </ButtonContainer>
        </ConfiguracionCuentaWrapper>
    );
};

export default ConfiguracionCuenta;
