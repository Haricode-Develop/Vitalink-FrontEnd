import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import {
    Container, Content, Title, Input, ActionButtons, Button,
    FormColumn, AdminList, ListItem, AdminInfo, SelectButton,
    ModalContent, ModalBody, ModalHeader, ModalFooter, ButtonCancel,
    DateInput, EmailInput, DatePickerWrapper
} from './ActualizarAdministradorStyle';
import { API_BASE_URL } from "../../utils/config";
import ActivityFeed from "../../components/Feed/FeedActividad";
import { StyledModal } from "../../components/Modal";
import DatePicker from 'react-datepicker';
import {Label} from "../EliminarAdministrador/EliminarAdministradorStyle";
import {useSede} from "../../context/SedeContext";

const ActualizarAdministrador = () => {
    const { userData } = useContext(AuthContext);
    const [administradores, setAdministradores] = useState([]);
    const [filteredAdministradores, setFilteredAdministradores] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [busquedaApellido, setBusquedaApellido] = useState('');
    const [busquedaEmail, setBusquedaEmail] = useState('');

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [email, setEmail] = useState('');
    const { idSedeActual } = useSede(); // Utiliza el contexto de Sede para obtener la sede actual

    useEffect(() => {
        // Actualiza la petición para filtrar por sede
        if (idSedeActual) {
            axios.get(`${API_BASE_URL}/admin/todosLosAdministradoresPorSede/${idSedeActual}`, {
                params: {
                    nombre: busquedaNombre,
                    apellido: busquedaApellido,
                    email: busquedaEmail
                }
            })
                .then((response) => {
                    setAdministradores(response.data.administradores);
                })
                .catch((error) => {
                    console.error('Error obteniendo administradores:', error);
                    toast.error('Error al obtener administradores.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                });
        }
    }, [idSedeActual, busquedaNombre, busquedaApellido, busquedaEmail]);

    useEffect(() => {
        const filtered = administradores.filter(adm =>
            adm && adm.EMAIL &&
            (busquedaNombre === '' || adm.NOMBRE.toLowerCase().includes(busquedaNombre.toLowerCase())) &&
            (busquedaApellido === '' || adm.APELLIDO.toLowerCase().includes(busquedaApellido.toLowerCase())) &&
            (busquedaEmail === '' || adm.EMAIL.toLowerCase().includes(busquedaEmail.toLowerCase()))
        );
        setFilteredAdministradores(filtered);
    }, [busquedaNombre, busquedaApellido, busquedaEmail, administradores]);


    const handleModalOpen = (id) => {
        const adminSeleccionado = administradores.find(admin => admin.ID_USUARIO === id);
        if(adminSeleccionado) {
            setNombre(adminSeleccionado.NOMBRE);
            setApellido(adminSeleccionado.APELLIDO);
            const fecha = new Date(adminSeleccionado.FECHA_DE_NACIMIENTO);
            setFechaNacimiento(fecha);
            setEmail(adminSeleccionado.EMAIL);
        }
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setNombre('');
        setApellido('');
        setFechaNacimiento(new Date());
        setEmail('');
        setSelectedId(null);
    };

    const handleUpdate = () => {

        if (!nombre || !apellido || !fechaNacimiento) {
            toast.warn('Todos los campos son obligatorios', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            return;
        }

        const adminData = {
            nombre,
            apellido,
            fechaNacimiento,
            userId: userData.id_usuario
        };

        axios.put(`${API_BASE_URL}/admin/actualizarAdministrador/${selectedId}`, adminData)
            .then((response) => {
                toast.success("Administrador actualizado exitosamente", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });

                // Actualizar la lista de administradores en el frontend
                const updatedAdministradores = administradores.map(admin => {
                    if (admin.ID_USUARIO === selectedId) {
                        return { ...admin, NOMBRE: nombre, APELLIDO: apellido, FECHA_NACIMIENTO: fechaNacimiento, EMAIL: email };
                    }
                    return admin;
                });

                setAdministradores(updatedAdministradores);
                setFilteredAdministradores(updatedAdministradores.filter(adm =>
                    adm.EMAIL &&
                    (nombre === '' || adm.NOMBRE.toLowerCase().includes(nombre.toLowerCase())) &&
                    (apellido === '' || adm.APELLIDO.toLowerCase().includes(apellido.toLowerCase())) &&
                    (email === '' || adm.EMAIL.toLowerCase().includes(email.toLowerCase()))
                ));

                handleModalClose();
            })
            .catch((error) => {
                console.error('Error actualizando administrador:', error);
                toast.error('Error al actualizar administrador.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            });
    };


    return (
        <Container>
            <Content>
                <FormColumn className={"administradorActualizar"}>
                    <Title>Actualizar Administrador</Title>
                    <Label>Buscar por nombre:</Label>
                    <Input value={busquedaNombre} onChange={(e) => setBusquedaNombre(e.target.value)} />
                    <Label>Buscar por apellido:</Label>
                    <Input value={busquedaApellido} onChange={(e) => setBusquedaApellido(e.target.value)} />
                    <Label>Buscar por correo electrónico:</Label>
                    <Input value={busquedaEmail} onChange={(e) => setBusquedaEmail(e.target.value)} />
                    <AdminList>
                        {administradores.map(admin => (
                            <ListItem key={admin.idUsuario}>
                                <AdminInfo>
                                    {admin.nombre} {admin.apellido} ({admin.email})
                                </AdminInfo>
                                <SelectButton onClick={() => handleModalOpen(admin.idUsuario)}>Seleccionar</SelectButton>
                            </ListItem>
                        ))}
                    </AdminList>
                </FormColumn>
                <ActivityFeed idRol={'4'} idAccion={2} idInstitucion={userData.id_institucion} idEntidadAfectada={3}/>

                <StyledModal isOpen={isModalOpen} onRequestClose={handleModalClose}>
                    <ModalContent>
                        <ModalHeader>
                            <h2>Actualizar Datos</h2>
                        </ModalHeader>
                        <ModalBody>
                            <Input placeholder="Nombre/s" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <Input placeholder="Apellidos" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            <DatePickerWrapper>
                                <DatePicker
                                    selected={fechaNacimiento}
                                    onChange={(date) => setFechaNacimiento(date)}
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    showMonthDropdown
                                    dropdownMode="select"
                                    placeholderText="Selecciona una fecha"
                                />
                            </DatePickerWrapper>
                            {/*<EmailInput placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />*/}
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleUpdate}>Confirmar Actualización</Button>
                            <ButtonCancel onClick={handleModalClose}>Cancelar</ButtonCancel>
                        </ModalFooter>
                    </ModalContent>
                </StyledModal>
            </Content>
        </Container>
    );
};

export default ActualizarAdministrador;
