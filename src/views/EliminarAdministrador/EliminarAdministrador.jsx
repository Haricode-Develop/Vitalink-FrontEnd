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
    ButtonCancel
} from '../EliminarAdministrador/EliminarAdministradorStyle';
import {API_BASE_URL} from "../../utils/config";
import ActivityFeed from "../../components/Feed/FeedActividad";
import { StyledModal } from "../../components/Modal"
const EliminarAdministrador = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [administradores, setAdministradores] = useState([]);
    const [filteredAdministradores, setFilteredAdministradores] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [motivo, setMotivo] = useState('');
    const {userData} = useContext(AuthContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };
    const transitions = useTransition(filteredAdministradores, {
        from: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        enter: item => async (next) => {
            await next({ opacity: 1, transform: 'translate3d(0,0px,0)' });
        },
        leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        keys: item => item.ID_USUARIO
    });
    const handleModalClose = () => {
        setIsModalOpen(false);
        setMotivo('');
    };
    useEffect(() => {
        axios.get(`${API_BASE_URL}/admin/todosLosAdministradores/${userData.id_empresa}`)
            .then((response) => {
                // Asegúrate de que la respuesta contiene los administradores y de que no hay errores.
                if (response.data && Array.isArray(response.data.administradores)) {
                    setAdministradores(response.data.administradores);
                    setFilteredAdministradores(response.data.administradores);
                } else {
                    // Manejar el caso en el que no se devuelvan datos como se espera
                    toast.error('No se recibieron datos de administradores.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error obteniendo administradores:', error);
                toast.error('Error al obtener administradores.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            });
    }, []);


    useEffect(() => {
        const filtered = administradores.filter(adm =>
            adm && adm.EMAIL &&
            (nombre === '' || adm.NOMBRE.toLowerCase().includes(nombre.toLowerCase())) &&
            (apellido === '' || adm.APELLIDO.toLowerCase().includes(apellido.toLowerCase())) &&
            (email === '' || adm.EMAIL.toLowerCase().includes(email.toLowerCase()))
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
                    // Aquí se utiliza selectedId para referirse al ID del administrador que se eliminará de la lista
                    setFilteredAdministradores(prev =>
                        prev.filter(admin => admin.ID_USUARIO !== selectedId)
                    );
                    // Opcionalmente podrías querer actualizar el estado de administradores también
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
                    <Input
                        placeholder="Buscar por nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <Input
                        placeholder="Buscar por apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    <Input
                        placeholder="Buscar por correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <AdminList>
                        {transitions((styles, item) => (
                            item && (
                                <animated.div style={styles}>
                                    <ListItem key={item.ID_USUARIO}>
                                        <AdminInfo>
                                            {item.NOMBRE} {item.APELLIDO} ({item.EMAIL})
                                        </AdminInfo>
                                        <SelectButton onClick={() => handleModalOpen(item.ID_USUARIO)}>Seleccionar</SelectButton>
                                    </ListItem>
                                </animated.div>
                            )
                        ))}
                    </AdminList>
                    <ActionButtons>
                        <Button onClick={handleDelete}>Eliminar Administrador</Button>
                    </ActionButtons>
                </FormColumn>
                <ActivityFeed idRol={'4'} idAccion={3} idInstitucion={userData.id_empresa} idEntidadAfectada={3}/>
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
