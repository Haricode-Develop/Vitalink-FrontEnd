import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
    Container,
    Content,
    Title,
    Input,
    FormColumn,
    FisioList,
    ListItem,
    FisioInfo,
    SelectButton,
    PacienteInfo,
    PacienteList,
    Label

} from './ReingresoPacienteStyle';



import {API_BASE_URL} from "../../utils/config";
import ActivityFeed from "../../components/Feed/FeedActividad";
import {StyledModal} from "../../components/Modal";

import {useTransition, animated} from "react-spring";
import {AuthContext} from "../../context/AuthContext";
import {DatePickerWrapper, EmailInput} from "../ActualizarAdministrador/ActualizarAdministradorStyle";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import {useSede} from "../../context/SedeContext";

const ReingresoPaciente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [pacientes, setPacientes] = useState([]);

    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [busquedaApellido, setBusquedaApellido] = useState('');
    const [busquedaEmail, setBusquedaEmail] = useState('');

    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());

    const [motivo, setMotivo] = useState('');
    const [pacientesDisponibles, setPacientesDisponibles] = useState(true);
    const { idSedeActual } = useSede();

    const {userData} = useContext(AuthContext);

    useEffect(() => {
        const cargarPacientesRetirados = async () => {
            try {
                if (idSedeActual) {
                    const response = await axios.get(`${API_BASE_URL}/paciente/todosLosPacientesRetirados/${idSedeActual}`);
                    if (response.data && Array.isArray(response.data.pacientes)) {
                        setPacientes(response.data.pacientes);
                        setFilteredPacientes(response.data.pacientes);
                        setPacientesDisponibles(true);
                    } else {
                        setPacientesDisponibles(false);
                    }
                }

            } catch (error) {

                setPacientesDisponibles(false);
            }
        };

        cargarPacientesRetirados();
    }, [idSedeActual, busquedaNombre, busquedaApellido, busquedaEmail]);

    useEffect(() => {
        const filtered = pacientes.filter(paciente =>
            paciente && paciente.EMAIL &&
            (busquedaNombre === '' || paciente.NOMBRE.toLowerCase().includes(busquedaNombre.toLowerCase())) &&
            (busquedaApellido === '' || paciente.APELLIDO.toLowerCase().includes(busquedaApellido.toLowerCase())) &&
            (busquedaEmail === '' || paciente.EMAIL.toLowerCase().includes(busquedaEmail.toLowerCase()))
        );
        setFilteredPacientes(filtered);
    }, [busquedaNombre, busquedaApellido, busquedaEmail, pacientes]);
    const handleModalClose = () => {
        setNombre('');
        setApellido('');
        setFechaNacimiento(new Date());
        setEmail('');
        setSelectedId(null);
    };
    const handleModalOpen = (id) => {
        const PacientesSeleccionado = pacientes.find(fisio => fisio.ID_USUARIO === id);
        if(PacientesSeleccionado){
            setNombre(PacientesSeleccionado.NOMBRE);
            setApellido(PacientesSeleccionado.APELLIDO);
            const fecha = new Date(PacientesSeleccionado.FECHA_DE_NACIMIENTO);
            setFechaNacimiento(fecha);
            setEmail(PacientesSeleccionado.EMAIL);
        }
        setSelectedId(id);

        Swal.fire({
            title: '¿Deseas reingresar el usuario seleccionado?',
            input: 'textarea',
            inputLabel: 'Motivo del Reingreso',
            inputPlaceholder: 'Ingresa el motivo del reingreso...',
            inputAttributes: {
                'aria-label': 'Ingresa el motivo del reingreso'
            },
            showCancelButton: true,
            confirmButtonColor: '#072B4A',
            cancelButtonColor: '#FF5465',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                setMotivo(result.value);
            }
        });
    };


    const transitions = useTransition(filteredPacientes, {

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
        axios.post(`${API_BASE_URL}/paciente/reingresoPaciente/${selectedId}`, fisioData)
            .then(() =>{
                toast.success("Fisioterapeuta reingreso exitosamente", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });

                const ReingresoFisio = pacientes.map(fisio => {
                    if(fisio.ID_USUARIO === selectedId){
                        return{...fisio, NOMBRE: nombre, APELLIDO: apellido, FECHA_NACIMIENTO: fechaNacimiento, EMAIL: email};
                    }
                    return fisio;
                });

                setPacientes(ReingresoFisio);
                setFilteredPacientes(ReingresoFisio.filter(paciente =>
                    paciente.EMAIL &&
                    (nombre === '' || paciente.NOMBRE.toLowerCase().includes(nombre.toLowerCase())) &&
                    (apellido === '' || paciente.APELLIDO.toLowerCase().includes(apellido.toLowerCase())) &&
                    (email === '' || paciente.EMAIL.toLowerCase().includes(email.toLowerCase()))

                ));
                handleModalClose();
            }).catch((error) => {
            console.error('Error actualizando paciente:', error);
            toast.error('Error al actualizar paciente.', {
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
                <FormColumn className={"pacienteReingreso"}>
                    <Title>Reingreso Paciente</Title>
                    <Label>Buscar por nombre: </Label>
                    <Input value={busquedaNombre} onChange={(e) => setBusquedaNombre(e.target.value)} />
                    <Label>Buscar por apellido: </Label>
                    <Input value={busquedaApellido} onChange={(e) => setBusquedaApellido(e.target.value)} />
                    <Label>Buscar por correo electrónico: </Label>
                    <Input value={busquedaEmail} onChange={(e) => setBusquedaEmail(e.target.value)} />
                    <PacienteList>
                        {pacientesDisponibles  && transitions((styles, item) => (
                            item && (
                                <animated.div style={styles}>
                                    <ListItem key={item.ID_USUARIO}>
                                        <PacienteInfo>
                                            {item.NOMBRE} {item.APELLIDO} ({item.EMAIL})
                                        </PacienteInfo>
                                        <SelectButton onClick={() => handleModalOpen(item.ID_USUARIO)}>Seleccionar</SelectButton>
                                    </ListItem>
                                </animated.div>

                            )
                        ))}
                        {!pacientesDisponibles && (
                            <div>No se encontraron pacientes</div>
                        )}
                    </PacienteList>

                </FormColumn>
                <ActivityFeed idRol={'4, 3'} idAccion={4} idInstitucion={userData.id_institucion} idEntidadAfectada={1} className={"FeedActividades"}/>
            </Content>

        </Container>
    );
};

export default ReingresoPaciente;
