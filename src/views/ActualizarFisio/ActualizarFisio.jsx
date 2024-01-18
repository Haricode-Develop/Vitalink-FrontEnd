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
} from './ActualizarFisioStyle';



import {API_BASE_URL} from "../../utils/config";
import ActivityFeed from "../../components/Feed/FeedActividad";
import {StyledModal} from "../../components/Modal";

import {useTransition, animated} from "react-spring";
import {AuthContext} from "../../context/AuthContext";
import {DatePickerWrapper, EmailInput} from "../ActualizarAdministrador/ActualizarAdministradorStyle";
import DatePicker from "react-datepicker";

const ActualizarFisio = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [fisios, setFisios] = useState([]);

    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [busquedaApellido, setBusquedaApellido] = useState('');
    const [busquedaEmail, setBusquedaEmail] = useState('');

    const [filteredFisios, setFilteredFisios] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [motivo, setMotivo] = useState('');
    const {userData} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/fisio/todosLosFisios/${userData.id_empresa}`)
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
                console.error('Error obteniendo fisioterapeutas:', error);
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
        setIsModalOpen(false);
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
   const handleUpdate = () => {
       if(!nombre || !apellido || !fechaNacimiento || !email){
           toast.warn('Todos los campos son obligatorios', {
               position: toast.POSITION.TOP_RIGHT,
               autoClose: 5000,
               hideProgressBar: true,
           });
           return;
       }

       const fisioData ={
           nombre,
           apellido,
           fechaNacimiento,
           email,
           userId: userData.id_usuario
       }
       axios.put(`${API_BASE_URL}/fisio/actualizarFisioterapeuta/${selectedId}`, fisioData)
           .then(() =>{
               toast.success("Fisioterapeuta actualizado exitosamente", {
                   position: toast.POSITION.TOP_RIGHT,
                   autoClose: 5000,
                   hideProgressBar: true,
               });

               const updateFisio = fisios.map(fisio => {
                    if(fisio.ID_USUARIO === selectedId){
                        return{...fisio, NOMBRE: nombre, APELLIDO: apellido, FECHA_NACIMIENTO: fechaNacimiento, EMAIL: email};
                    }
                    return fisio;
               });

               setFisios(updateFisio);
               setFilteredFisios(updateFisio.filter(fisio =>
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
                <FormColumn className={"fisioterapeutaActualizar"}>
                    <Title>Actualizar Fisioterapeuta</Title>
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
                <ActivityFeed idRol={'4, 3'} idAccion={2} idInstitucion={userData.id_empresa} idEntidadAfectada={2} className={"FeedActividades"}/>
            </Content>
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
                        <EmailInput placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleUpdate}>Confirmar Actualización</Button>
                        <ButtonCancel onClick={handleModalClose}>Cancelar</ButtonCancel>
                    </ModalFooter>
                </ModalContent>
            </StyledModal>
        </Container>
    );
};

export default ActualizarFisio;
