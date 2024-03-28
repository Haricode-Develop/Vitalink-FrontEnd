import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useTransition, animated } from 'react-spring';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
    Container,
    Content,
    Title,
    Input,
    ActionButtons,
    Button,
    FormColumn,
    AdminList,
    ListItem,
    AdminInfo,
    SelectButton,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalFooter,
    TextArea,
    ButtonCancel,
    Label
} from '../EliminarAdministrador/EliminarAdministradorStyle';
import {API_BASE_URL} from "../../utils/config";
import ActivityFeed from "../../components/Feed/FeedActividad";
import { StyledModal } from "../../components/Modal"
import {useSede} from "../../context/SedeContext";
const EliminarAdministrador = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [administradores, setAdministradores] = useState([]);
    const [filteredAdministradores, setFilteredAdministradores] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [motivo, setMotivo] = useState('');
    const { idSedeActual } = useSede();
    const {userData} = useContext(AuthContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };
    const transitions = useTransition(filteredAdministradores, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        keys: item => item.ID_USUARIO
    });
    const handleModalClose = () => {
        setIsModalOpen(false);
        setMotivo('');
    };
    useEffect(() => {
        if (idSedeActual) {
            axios.get(`${API_BASE_URL}/admin/todosLosAdministradoresPorSede/${idSedeActual}`)
                .then((response) => {
                    if (response.data && Array.isArray(response.data.administradores)) {
                        setAdministradores(response.data.administradores);
                        setFilteredAdministradores(response.data.administradores);
                    } else {
                        toast.error('No se recibieron datos de administradores.', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            hideProgressBar: true,
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error obteniendo administradores:', error);
                });
        }
    }, [idSedeActual]);

    useEffect(() => {
        const filtered = administradores.filter(adm =>
            adm && adm.email &&
            (nombre === '' || adm.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
            (apellido === '' || adm.apellido.toLowerCase().includes(apellido.toLowerCase())) &&
            (email === '' || adm.email.toLowerCase().includes(email.toLowerCase()))
        );
        setFilteredAdministradores(filtered);
    }, [nombre, apellido, email, administradores]);

    const handleDelete = () => {
        if (!motivo) {
            toast.warn('Por favor, ingresa un motivo para la eliminación', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            return;
        }

        if (!selectedId) {
            toast.warn('Por favor, selecciona un administrador para eliminar', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            return;
        }

        axios.delete(`${API_BASE_URL}/admin/eliminarAdministrador/${selectedId}`, { data: {
                motivo: motivo,
                userId: userData.id_usuario
            } })
            .then((response) => {
                if (response.data.success) {
                    toast.success('Administrador eliminado exitosamente', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                    setFilteredAdministradores(prev =>
                        prev.filter(admin => admin.ID_USUARIO !== selectedId)
                    );
                    setAdministradores(prev =>
                        prev.filter(admin => admin.ID_USUARIO !== selectedId)
                    );
                    setIsModalOpen(false);
                    setSelectedId(null);
                    setMotivo('');
                } else {
                    toast.error('Error al eliminar administrador', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                    setIsModalOpen(false);
                    setSelectedId(null);
                    setMotivo('');
                }
            })
            .catch((error) => {
                console.error('Error eliminando administrador:', error);
            });

    };


    return (
        <Container>
            <Content>
                <ToastContainer />
                <FormColumn className={"administradorEliminar"}>
                    <Title>Eliminar Administrador</Title>
                    <Label>Buscar por nombre:</Label>
                    <Input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <Label>Buscar por apellido:</Label>
                    <Input
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    <Label>Buscar por correo electrónico:</Label>

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <AdminList>
                        {transitions((styles, item) => (
                            item && (
                                <animated.div style={styles} key={item.idUsuario}>
                                    <ListItem>
                                        <AdminInfo>
                                            {item.nombre} {item.apellido} ({item.email})
                                        </AdminInfo>
                                        <SelectButton onClick={() => handleModalOpen(item.idUsuario)}>Seleccionar</SelectButton>
                                    </ListItem>
                                </animated.div>
                            )
                        ))}
                    </AdminList>
                    <ActionButtons>
                        <Button onClick={handleDelete}>Eliminar Administrador</Button>
                    </ActionButtons>
                </FormColumn>
                <ActivityFeed idRol={'4'} idAccion={3} idInstitucion={userData.id_institucion} idEntidadAfectada={3}/>
            </Content>
            <StyledModal isOpen={isModalOpen} onRequestClose={handleModalClose}>
                <ModalContent>
                    <ModalHeader>
                        <h2>🗑️ Motivo de Eliminación</h2>
                    </ModalHeader>
                    <ModalBody>
                        <TextArea
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            placeholder="Describe el motivo de la eliminación"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <ButtonCancel onClick={handleDelete}>Confirmar Eliminación</ButtonCancel>
                        <ButtonCancel onClick={handleModalClose} cancelBtn>Cancelar</ButtonCancel>
                    </ModalFooter>
                </ModalContent>
            </StyledModal>
        </Container>
    );
};

export default EliminarAdministrador;
