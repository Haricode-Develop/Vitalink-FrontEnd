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
    TextArea
} from './ReingresoFisioStyle';



import {API_BASE_URL} from "../../utils/config";
import ActivityFeed from "../../components/Feed/FeedActividad";
import {StyledModal} from "../../components/Modal";

import {useTransition, animated} from "react-spring";
import {AuthContext} from "../../context/AuthContext";
import {DatePickerWrapper, EmailInput} from "../ActualizarAdministrador/ActualizarAdministradorStyle";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';

    const ReingresoFisio = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [fisios, setFisios] = useState([]);

    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [busquedaApellido, setBusquedaApellido] = useState('');
    const [busquedaEmail, setBusquedaEmail] = useState('');

    const [filteredFisios, setFilteredFisios] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());

    const [motivo, setMotivo] = useState('');
    const {userData} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/fisio/todosLosFisiosRetirados/${userData.id_empresa}`)
            .then((response) => {
                if(response.data && Array.isArray(response.data.fisios)){
                    setFisios(response.data.fisios);
                    setFilteredFisios(response.data.fisios);
                }else{
                    toast.error('No se recibieron datos de fisioterapeutas.', {
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
        const filtered = fisios.filter(fisio =>
            fisio && fisio.EMAIL &&
            (busquedaNombre === '' || fisio.NOMBRE.toLowerCase().includes(busquedaNombre.toLowerCase())) &&
            (busquedaApellido === '' || fisio.APELLIDO.toLowerCase().includes(busquedaApellido.toLowerCase())) &&
            (busquedaEmail === '' || fisio.EMAIL.toLowerCase().includes(busquedaEmail.toLowerCase()))
        );
        setFilteredFisios(filtered);
    }, [busquedaNombre, busquedaApellido, busquedaEmail, fisios]);
    const handleModalClose = () => {
        setNombre('');
        setApellido('');
        setFechaNacimiento(new Date());
        setEmail('');
        setSelectedId(null);
    };
        const handleModalOpen = (id) => {
            const fisioSeleccionado = fisios.find(fisio => fisio.ID_USUARIO === id);
            if(fisioSeleccionado){
                setNombre(fisioSeleccionado.NOMBRE);
                setApellido(fisioSeleccionado.APELLIDO);
                const fecha = new Date(fisioSeleccionado.FECHA_DE_NACIMIENTO);
                setFechaNacimiento(fecha);
                setEmail(fisioSeleccionado.EMAIL);
            }
            setSelectedId(id);

            // Muestra el SweetAlert para ingresar motivo del reingreso
            Swal.fire({
                title: '¿Deseas reingresar el usuario seleccionado?',
                input: 'textarea',
                inputLabel: 'Motivo del Reingreso',
                inputPlaceholder: 'Ingresa el motivo del reingreso...',
                inputAttributes: {
                    'aria-label': 'Ingresa el motivo del reingreso'
                },
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    setMotivo(result.value);
                }
            });
        };


        const transitions = useTransition(filteredFisios, {

        from: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        enter: item => async (next) => {
            await next({ opacity: 1, transform: 'translate3d(0,0px,0)' });
        },
        leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        keys: item => item.ID_USUARIO
    });
        useEffect(() => {
            if (motivo && selectedId) {
                handleReingreso(motivo);
            }
        }, [motivo, selectedId]);
        const handleReingreso = (motivoReingreso) => {

            if (!motivoReingreso) {
                toast.warn('Debe de ingresar el motivo', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
                return;
            }
            const fisioData = {
                motivo: motivoReingreso,
                idUsuarioEdita: userData.id_usuario
            };
        axios.post(`${API_BASE_URL}/fisio/reingresoFisioterapeuta/${selectedId}`, fisioData)
            .then(() =>{
                toast.success("Fisioterapeuta reingreso exitosamente", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });

                const ReingresoFisio = fisios.map(fisio => {
                    if(fisio.ID_USUARIO === selectedId){
                        return{...fisio, NOMBRE: nombre, APELLIDO: apellido, FECHA_NACIMIENTO: fechaNacimiento, EMAIL: email};
                    }
                    return fisio;
                });

                setFisios(ReingresoFisio);
                setFilteredFisios(ReingresoFisio.filter(fisio =>
                    fisio.EMAIL &&
                    (nombre === '' || fisio.NOMBRE.toLowerCase().includes(nombre.toLowerCase())) &&
                    (apellido === '' || fisio.APELLIDO.toLowerCase().includes(apellido.toLowerCase())) &&
                    (email === '' || fisio.EMAIL.toLowerCase().includes(email.toLowerCase()))

                ));
                handleModalClose();
            }).catch((error) => {
            console.error('Error actualizando fisioterapeuta:', error);
            toast.error('Error al actualizar administrador.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
        });
    }


    return (
        <Container>
            <Content>
                <ToastContainer />
                <FormColumn className={"fisioterapeutaReingreso"}>
                    <Title>Reingreso Fisioterapeuta</Title>
                    <Input placeholder="Buscar por nombre" value={busquedaNombre} onChange={(e) => setBusquedaNombre(e.target.value)} />
                    <Input placeholder="Buscar por apellido" value={busquedaApellido} onChange={(e) => setBusquedaApellido(e.target.value)} />
                    <Input placeholder="Buscar por correo electrónico" value={busquedaEmail} onChange={(e) => setBusquedaEmail(e.target.value)} />
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

                </FormColumn>
                <ActivityFeed idRol={'4, 3'} idAccion={4} idInstitucion={userData.id_empresa} idEntidadAfectada={2} className={"FeedActividades"}/>
            </Content>

        </Container>
    );
};

export default ReingresoFisio;
