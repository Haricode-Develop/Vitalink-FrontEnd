import React, {useState, useEffect, useContext} from 'react';
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
    FisioList,
    ListItem,
    FisioInfo,
    SelectButton,
    ButtonCancel,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    TextArea,
    Label
} from './EliminarFisioStyle';



import {API_BASE_URL} from "../../utils/config";
import ActivityFeed from "../../components/Feed/FeedActividad";
import {StyledModal} from "../../components/Modal";

import {useTransition, animated} from "react-spring";
import {AuthContext} from "../../context/AuthContext";

const EliminarFisio = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [fisios, setFisios] = useState([]);
    const [filteredFisios, setFilteredFisios] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [motivo, setMotivo] = useState('');
    const {userData} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/fisio/todosLosFisios/${userData.id_empresa}`)
            .then((response) => {
                if(response.data && Array.isArray(response.data.fisios)){
                    setFisios(response.data.fisios);
                    setFilteredFisios(response.data.fisios);
                    console.log("FILTERED FISIOS: ", filteredFisios);
                }else{
                    toast.error('No se recibieron datos de fisioterapeutas.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                }

            })
            .catch((error) => {
                console.error('Error obteniendo fisioterapeutas:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = fisios.filter(fisio =>
            fisio && fisio.EMAIL &&
            (nombre === '' || fisio.NOMBRE.toLowerCase().includes(nombre.toLowerCase())) &&
            (apellido === '' || fisio.APELLIDO.toLowerCase().includes(apellido.toLowerCase())) &&
            (email === '' || fisio.EMAIL.toLowerCase().includes(email.toLowerCase()))
        );
        setFilteredFisios(filtered);
    }, [nombre, apellido, email, fisios]);
    const handleModalClose = () => {
        setIsModalOpen(false);
        setMotivo('');
    };
    const handleModalOpen = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };
    const transitions = useTransition(filteredFisios, {

        from: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        enter: item => async (next) => {
            await next({ opacity: 1, transform: 'translate3d(0,0px,0)' });
        },
        leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        keys: item => item.ID_USUARIO
    });
    const handleDelete = () => {
        if (!selectedId) {
            toast.warn('Por favor, selecciona un fisio para eliminar', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            return;
        }

        axios.delete(`${API_BASE_URL}/fisio/eliminarFisio/${selectedId}`,{ data: {
            userId: userData.id_usuario,
                motivo
            }
        })
            .then((response) => {
                if (response.data.success) {
                    toast.success('Fisio eliminado exitosamente', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });

                    setFilteredFisios(prev =>
                        prev.filter(admin => admin.ID_USUARIO !== selectedId)
                    );
                    setFisios(prev =>
                        prev.filter(admin => admin.ID_USUARIO !== selectedId)
                    );
                    setIsModalOpen(false);
                    setSelectedId(null);
                    setMotivo('');
                } else {
                    toast.error('Error al eliminar fisio', {
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
                console.error('Error eliminando fisio:', error);
            });
    };

    return (
        <Container>
            <Content>
                <ToastContainer />
                <FormColumn className={"fisioterapeutaEliminar"}>
                    <Title>Eliminar Fisioterapeuta</Title>
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
                    <FisioList>
                        {transitions((styles, item) => (
                            item && (
                                <animated.div style={styles}>
                                <ListItem key={item.ID_USUARIO}>
                                    <FisioInfo>
                                        {item.NOMBRE} {item.APELLIDO} ({item.EMAIL})
                                    </FisioInfo>
                                    <SelectButton onClick={() => handleModalOpen(item.ID_USUARIO)}>Seleccionar</SelectButton>
                                </ListItem>
                                </animated.div>
                            )
                        ))}
                    </FisioList>
                    <ActionButtons>
                        <Button onClick={handleDelete}>Eliminar Fisioterapeuta</Button>
                    </ActionButtons>
                </FormColumn>
                <ActivityFeed idRol={'4, 3'} idAccion={3} idInstitucion={userData.id_empresa} idEntidadAfectada={2} className={"FeedActividades"}/>
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

export default EliminarFisio;
