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
    PatientItem,
    PatientDetails,
    MotiveInput,
    PatientsList,
    PatientNumber
} from './AltaPacienteStyle';



import {API_BASE_URL} from "../../utils/config";
import ActivityFeed from "../../components/Feed/FeedActividad";
import {StyledModal} from "../../components/Modal";

import {useTransition, animated} from "react-spring";
import {AuthContext} from "../../context/AuthContext";
import Pagination from "../../components/Pagination/Pagination";
const AltaPaciente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [pacientes, setPacientes] = useState([]);
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [motivo, setMotivo] = useState('');
    const {userData} = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(10); // Aquí puedes definir cuántos pacientes por página quieres mostrar
    const [selectedPatients, setSelectedPatients] = useState([]);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [patientsToDischarge, setPatientsToDischarge] = useState([]);
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredPacientes.slice(indexOfFirstPatient, indexOfLastPatient);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const togglePatientSelection = patient => {
        setSelectedPatients(prevSelected => {
            const existingPatient = prevSelected.find(p => p.ID_USUARIO === patient.ID_USUARIO);
            if (existingPatient) {
                return prevSelected.filter(p => p.ID_USUARIO !== patient.ID_USUARIO);
            } else {
                return [...prevSelected, patient];
            }
        });
    };
    const handleConfirmDischarge = () => {
        const patientIds = selectedPatients.map(patient => patient.ID_USUARIO);
        const motivos = selectedPatients.map(patient => patient.motivo || '');

        axios.delete(`${API_BASE_URL}/paciente/eliminarPacientes`, {
            data: {
                patientIds,
                motivos,
                userId: userData.id_usuario
            }
        })
            .then(response => {
                toast.success('Pacientes eliminados exitosamente', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
                // Actualizar el estado para reflejar los pacientes eliminados
                setFilteredPacientes(prev =>
                    prev.filter(patient => !patientIds.includes(patient.ID_USUARIO))
                );
                setPacientes(prev =>
                    prev.filter(patient => !patientIds.includes(patient.ID_USUARIO))
                );
            })
            .catch(error => {
                toast.error('Error al eliminar pacientes', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            });
        setIsConfirmModalOpen(false);
        setSelectedPatients([]);
    };

    const handleMotivoChange = (id, newMotivo) => {
        setSelectedPatients(selectedPatients.map(p =>
            p.ID_USUARIO === id ? { ...p, motivo: newMotivo } : p
        ));
    };



    useEffect(() => {
        axios.get(`${API_BASE_URL}/paciente/todosLosPacientes/${userData.id_empresa}`)
            .then((response) => {

                if(response.data && Array.isArray(response.data.pacientes)){
                    setPacientes(response.data.pacientes);
                    setFilteredPacientes(response.data.pacientes);
                }else{
                    toast.error('No se recibieron datos de pacientes.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                }
            })
            .catch((error) => {
                console.error('Error obteniendo pacientes:', error);

            });
    }, []);


    useEffect(() => {
        const filtered = pacientes.filter(fisio =>
            fisio && fisio.EMAIL &&
            (nombre === '' || fisio.NOMBRE.toLowerCase().includes(nombre.toLowerCase())) &&
            (apellido === '' || fisio.APELLIDO.toLowerCase().includes(apellido.toLowerCase())) &&
            (email === '' || fisio.EMAIL.toLowerCase().includes(email.toLowerCase()))
        );
        setFilteredPacientes(filtered);
    }, [nombre, apellido, email, pacientes]);
    const handleModalClose = () => {
        setIsModalOpen(false);
        setMotivo('');
    };
    const handleConfirmOpen = () => {
        setIsConfirmModalOpen(true);
    };

    const handleDischarge = () => {

        handleConfirmClose();
        setSelectedPatients([]);
        setMotivo('');
    };


    const handleConfirmClose = () => {
        setIsConfirmModalOpen(false);
    };

    const handleModalOpen = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };
    const transitions = useTransition(filteredPacientes, {

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

        axios.delete(`${API_BASE_URL}/paciente/eliminarPaciente/${selectedId}`,{ data: {
                userId: userData.id_usuario
            }
        })
            .then((response) => {
                if (response.data.success) {
                    toast.success('Paciente eliminado exitosamente', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });

                    setFilteredPacientes(prev =>
                        prev.filter(admin => admin.ID_USUARIO !== selectedId)
                    );
                    setPacientes(prev =>
                        prev.filter(admin => admin.ID_USUARIO !== selectedId)
                    );
                    setIsModalOpen(false);
                    setSelectedId(null);
                    setMotivo('');
                } else {
                    toast.error('Error al eliminar paciente', {
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
                <FormColumn className={"pacienteEliminar"}>
                    <Title>Dar de alta paciente</Title>
                    <Input
                        placeholder="Buscar por nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    <Input
                        placeholder="Buscar por apellido"
                        value={apellido}
                        onChange={e => setApellido(e.target.value)}
                    />
                    <Input
                        placeholder="Buscar por correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FisioList>
                        {currentPatients.map(item => (
                            <ListItem key={item.ID_USUARIO}>
                                <FisioInfo>
                                    {item.NOMBRE} {item.APELLIDO} ({item.EMAIL})
                                </FisioInfo>
                                <SelectButton onClick={() => togglePatientSelection(item)}>
                                    {selectedPatients.some(p => p.ID_USUARIO === item.ID_USUARIO) ? 'Deseleccionar' : 'Seleccionar'}
                                </SelectButton>
                            </ListItem>
                        ))}
                    </FisioList>
                    <Pagination
                        patientsPerPage={patientsPerPage}
                        totalPatients={filteredPacientes.length}
                        paginate={paginate}
                    />
                    <ActionButtons>
                        <Button onClick={handleConfirmOpen}>Dar de alta</Button>
                    </ActionButtons>
                </FormColumn>
                <ActivityFeed idRol={'4, 3, 2'} idAccion={3} idInstitucion={userData.id_empresa} idEntidadAfectada={1} className={"FeedActividades"}/>
            </Content>
            <StyledModal isOpen={isConfirmModalOpen} onRequestClose={handleConfirmClose}>
                <ModalContent>
                    <ModalHeader>
                        <h2>Confirmar Alta de Pacientes</h2>
                    </ModalHeader>
                    <ModalBody>
                        <PatientsList>
                            {selectedPatients.map((patient, index) => (
                                <PatientItem key={patient.ID_USUARIO}>
                                    <PatientNumber>{index + 1}.</PatientNumber>
                                    <PatientDetails>{patient.NOMBRE} {patient.APELLIDO}</PatientDetails>
                                    <MotiveInput
                                        type="text"
                                        value={patient.motivo || ''}
                                        onChange={(e) => handleMotivoChange(patient.ID_USUARIO, e.target.value)}
                                        placeholder="Indica el motivo del alta"
                                    />
                                </PatientItem>
                            ))}
                        </PatientsList>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleConfirmDischarge}>Confirmar Alta</Button>
                        <ButtonCancel onClick={handleConfirmClose} cancelBtn>Cancelar</ButtonCancel>
                    </ModalFooter>
                </ModalContent>
            </StyledModal>
        </Container>
    );
};

export default AltaPaciente;
