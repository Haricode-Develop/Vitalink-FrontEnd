import React, {useContext, useEffect, useRef, useState} from 'react';
import {Form, Input, Label, Title, Button, Section, Select, BodyMapStyle, DatePickerWrapper, IndicadorGuardado, ListItem, ButtonAceptar, ButtonCancelar} from './FichaExtremidadesSuperioresStyle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BodyMap from "../../../components/BodyMap/BodyMap";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from "axios";
import '../globalStylesFichas.css';
import {API_BASE_URL} from "../../../utils/config";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";
import {FaSave} from "react-icons/fa";
import { StyledModal } from "../../../components/Modal";
import moment from "moment";
import {useSede} from "../../../context/SedeContext";
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

moment.locale('es');
const defaultCountryCode = 'GT';
const FichaExtremidadesSuperiores = () => {
    const [selectedBodyParts, setSelectedBodyParts] = useState([]);
    const { userData } = useContext(AuthContext);
    const { idSedeActual } = useSede();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fisioterapeutas, setFisioterapeutas] = useState([]);
    const [fisios, setFisios] = useState([]);
    const [filteredFisios, setFilteredFisios] = useState([]);
    const [mostrarGuardado, setMostrarGuardado] = useState(false);

    const [selectedFisio, setSelectedFisio] = useState(null);
    const [isUserCreationModalVisible, setIsUserCreationModalVisible] = useState(false);
    const [isEmailRequired, setIsEmailRequired] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const bodyMapRef = useRef(null);

    const handleIngresarClick = (e) => {
        e.preventDefault();
        setIsUserCreationModalVisible(true);
    };
    const handleUserCreationResponse = (createUser) => {
        setIsEmailRequired(createUser);
        setIsUserCreationModalVisible(false);
        setIsModalVisible(true);
    };
    const getInitialFormValues = () => {
        const datosGuardados = localStorage.getItem('datosFormularioPacienteExtremidadesSuperiores');
        if (datosGuardados) {
            const parsedData = JSON.parse(datosGuardados);
            parsedData.fechaNac = new Date(parsedData.fechaNac);
            parsedData.sintomasInicioArea = parsedData.sintomasInicioArea || [];
            parsedData.sintomasPeores = parsedData.sintomasPeores || [];
            parsedData.sintomasMejores = parsedData.sintomasMejores || [];
            parsedData.parentesia =  parsedData.parentesia || [];
            parsedData.tosEstoVo = parsedData.tosEstoVo || [];
            parsedData.molestaDeNoche = parsedData.molestaDeNoche || [];
            parsedData.dolorReposo = parsedData.dolorReposo || [];
            parsedData.lugar = parsedData.lugar || [];
            parsedData.otrasPreguntas = parsedData.otrasPreguntas || [];
            parsedData.saludGeneralOpcion = parsedData.saludGeneralOpcion || [];
            parsedData.medicacionOpcion = parsedData.medicacionOpcion || [];
            parsedData.resumen = parsedData.resumen || [];
            parsedData.zonasAExplorar = parsedData.zonasAExplorar || [];
            parsedData.idSede = idSedeActual;
            parsedData.rol = 1;
            return parsedData;
        } else {
            return {
                nombre: '',
                apellido: '',
                email: '',
                direccion: '',
                telefono: '',
                sexo: '',
                fechaNac: new Date(),
                edad: 0,
                remitidoPor: '',
                trabajo: '',
                actividadOcio: '',
                limitacionFuncional: '',
                puntuacionIncapacidad: '',
                puntuacion: 0,
                sintomasPresentes: '',
                comenzaronPor: '',
                comienzoSintomas: '',
                comeinzoSintomasMejora: '',
                sintomasMejores: [],
                sintomasInicio: '',
                usoContinuadoDolor: '',
                molestaDeNoche: '',
                sintomasConstantes: '',
                episodiosPrevios: '',
                sintomasIntermitentes: '',
                sintomasPeores: [],
                dolorReposo: '',
                accidentes: '',
                accidentesNota: '',
                dolorNoche: '',
                dolorNocheNota: '',
                lugar: '',
                otrasPreguntas: '',
                problemasEspalda: '',
                tosEstoVo: '',
                parentesia: '',
                tratamientosPrevios: '',
                medicacion: '',
                medicacionOpcion: '',
                saludGeneral: '',
                saludGeneralOpcion: '',
                miembrosSupMarch: '',
                cirugiaReciente: '',
                cirugiaRecienteNota: '',
                perdidaPeso: '',
                resumen: '',
                zonasAExplorar: '',
                zonasAExplorarOtros: '',
                perdidaPesoNota: '',
                radiologia: '',
                radiologiaNota: '',
                sintomasPeoresOtro: '',
                sintomasMejoresOtro: '',
                diagnostico: '',
                rol: 1,
                idUsuarioEditor:  userData.id_usuario,
                idTipoFicha: 4,
                idSede: idSedeActual,
                tipoCarga: 0,
                idMedico: 0,

            };

        }
    };
    const [formValues, setFormValues] = useState(getInitialFormValues());
    useEffect(() => {
        localStorage.setItem('datosFormularioPacienteExtremidadesSuperiores', JSON.stringify(formValues));
        setMostrarGuardado(true);
        const timer = setTimeout(() => setMostrarGuardado(false), 2000);
        return () => clearTimeout(timer);
    }, [formValues]);



    useEffect(() => {
        const datosGuardados = localStorage.getItem('datosFormularioPacienteExtremidadesSuperiores');
        if (datosGuardados) {
            const parsedData = JSON.parse(datosGuardados);
            if (parsedData.fechaNac) {
                parsedData.fechaNac = new Date(parsedData.fechaNac);
            }
            setFormValues(parsedData);
        }
        axios.get(`${API_BASE_URL}/fisio/todosLosFisios/${idSedeActual}`)
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
                console.error('Error obteniendo los fisios:', error);

            });
    }, [idSedeActual]);

    const handleModalFisios = (e) => {
        if(userData.id_rol !== 2){
            e.preventDefault();
            setIsModalVisible(true);
        }
        else{

            setSelectedFisio(userData.id_rol);

            setFormValues(prevFormValues => ({
                ...prevFormValues,
                idMedico: userData.id_rol
            }));
            handleInsert(e);

        }

    };
    useEffect(() => {
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            idSede: idSedeActual,
        }));
    }, [idSedeActual]);

    const validarYConstruirFichaJson = (fichaJsonOriginal, isEmailRequired) => {
        // Copia todos los campos originales
        const fichaJsonValidado = {...fichaJsonOriginal};

        let camposAValidar = [
            'rol', 'nombre', 'apellido', 'fechaNac',
            'idUsuarioEditor', 'idTipoFicha', 'tipoCarga', 'idMedico',
            'telefono', 'idSede'
        ];

        if (isEmailRequired) {
            camposAValidar.push('email');
        }

        let erroresDeValidacion = [];

        // Validar los campos específicos
        camposAValidar.forEach(campo => {
            if (fichaJsonOriginal[campo] === undefined || fichaJsonOriginal[campo] === null || fichaJsonOriginal[campo] === '') {
                erroresDeValidacion.push({ campo, error: `El campo ${campo} es requerido.` });
            }
        });

        // Validar el número de teléfono
        if (!isPossiblePhoneNumber(fichaJsonOriginal.telefono)) {
            erroresDeValidacion.push({ campo: 'telefono', error: 'El número de teléfono es inválido.' });
        } else if (!fichaJsonOriginal.telefono.startsWith('+')) {
            erroresDeValidacion.push({ campo: 'telefono', error: 'No se añadió la extensión del país al número de teléfono.' });
        }

        // Validar el correo electrónico si es requerido
        if (isEmailRequired) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(fichaJsonOriginal.email)) {
                erroresDeValidacion.push({ campo: 'email', error: 'El correo electrónico es inválido.' });
            }
        }

        return { fichaJsonValidado, erroresDeValidacion };
    };


    const handleInsert = (e) => {
        e.preventDefault();
        setIsModalVisible(false);
        if (!selectedFisio) {
            toast.warn("Por favor, selecciona un fisioterapeuta.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            return;
        }

        const { fichaJsonValidado, erroresDeValidacion } = validarYConstruirFichaJson(formValues, isEmailRequired);

        if (erroresDeValidacion.length > 0) {
            erroresDeValidacion.forEach(({ error }) => {
                toast.warn(error, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            });
            return;
        }

        const fichaJSONString = JSON.stringify(fichaJsonValidado);
        axios.post(`${API_BASE_URL}/paciente/insertarPaciente`, { fichaJson: fichaJSONString }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                exportPDF(response.data.idUsuario);
                toast.success("El paciente fue añadido exitosamente", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;

        if (checked) {
            setFormValues(prevState => ({
                ...prevState,
                [name]: [...prevState[name], value]
            }));
        } else {
            setFormValues(prevState => ({
                ...prevState,
                [name]: prevState[name].filter(item => item !== value)
            }));
        }
    };
    const handleFisioSelection = (fisioId) => {
        setSelectedFisio(fisioId);
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            idMedico: fisioId
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormValues(prevState => {
            if (type === 'checkbox') {
                const list = prevState[name] ? [...prevState[name]] : [];
                if (checked) {
                    list.push(value);
                } else {
                    const index = list.indexOf(value);
                    if (index > -1) {
                        list.splice(index, 1);
                    }
                }
                return { ...prevState, [name]: list };
            } else if (type === 'radio') {
                return { ...prevState, [name]: value };
            } else {
                return { ...prevState, [name]: value };
            }
        });
    };

    const handleDateChange = (date) => {
        setFormValues(prevState => ({
            ...prevState,
            fechaNac: moment(date).format("YYYY-MM-DD")
        }));
    };

    const handlePhoneChange = (newPhoneNumber) => {
        if (newPhoneNumber) {
            // Si el número es válido, lo actualizamos directamente
            if (isPossiblePhoneNumber(newPhoneNumber)) {
                setFormValues(prevFormValues => ({
                    ...prevFormValues,
                    telefono: newPhoneNumber
                }));
            } else {
                // Si el nuevo valor no es un número válido (posiblemente incompleto), lo mantenemos temporalmente
                setFormValues(prevFormValues => ({
                    ...prevFormValues,
                    telefono: newPhoneNumber
                }));
            }
        } else {
            // Si el campo está vacío, actualizamos el estado a cadena vacía
            setFormValues(prevFormValues => ({
                ...prevFormValues,
                telefono: ''
            }));
        }
    };

    const getValidDate = (dateString) => {
        const date = moment(dateString);
        return date.isValid() ? date.toDate() : null;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isPossiblePhoneNumber(formValues.telefono)) {
            toast.warn('Por favor, ingrese un número de teléfono válido con la extensión.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            return;
        }
        const sintomasPeoresValues = [];
        const mejorasValues = [];
        const fichaJson = {
            ...formValues,

        }
    };
    const exportPDF = async (idUsuarioPaciente) => {
        try {
            if(bodyMapRef.current){
                const canvas = await html2canvas(bodyMapRef.current);
                const imgData = canvas.toDataURL('image/png');

                // Convertir la imagen a un archivo Blob
                const responseImg = await fetch(imgData);
                const blob = await responseImg.blob();

                const formData = new FormData();
                formData.append('fichaJson', JSON.stringify(formValues));
                formData.append('bodyMapImage', blob, 'bodyMapImage.png');
                formData.append('idUsuarioPaciente', idUsuarioPaciente);

                const response = await axios.post(`${API_BASE_URL}/fichasClinicas/generarPdfExtremidadesSuperiores/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    toast.success('PDF cargado con éxito.', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                    localStorage.removeItem('datosFormularioPacienteColumnaCervical');
                } else {
                    throw new Error(response.data.message || 'Error al cargar el PDF.');
                }
            }
        } catch (error) {
            console.error('Error al cargar el PDF:', error);
            toast.error('Error al cargar el PDF.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
        }
    };

    return (
        <>
            {isUserCreationModalVisible && (
                <StyledModal isOpen={isUserCreationModalVisible} onRequestClose={() => setIsUserCreationModalVisible(false)}>
                    <h2>¿Desea crear un usuario al paciente?</h2>
                    <div>
                        <ButtonAceptar onClick={() => handleUserCreationResponse(true)}>Sí</ButtonAceptar>
                        <ButtonCancelar onClick={() => handleUserCreationResponse(false)}>No</ButtonCancelar>
                    </div>
                </StyledModal>
            )}
            <Form id="formulario" onSubmit={handleSubmit}>

                {/* Nombre */}
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formValues.nombre}
                    onChange={handleInputChange}
                />

                {/* Apellido */}
                <label htmlFor="apellido">Apellido</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formValues.apellido}
                    onChange={handleInputChange}
                />

                {/* Sexo */}
                <Label htmlFor="sexo">Sexo M/F</Label>
                <Select id="sexo" name="sexo" value={formValues.sexo} onChange={handleInputChange}>
                    <option value="">Seleccionar</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </Select>


                <label htmlFor="email">Email</label>
                <input type="email"
                       id="email"
                       name="email"
                       value={formValues.email}
                       onChange={handleInputChange}
                />

                {/* Dirección */}
                <label htmlFor="direccion">Dirección</label>
                <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formValues.direccion}
                    onChange={handleInputChange}
                />

                {/* Teléfono */}
                <label htmlFor="telefono">Teléfono</label>
                <PhoneInput
                    international
                    defaultCountry="GT"
                    id="telefono"
                    name="telefono"
                    country={defaultCountryCode}
                    value={formValues.telefono}
                    onChange={handlePhoneChange}
                    placeholder="Número de teléfono"
                    required
                />

                {/* Fecha de Nacimiento */}
                <Label htmlFor="fechaNac">Fecha de Nacimiento</Label>
                <DatePickerWrapper>
                    <DatePicker
                        selected={getValidDate(formValues.fechaNac)}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        yearDropdownItemNumber={60}
                        scrollableYearDropdown={true}
                        placeholderText="Selecciona una fecha"
                    />
                </DatePickerWrapper>

                {/* Edad */}
                <label htmlFor="edad">Edad</label>
                <input
                    type="number"
                    id="edad"
                    name="edad"
                    value={formValues.edad}
                    onChange={handleInputChange}
                />

                {/* Remitido por */}
                <label htmlFor="remitidoPor">Remitido por Dr./Él/Otro</label>

                <input
                    type="text"
                    id="remitidoPor"
                    name="remitidoPor"
                    value={formValues.remitidoPor}
                    onChange={handleInputChange}
                />

                {/* Actividad Laboral */}
                <label htmlFor="trabajo">Trabajo: Estrés mecánico</label>
                <input
                    type="text"
                    id="trabajo"
                    name="trabajo"
                    value={formValues.trabajo}
                    onChange={handleInputChange}
                />

                {/* Actividades de Ocio */}
                <label htmlFor="actividadOcio">Ocio: Estrés mecánico </label>
                <input
                    type="text"
                    id="actividadOcio"
                    name="actividadOcio"
                    value={formValues.actividadOcio}
                    onChange={handleInputChange}
                />

                {/* Limitación Funcional en este episodio */}
                <label htmlFor="limitacionFuncional">Incapacidad funcional en este episodio</label>
                <input
                    type="text"
                    id="limitacionFuncional"
                    name="limitacionFuncional"
                    value={formValues.limitacionFuncional}
                    onChange={handleInputChange}
                />

                {/* Resultado del test */}
                <label htmlFor="puntuacionIncapacidad">Puntuación en incapacidad funcional</label>
                <input
                    type="text"
                    id="puntuacionIncapacidad"
                    name="puntuacionIncapacidad"
                    value={formValues.puntuacionIncapacidad}
                    onChange={handleInputChange}
                />
                {/* Puntuación NPRS */}
                <label htmlFor="puntuacion">Puntuación EVA (0-10)</label>

                <input
                    type="number"
                    id="puntuacion"
                    name="puntuacion"
                    value={formValues.puntuacion}
                    onChange={handleInputChange}

                />



                {/* Síntomas presentes */}
                <label htmlFor="sintomasPresentes">Síntomas presentes</label>
                <input
                    type="text"
                    id="sintomasPresentes"
                    name="sintomasPresentes"
                    value={formValues.sintomasPresentes}
                    onChange={handleInputChange}
                />


                {/* Comienzo de síntomas */}
                <label htmlFor="comienzoSintomas">Presentes desde</label>
                <input
                    type="text"
                    id="comienzoSintomas"
                    name="comienzoSintomas"
                    value={formValues.comienzoSintomas}
                    onChange={handleInputChange}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        Mejorando
                        <input
                            type="radio"
                            id="comeinzoSintomasMejora"
                            name="comeinzoSintomasMejora"
                            value="Mejorando"
                            onChange={handleInputChange}
                            checked={formValues.comeinzoSintomasMejora === 'Mejorando'}
                        />
                    </label>
                    <label>
                        Sin cambios

                        <input
                            type="radio"
                            id="comeinzoSintomasMejora"
                            name="comeinzoSintomasMejora"
                            value="Sin cambios"
                            onChange={handleInputChange}
                            checked={formValues.comeinzoSintomasMejora === 'Sin cambios'}

                        />
                    </label>
                    <label>
                        Empeorando
                        <input
                            type="radio"
                            id="comeinzoSintomasMejora"
                            name="comeinzoSintomasMejora"
                            value="Empeorando"
                            onChange={handleInputChange}
                            checked={formValues.comeinzoSintomasMejora === 'Empeorando'}

                        />
                    </label>
                </div>

                <label htmlFor="comenzaronPor">Comenzaron Por</label>
                <input
                    type="text"
                    id="comenzaronPor"
                    name="comenzaronPor"
                    value={formValues.comenzaronPor}
                    onChange={handleInputChange}
                />


                <label htmlFor="sintomasInicio">Sintomas al inicio:</label>
                <input
                    type="text"
                    id="sintomasInicio"
                    name="sintomasInicio"
                    value={formValues.sintomasInicio}
                    onChange={handleInputChange}
                />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label htmlFor="Parentesia:">
                        Parentesia:
                    </label>

                    <div>
                        <label>
                            <input type="radio" name="parentesia" value="Si" onChange={handleInputChange} checked={formValues.parentesia.includes('Si')}
                            /> Si
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="parentesia" value="No" onChange={handleInputChange} checked={formValues.parentesia.includes('No')}
                            /> No
                        </label>
                    </div>
                </div>

                <label htmlFor="sintomasInicio">Historia problemas de espalda:</label>
                <input
                    type="text"
                    id="problemasEspalda"
                    name="problemasEspalda"
                    value={formValues.problemasEspalda}
                    onChange={handleInputChange}
                />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <div>
                        <label>
                            <input type="checkbox" name="tosEstoVo" value="Toser" onChange={handleInputChange} checked={formValues.tosEstoVo.includes('Toser')}
                            /> Toser
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="tosEstoVo" value="Estornudar" onChange={handleInputChange} checked={formValues.tosEstoVo.includes('Estornudar')}/> Estornudar
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="tosEstoVo" value="+Vo" onChange={handleInputChange} checked={formValues.tosEstoVo.includes('+Vo')}/> +Vo
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="tosEstoVo" value="-Vo" onChange={handleInputChange} checked={formValues.tosEstoVo.includes('-Vo')}/> -Vo
                        </label>
                    </div>
                </div>


                <label htmlFor="sintomasConstantes">Sintomas constantes:</label>
                <input
                    type="text"
                    id="sintomasConstantes"
                    name="sintomasConstantes"
                    value={formValues.sintomasConstantes}
                    onChange={handleInputChange}
                />

                <label htmlFor="sintomasIntermitentes">Sintomas intermitentes:</label>
                <input
                    type="text"
                    id="sintomasIntermitentes"
                    name="sintomasIntermitentes"
                    value={formValues.sintomasIntermitentes}
                    onChange={handleInputChange}
                />

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="sintomasPeores">Peor</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Flexionando" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Flexionando')}
                                /> Flexionando
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Sentado" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Sentado')}/> Sentado
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Girando Cuella" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Girando Cuella')} /> Girando Cuello
                            </label>
                        </div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Vestirse" onChange={handleInputChange}  checked={formValues.sintomasPeores.includes('Vestirse')}/> Vestirse
                            </label>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Elevar Brazo" onChange={handleInputChange}  checked={formValues.sintomasPeores.includes('Elevar Brazo')}/> Elevar Brazo
                            </label>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Apretar" onChange={handleInputChange}  checked={formValues.sintomasPeores.includes('Apretar')}/> Apretar
                            </label>

                    </div>
                    <div  style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="AM" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('AM')} /> AM
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Con forme pasa el día" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Con forme pasa el día')}  /> Conforme pasa el día
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="PM" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('PM')} /> PM
                            </label>
                        </div>

                        <div style={{ marginLeft: 'auto' }}>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Quieto" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Quieto')} /> Quieto
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="En movimiento" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('En movimiento')}/> En movimiento
                            </label>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            Durmiendo:
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Prono" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Prono')} /> Prono
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Sup" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Sup')}/> Sup
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Lado I" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Lado I')}/> Lado I
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Lado D" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Lado D')}/> Lado D
                            </label>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                        <label>
                            <input type="checkbox" name="sintomasPeores" value="otro" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('otro')}/> Otro
                        </label>
                        <input
                            type="text"
                            id="sintomasPeoresOtro"
                            name="sintomasPeoresOtro"
                            placeholder="Especifique si es otro"
                            value={formValues.sintomasPeores.includes('otro') ? formValues.sintomasPeoresOtro : ''}
                            onChange={handleInputChange}
                            disabled={!formValues.sintomasPeores.includes('otro')}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>


                {/* Mejoras */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="mejoras">Mejor</label>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Flexionando" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Flexionando')}
                                /> Flexionando
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Sentado" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Sentado')}/> Sentado
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Girando Cuella" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Girando Cuella')} /> Girando Cuello
                            </label>
                        </div>
                        <label>
                            <input type="checkbox" name="sintomasMejores" value="Vestirse" onChange={handleInputChange}  checked={formValues.sintomasMejores.includes('Vestirse')}/> Vestirse
                        </label>
                        <label>
                            <input type="checkbox" name="sintomasMejores" value="Elevar Brazo" onChange={handleInputChange}  checked={formValues.sintomasMejores.includes('Elevar Brazo')}/> Elevar Brazo
                        </label>
                        <label>
                            <input type="checkbox" name="sintomasMejores" value="Apretar" onChange={handleInputChange}  checked={formValues.sintomasMejores.includes('Apretar')}/> Apretar
                        </label>

                    </div>
                    <div  style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="AM" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('AM')} /> AM
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Con forme pasa el día" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Con forme pasa el día')}  /> Conforme pasa el día
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="PM" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('PM')} /> PM
                            </label>
                        </div>

                        <div style={{ marginLeft: 'auto' }}>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Quieto" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Quieto')} /> Quieto
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="En movimiento" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('En movimiento')}/> En movimiento
                            </label>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            Durmiendo:
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Prono" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Prono')} /> Prono
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Sup" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Sup')}/> Sup
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Lado I" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Lado I')}/> Lado I
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Lado D" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Lado D')}/> Lado D
                            </label>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                        <label>
                            <input type="checkbox" name="sintomasMejores" value="otro" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('otro')}/> Otro
                        </label>
                        <input
                            type="text"
                            id="sintomasMejoresOtro"
                            name="sintomasMejoresOtro"
                            placeholder="Especifique si es otro"
                            value={formValues.sintomasMejores.includes('otro') ? formValues.sintomasMejoresOtro : ''}
                            onChange={handleInputChange}
                            disabled={!formValues.sintomasMejores.includes('otro')}
                            style={{ width: '100%' }}
                        />
                    </div>

                </div>
                <label htmlFor="Con el uso continuado, el dolor: ">Con el uso continuado, el dolor: </label>
                <label>
                    <input
                        type="checkbox"
                        id="usoContinuadoDolor"
                        name="usoContinuadoDolor"
                        value="Mejora"
                        onChange={handleInputChange}
                        checked={formValues.usoContinuadoDolor.includes('Mejora')}

                    /> Mejora
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="usoContinuadoDolor"
                        name="usoContinuadoDolor"
                        value="Empeora"
                        onChange={handleInputChange}
                        checked={formValues.usoContinuadoDolor.includes('Empeora')}
                    /> Empeora
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="usoContinuadoDolor"
                        name="usoContinuadoDolor"
                        value="No Efecto"
                        onChange={handleInputChange}
                        checked={formValues.usoContinuadoDolor.includes('No Efecto')}
                    /> No Efecto
                </label>





                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label htmlFor="Molesta de noche">Molesta de noche: </label>
                    <label>
                        <input
                            type="radio"
                            id="molestaDeNoche"
                            name="molestaDeNoche"
                            value="Si"
                            onChange={handleInputChange}
                            checked={formValues.molestaDeNoche.includes('Si')}

                        /> Si
                    </label>
                    <label>
                        <input
                            type="radio"
                            id="molestaDeNoche"
                            name="molestaDeNoche"
                            value="No"
                            onChange={handleInputChange}
                            checked={formValues.molestaDeNoche.includes('No')}
                        /> No
                    </label>

                    {/* Dolor nocturno */}
                    <div style={{ marginLeft: 'auto' }}>
                    <label htmlFor="Dolor Reposo:">Dolor Reposo:</label>
                    <label>
                        <input
                            type="radio"
                            id="dolorReposo"
                            name="dolorReposo"
                            value="Si"
                            onChange={handleInputChange}
                            checked={formValues.dolorReposo.includes('Si')}

                        /> Sí
                    </label>
                    </div>
                    <label>
                        <input
                            type="radio"
                            id="dolorReposo"
                            name="dolorReposo"
                            value="No"
                            onChange={handleInputChange}
                            checked={formValues.dolorReposo.includes('No')}

                        /> No
                    </label>


                    <div style={{ marginLeft: 'auto' }}>
                        <label htmlFor="Lugar:">Lugar:</label>
                        <label>
                            <input
                                type="checkbox"
                                id="lugar"
                                name="lugar"
                                value="Cuello"
                                onChange={handleInputChange}
                                checked={formValues.lugar.includes('Cuello')}

                            /> Cuello
                        </label>
                    </div>
                    <label>
                        <input
                            type="checkbox"
                            id="lugar"
                            name="lugar"
                            value="Hombro"
                            onChange={handleInputChange}
                            checked={formValues.lugar.includes('Hombro')}

                        /> Hombro
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="lugar"
                            name="lugar"
                            value="Codo"
                            onChange={handleInputChange}
                            checked={formValues.lugar.includes('Codo')}

                        /> Codo
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="lugar"
                            name="lugar"
                            value="Muñeca"
                            onChange={handleInputChange}
                            checked={formValues.lugar.includes('Muñeca')}

                        /> Muñeca
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="lugar"
                            name="lugar"
                            value="Mano"
                            onChange={handleInputChange}
                            checked={formValues.lugar.includes('Mano')}

                        /> Mano
                    </label>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>

                <div style={{ marginLeft: 'auto' }}>
                    <label htmlFor="Lugar:">Otras preguntas:</label>
                    <label>
                        <input
                            type="checkbox"
                            id="otrasPreguntas"
                            name="otrasPreguntas"
                            value="Hinchazon"
                            onChange={handleInputChange}
                            checked={formValues.otrasPreguntas.includes('Hinchazon')}

                        /> Hinchazón
                    </label>
                </div>
                    <div style={{ marginLeft: 'auto' }}>
                <label>
                    <input
                        type="checkbox"
                        id="otrasPreguntas"
                        name="otrasPreguntas"
                        value="Se engancha"
                        onChange={handleInputChange}
                        checked={formValues.otrasPreguntas.includes('Se engancha')}

                    /> Se engancha
                </label>
                        <label>
                            <input
                                type="checkbox"
                                id="otrasPreguntas"
                                name="otrasPreguntas"
                                value="Chasquido"
                                onChange={handleInputChange}
                                checked={formValues.otrasPreguntas.includes('Chasquido')}

                            /> Chasquido
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="otrasPreguntas"
                                name="otrasPreguntas"
                                value="Bloqueo"
                                onChange={handleInputChange}
                                checked={formValues.otrasPreguntas.includes('Bloqueo')}

                            /> Bloqueo
                        </label>
                    </div>

                <label>
                    <input
                        type="checkbox"
                        id="otrasPreguntas"
                        name="otrasPreguntas"
                        value="Subluxación"
                        onChange={handleInputChange}
                        checked={formValues.otrasPreguntas.includes('Subluxación')}

                    /> Subluxación
                </label>

                </div>
                <label htmlFor="sintomasConstantes">Episodios previos:</label>
                <input
                    type="text"
                    id="episodiosPrevios"
                    name="episodiosPrevios"
                    value={formValues.episodiosPrevios}
                    onChange={handleInputChange}
                />
                <label htmlFor="sintomasConstantes">Tratamientos previos:</label>
                <input
                    type="text"
                    id="tratamientosPrevios"
                    name="tratamientosPrevios"
                    value={formValues.tratamientosPrevios}
                    onChange={handleInputChange}
                />
                <label htmlFor="sintomasConstantes">Salud general:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                <label>
                    <input
                        type="checkbox"
                        id="saludGeneralOpcion"
                        name="saludGeneralOpcion"
                        value="Buena"
                        onChange={handleInputChange}
                        checked={formValues.saludGeneralOpcion.includes('Buena')}

                    /> Buena
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="saludGeneralOpcion"
                        name="saludGeneralOpcion"
                        value="Regular"
                        onChange={handleInputChange}
                        checked={formValues.saludGeneralOpcion.includes('Regular')}

                    /> Regular
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="saludGeneralOpcion"
                        name="saludGeneralOpcion"
                        value="Mala"
                        onChange={handleInputChange}
                        checked={formValues.saludGeneralOpcion.includes('Mala')}

                    /> Mala
                </label>

                </div>
                <input
                    type="text"
                    id="saludGeneral"
                    name="saludGeneral"
                    value={formValues.saludGeneral}
                    onChange={handleInputChange}
                />







                <label htmlFor="Medicación:">Medicación:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        <input
                            type="checkbox"
                            id="medicacionOpcion"
                            name="medicacionOpcion"
                            value="No"
                            onChange={handleInputChange}
                            checked={formValues.medicacionOpcion.includes('No')}

                        /> No
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="medicacionOpcion"
                            name="medicacionOpcion"
                            value="AINES"
                            onChange={handleInputChange}
                            checked={formValues.medicacionOpcion.includes('AINES')}

                        /> AINES
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="medicacionOpcion"
                            name="medicacionOpcion"
                            value="Analg"
                            onChange={handleInputChange}
                            checked={formValues.medicacionOpcion.includes('Analg')}

                        /> Analg
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            id="medicacionOpcion"
                            name="medicacionOpcion"
                            value="Esteroides"
                            onChange={handleInputChange}
                            checked={formValues.medicacionOpcion.includes('Esteroides')}

                        /> Esteroides
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="medicacionOpcion"
                            name="medicacionOpcion"
                            value="Anticoag"
                            onChange={handleInputChange}
                            checked={formValues.medicacionOpcion.includes('Anticoag')}

                        /> Anticoag
                    </label>

                </div>
                <input
                    type="text"
                    id="medicacion"
                    name="medicacion"
                    placeholder="Especifique si es otro"
                    value={formValues.medicacion}
                    onChange={handleInputChange}
                />




                <label htmlFor="Radiologia:">Radiologia:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        <input
                            type="radio"
                            id="radiologia"
                            name="radiologia"
                            value="Si"
                            onChange={handleInputChange}
                            checked={formValues.radiologia.includes('Si')}

                        /> Si
                    </label>
                    <label>
                        <input
                            type="radio"
                            id="radiologia"
                            name="radiologia"
                            value="No"
                            onChange={handleInputChange}
                            checked={formValues.radiologia.includes('No')}

                        /> No
                    </label>

                </div>
                <input
                    type="text"
                    id="radiologiaNota"
                    name="radiologiaNota"
                    value={formValues.radiologiaNota}
                    onChange={handleInputChange}
                />


                <label htmlFor="Cirugía importante o reciente">Cirugía importante o reciente:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        <input
                            type="radio"
                            id="cirugiaReciente"
                            name="cirugiaReciente"
                            value="Si"
                            onChange={handleInputChange}
                            checked={formValues.cirugiaReciente.includes('Si')}

                        /> Si
                    </label>
                    <label>
                        <input
                            type="radio"
                            id="cirugiaReciente"
                            name="cirugiaReciente"
                            value="No"
                            onChange={handleInputChange}
                            checked={formValues.cirugiaReciente.includes('No')}

                        /> No
                    </label>

                </div>
                <input
                    type="text"
                    id="cirugiaRecienteNota"
                    name="cirugiaRecienteNota"
                    value={formValues.cirugiaRecienteNota}
                    onChange={handleInputChange}
                />






                <label htmlFor="Dolor noche:">Dolor noche:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        <input
                            type="radio"
                            id="dolorNoche"
                            name="dolorNoche"
                            value="Si"
                            onChange={handleInputChange}
                            checked={formValues.dolorNoche.includes('Si')}

                        /> Si
                    </label>
                    <label>
                        <input
                            type="radio"
                            id="dolorNoche"
                            name="dolorNoche"
                            value="No"
                            onChange={handleInputChange}
                            checked={formValues.dolorNoche.includes('No')}

                        /> No
                    </label>

                </div>
                <input
                    type="text"
                    id="dolorNocheNota"
                    name="dolorNocheNota"
                    value={formValues.dolorNocheNota}
                    onChange={handleInputChange}
                />



                <label htmlFor="Accidentes:">Accidentes:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        <input
                            type="radio"
                            id="accidentes"
                            name="accidentes"
                            value="Si"
                            onChange={handleInputChange}
                            checked={formValues.accidentes.includes('Si')}

                        /> Si
                    </label>
                    <label>
                        <input
                            type="radio"
                            id="accidentes"
                            name="accidentes"
                            value="No"
                            onChange={handleInputChange}
                            checked={formValues.accidentes.includes('No')}

                        /> No
                    </label>

                </div>
                <input
                    type="text"
                    id="accidentesNota"
                    name="accidentesNota"
                    value={formValues.accidentesNota}
                    onChange={handleInputChange}
                />





                <label htmlFor="Pérdida inexplicada de peso:">Pérdida inexplicada de peso:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        <input
                            type="radio"
                            id="perdidaPeso"
                            name="perdidaPeso"
                            value="Si"
                            onChange={handleInputChange}
                            checked={formValues.perdidaPeso.includes('Si')}

                        /> Si
                    </label>
                    <label>
                        <input
                            type="radio"
                            id="perdidaPeso"
                            name="perdidaPeso"
                            value="No"
                            onChange={handleInputChange}
                            checked={formValues.perdidaPeso.includes('No')}

                        /> No
                    </label>

                </div>
                <input
                    type="text"
                    id="perdidaPesoNota"
                    name="perdidaPesoNota"
                    value={formValues.perdidaPesoNota}
                    onChange={handleInputChange}
                />
                <h1>Resumen</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        <input
                            type="checkbox"
                            id="resumen"
                            name="resumen"
                            value="Agudo"
                            onChange={handleInputChange}
                            checked={formValues.resumen.includes('Agudo')}

                        /> Agudo
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="resumen"
                            name="resumen"
                            value="Sub-Agudo"
                            onChange={handleInputChange}
                            checked={formValues.resumen.includes('Sub-Agudo')}

                        /> Sub-Agudo
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="resumen"
                            name="resumen"
                            value="Cronico"
                            onChange={handleInputChange}
                            checked={formValues.resumen.includes('Cronico')}

                        /> Cronico
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="resumen"
                            name="resumen"
                            value="Trauma"
                            onChange={handleInputChange}
                            checked={formValues.resumen.includes('Trauma')}

                        /> Trauma
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="resumen"
                            name="resumen"
                            value="Comienzo gradual"
                            onChange={handleInputChange}
                            checked={formValues.resumen.includes('Comienzo gradual')}

                        /> Comienzo gradual
                    </label>
                </div>

                <h1>Zonas a explorar</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <label>
                        <input
                            type="checkbox"
                            id="zonasAExplorar"
                            name="zonasAExplorar"
                            value="Cuello"
                            onChange={handleInputChange}
                            checked={formValues.zonasAExplorar.includes('Cuello')}

                        /> Cuello
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="zonasAExplorar"
                            name="zonasAExplorar"
                            value="Hombro"
                            onChange={handleInputChange}
                            checked={formValues.zonasAExplorar.includes('Hombro')}

                        /> Hombro
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            id="zonasAExplorar"
                            name="zonasAExplorar"
                            value="Codo"
                            onChange={handleInputChange}
                            checked={formValues.zonasAExplorar.includes('Codo')}

                        /> Codo
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            id="zonasAExplorar"
                            name="zonasAExplorar"
                            value="Muñeca"
                            onChange={handleInputChange}
                            checked={formValues.zonasAExplorar.includes('Muñeca')}

                        /> Muñeca
                    </label>



                    <label>
                        <input
                            type="checkbox"
                            id="zonasAExplorar"
                            name="zonasAExplorar"
                            value="Mano"
                            onChange={handleInputChange}
                            checked={formValues.zonasAExplorar.includes('Mano')}

                        /> Mano
                    </label>

                </div>
                <input
                    type="text"
                    id="zonasAExplorarOtros"
                    name="zonasAExplorarOtros"
                    value={formValues.zonasAExplorarOtros}
                    onChange={handleInputChange}
                />

                <label htmlFor="objetivosPaciente">Diagnóstico:</label>

                <textarea rows="10" cols="100" id="diagnostico" name="diagnostico" value={formValues.diagnostico} onChange={handleInputChange}></textarea>
                <BodyMapStyle ref={bodyMapRef}>
                    <BodyMap key={"BodyMapExtremidadesSuperiores"}/>
                </BodyMapStyle>
                <Button type="submit" onClick={handleIngresarClick}>Ingresar</Button>
            </Form>
            <StyledModal isOpen={isModalVisible} onRequestClose={() => setModalOpen(false)}>
                <h2>Seleccione un Fisioterapeuta</h2>
                <ul>
                    {fisios.map((fisio) => (
                        <ListItem
                            key={fisio.ID_USUARIO}
                            onClick={() => handleFisioSelection(fisio.ID_USUARIO)}
                            className={selectedFisio === fisio.ID_USUARIO ? 'selected' : ''}
                        >
                            {fisio.NOMBRE} {fisio.APELLIDO} - {fisio.EMAIL}
                        </ListItem>
                    ))}
                </ul>
                <div>
                    <ButtonAceptar onClick={handleInsert}>Aceptar</ButtonAceptar>
                    <ButtonCancelar onClick={() => setIsModalVisible(false)}>Cancelar</ButtonCancelar>
                </div>
            </StyledModal>
            <IndicadorGuardado mostrar={mostrarGuardado}>
                <FaSave /> Progreso guardado
            </IndicadorGuardado>

        </>
    );
};

export default FichaExtremidadesSuperiores;
