import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, Label, Title, Button, Section, Select, BodyMapStyle, DatePickerWrapper, IndicadorGuardado,  ListItem, ButtonAceptar,ButtonCancelar} from './FichaColumnaCervicalStyle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BodyMap from "../../../components/BodyMap/BodyMap";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from "axios";
import {API_BASE_URL} from "../../../utils/config";
import {AuthContext} from "../../../context/AuthContext";
import { StyledModal } from "../../../components/Modal";
import '../globalStylesFichas.css';
import {toast} from "react-toastify";
import {FaSave} from "react-icons/fa";
import moment from "moment";
const FichaColumnaCervical = () => {
    const [selectedBodyParts, setSelectedBodyParts] = useState([]);
    const { userData } = useContext(AuthContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fisioterapeutas, setFisioterapeutas] = useState([]);
    const [fisios, setFisios] = useState([]);
    const [filteredFisios, setFilteredFisios] = useState([]);
    const [mostrarGuardado, setMostrarGuardado] = useState(false);
    const [selectedFisio, setSelectedFisio] = useState(null);
    const [isUserCreationModalVisible, setIsUserCreationModalVisible] = useState(false);
    const [isEmailRequired, setIsEmailRequired] = useState(false);

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
        const datosGuardados = localStorage.getItem('datosFormularioPacienteColumnaCervical');
        if (datosGuardados) {
            const parsedData = JSON.parse(datosGuardados);
            parsedData.fechaNac = new Date(parsedData.fechaNac);
            parsedData.sintomasInicioArea = parsedData.sintomasInicioArea || [];
            parsedData.sintomasPeores = parsedData.sintomasPeores || [];
            parsedData.sintomasMejores = parsedData.sintomasMejores || [];
            parsedData.posturasDolor = parsedData.posturasDolor || [];
            parsedData.tosEstornudo = parsedData.tosEstornudo || [];
            parsedData.miembrosSupMarch = parsedData.miembrosSupMarch || [];
            parsedData.sintomasConstantesOpciones = parsedData.sintomasConstantesOpciones || [];
            parsedData.sintomasInicioOpciones = parsedData.sintomasInicioOpciones || [];
            parsedData.sintomasIntermitentesOpciones = parsedData.sintomasIntermitentesOpciones || [];
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
                actividadLaboral: '',
                actividadOcio: '',
                limitacionFuncional: '',
                resultadoTest: '',
                puntuacion: 0,
                sintomasPresentes: '',
                comenzaronPor: '',
                almohada: '',
                comienzoSintomas: '',
                comeinzoSintomasMejora: '',
                sintomasMejores: [],
                sintomasInicio: '',
                sintomasInicioOpciones: '',
                sintomasInicioArea: '',
                sintomasConstantes: '',
                sintomasConstantesOpciones: '',
                sintomasIntermitentes: '',
                sintomasIntermitentesOpciones: '',
                sintomasPeores: [],
                dolorNocturno: '',
                posturasDolor: '',
                historiaPrevia: '',
                tratamientosPrevios: '',
                tosEstornudo: '',
                medicacion: '',
                saludGeneral: '',
                historiaCancer: '',
                historiaCancerNota: '',
                historiaTrauma: '',
                historiaTraumaNota: '',
                objetivosPaciente: '',
                marcha: '',
                miembrosSupMarch: '',
                cirugiaReciente: '',
                cirugiaRecienteNota: '',
                perdidaPeso: '',
                perdidaPesoNota: '',
                radiologia: '',
                radiologiaNota: '',
                sintomasPeoresOtro: '',
                sintomasMejoresOtro: '',
                diagnostico: '',
                idInstitucion: userData.id_empresa,
                rol: 1,
                idUsuarioEditor:  userData.id_usuario,
                idTipoFicha: 1,
                tipoCarga: 0,
                idMedico: 0

            };

        }
    };
    const [formValues, setFormValues] = useState(getInitialFormValues());
    useEffect(() => {
        localStorage.setItem('datosFormularioPacienteColumnaCervical', JSON.stringify(formValues));
        setMostrarGuardado(true);
        const timer = setTimeout(() => setMostrarGuardado(false), 2000);
        return () => clearTimeout(timer);
    }, [formValues]);

    const handleFisioSelection = (fisioId) => {
        setSelectedFisio(fisioId);
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            idMedico: fisioId
        }));
    };


    useEffect(() => {
        const datosGuardados = localStorage.getItem('datosFormularioPacienteColumnaCervical');
        if (datosGuardados) {
            const parsedData = JSON.parse(datosGuardados);
            if (parsedData.fechaNac) {
                parsedData.fechaNac = new Date(parsedData.fechaNac);
            }
            setFormValues(parsedData);
        }
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
                console.error('Error obteniendo los fisios:', error);

            });

    }, []);

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

    const validarYConstruirFichaJson = (fichaJsonOriginal) => {
        let camposAValidar = [
            'idInstitucion', 'rol', 'nombre', 'apellido', 'fechaNac', 'idUsuarioEditor', 'idTipoFicha', 'tipoCarga', 'idMedico', 'telefono'
        ];


        if (isEmailRequired) {
            camposAValidar.push('email');
        }

        const fichaJsonValidado = {};
        let camposFaltantes = [];

        camposAValidar.forEach(campo => {
            if (fichaJsonOriginal[campo] === undefined || fichaJsonOriginal[campo] === null || fichaJsonOriginal[campo] === '') {
                camposFaltantes.push(campo);
            } else {
                fichaJsonValidado[campo] = fichaJsonOriginal[campo];
            }
        });

        return { fichaJsonValidado, camposFaltantes };
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

        const { fichaJsonValidado, camposFaltantes } = validarYConstruirFichaJson(formValues);

        if (camposFaltantes.length > 0) {
            toast.warn(`Faltan datos por llenar: ${camposFaltantes.join(', ')}.`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
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
                if(response.data.success && response.data.nombreArchivo) {
                    exportPDF(response.data.nombreArchivo);
                } else {
                    console.error('No se recibió el nombre del archivo.');
                }
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

        // Actualizar el estado basado en si el checkbox está seleccionado o no
        if (checked) {
            // Añadir el valor del checkbox al array en el estado
            setFormValues(prevState => ({
                ...prevState,
                [name]: [...prevState[name], value]
            }));
        } else {
            // Remover el valor del checkbox del array en el estado
            setFormValues(prevState => ({
                ...prevState,
                [name]: prevState[name].filter(item => item !== value)
            }));
        }
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
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setFormValues({ ...formValues, fechaNac: formattedDate });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const sintomasPeoresValues = [];
        const mejorasValues = [];
        const fichaJson = {
            ...formValues,

        }
    };
    const exportPDF = async (nombre) => {
        const formulario = document.getElementById('formulario');

        const isMobile = window.innerWidth < 768;
        const scale = isMobile ? 2 : 1;

        const canvas = await html2canvas(formulario, {
            scale: scale,
            useCORS: true, // para manejar contenido CORS
            windowWidth: formulario.scrollWidth,
            windowHeight: formulario.scrollHeight,
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            ignoreElements: (element) => {
                return false;
            }
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Ajusta el tamaño del PDF basado en la escala
        const pdfWidth = isMobile ? 595.28 : canvas.width / scale;
        const pdfHeight = (canvas.height / scale) * (pdfWidth / canvas.width);

        // Inicia jsPDF
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [pdfWidth, pdfHeight]
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        const pdfBlob = pdf.output('blob');

        const formData = new FormData();
        formData.append('pdf', pdfBlob, nombre);

        try {
            const response = await axios.post(`${API_BASE_URL}/paciente/upload-pdf/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('PDF cargado con éxito.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            localStorage.removeItem('datosFormularioPacienteColumnaCervical');
        } catch (error) {
            console.error('Error al cargar el PDF:', error.response ? error.response.data : error);
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

                {/* Dirección */}
                <label htmlFor="direccion">Dirección</label>
                <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formValues.direccion}
                    onChange={handleInputChange}
                />

                {/* Email */}
                <label htmlFor="email">Email</label>
                <input type="email"
                       id="email"
                       name="email"
                       value={formValues.email}
                       onChange={handleInputChange}
                />

                {/* Teléfono */}
                <label htmlFor="telefono">Teléfono</label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formValues.telefono}
                    onChange={handleInputChange}
                />


                {/* Fecha de Nacimiento */}
                <Label htmlFor="fechaNac">Fecha de Nacimiento</Label>
                <DatePickerWrapper>
                    <DatePicker
                        selected={moment(formValues.fechaNac).toDate()}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
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
                <label htmlFor="remitidoPor">Remitido por Dr./Él./Otro</label>
                <input
                    type="text"
                    id="remitidoPor"
                    name="remitidoPor"
                    value={formValues.remitidoPor}
                    onChange={handleInputChange}
                />

                {/* Actividad Laboral */}
                <label htmlFor="actividadLaboral">Actividad Laboral</label>
                <input
                    type="text"
                    id="actividadLaboral"
                    name="actividadLaboral"
                    value={formValues.actividadLaboral}
                    onChange={handleInputChange}
                />

                {/* Actividades de Ocio */}
                <label htmlFor="actividadOcio">Actividades de Ocio</label>
                <input
                    type="text"
                    id="actividadOcio"
                    name="actividadOcio"
                    value={formValues.actividadOcio}
                    onChange={handleInputChange}
                />

                {/* Limitación Funcional en este episodio */}
                <label htmlFor="limitacionFuncional">Limitación Funcional en este episodio</label>
                <input
                    type="text"
                    id="limitacionFuncional"
                    name="limitacionFuncional"
                    value={formValues.limitacionFuncional}
                    onChange={handleInputChange}
                />

                {/* Resultado del test */}
                {/* Suponiendo que es un campo de texto, si no, ajustar según sea necesario */}
                <label htmlFor="resultadoTest">Resultado del test</label>
                <input
                    type="text"
                    id="resultadoTest"
                    name="resultadoTest"
                    value={formValues.resultadoTest}
                    onChange={handleInputChange}
                />
                {/* Puntuación NPRS */}
                <label htmlFor="puntuacion">Puntuación NPRS (0-10)</label>

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
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasInicioOpciones" value="Cuello" onChange={handleInputChange} checked={formValues.sintomasInicioOpciones.includes('Cuello')}
                            /> Cuello
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasInicioOpciones" value="Brazo" onChange={handleInputChange} checked={formValues.sintomasInicioOpciones.includes('Brazo')}/> Brazo
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasInicioOpciones" value="Antebrazo" onChange={handleInputChange} checked={formValues.sintomasInicioOpciones.includes('Antebrazo')}/> Antebrazo
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasInicioOpciones" value="Cabeza" onChange={handleInputChange} checked={formValues.sintomasInicioOpciones.includes('Cabeza')}/> Cabeza
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasConstantesOpciones" value="Cuello" onChange={handleInputChange} checked={formValues.sintomasConstantesOpciones.includes('Cuello')}
                            /> Cuello
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasConstantesOpciones" value="Brazo" onChange={handleInputChange} checked={formValues.sintomasConstantesOpciones.includes('Brazo')}/> Brazo
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasConstantesOpciones" value="Antebrazo" onChange={handleInputChange} checked={formValues.sintomasConstantesOpciones.includes('Antebrazo')}/> Antebrazo
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasConstantesOpciones" value="Cabeza" onChange={handleInputChange} checked={formValues.sintomasConstantesOpciones.includes('Cabeza')}/> Cabeza
                        </label>
                    </div>
                </div>
                <label htmlFor="sintomasIntermitentes">Sintomas intermitentes:</label>
                <input
                    type="text"
                    id="sintomasIntermitentes"
                    name="sintomasIntermitentes"
                    value={formValues.sintomasIntermitentes}
                    onChange={handleInputChange}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center',marginTop: '20px' }}>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasIntermitentesOpciones" value="Cuello" onChange={handleInputChange} checked={formValues.sintomasIntermitentesOpciones.includes('Cuello')}
                            /> Cuello
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasIntermitentesOpciones" value="Brazo" onChange={handleInputChange} checked={formValues.sintomasIntermitentesOpciones.includes('Brazo')}/> Brazo
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasIntermitentesOpciones" value="Antebrazo" onChange={handleInputChange} checked={formValues.sintomasIntermitentesOpciones.includes('Antebrazo')}/> Antebrazo
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" name="sintomasIntermitentesOpciones" value="Cabeza" onChange={handleInputChange} checked={formValues.sintomasIntermitentesOpciones.includes('Cabeza')}/> Cabeza
                        </label>
                    </div>
                </div>
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
                                <input type="checkbox" name="sintomasPeores" value="Girando" onChange={handleInputChange} checked={formValues.sintomasPeores.includes('Girando')} /> Girando
                            </label>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Tumbado" onChange={handleInputChange}  checked={formValues.sintomasPeores.includes('Tumbado')}/> Tumbado
                            </label>
                            <label>
                                <input type="checkbox" name="sintomasPeores" value="Levantarse" onChange={handleInputChange}  checked={formValues.sintomasPeores.includes('Levantarse')}/> Levantarse
                            </label>
                        </div>

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
                                <input type="checkbox" name="sintomasMejores" value="Flexionando" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Flexionando')} /> Flexionando
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Sentado" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Sentado')} /> Sentado
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Girando" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Girando')} /> Girando
                            </label>
                        </div>

                        <div style={{ marginLeft: 'auto' }}>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Tumbado" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Tumbado')} /> Tumbado
                            </label>

                        </div>

                    </div>
                    <div  style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="AM" onChange={handleInputChange}  checked={formValues.sintomasMejores.includes('AM')} /> AM
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" name="sintomasMejores" value="Con forme pasa el día" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('Con forme pasa el día')} /> Conforme pasa el día
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
                                <input type="checkbox" name="sintomasMejores" value="En movimiento" onChange={handleInputChange} checked={formValues.sintomasMejores.includes('En movimiento')}  /> En movimiento
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                        <label>
                            <input type="checkbox" name="sintomasMejores" value="otro" onChange={handleInputChange}  checked={formValues.sintomasMejores.includes('otro')} /> Otro
                        </label>
                        <input
                            type="text"
                            id="sintomasMejoresOtro"
                            name="sintomasMejoresOtro" // Nombre actualizado para ser único
                            placeholder="Especifique si es otro"
                            value={formValues.sintomasMejores.includes('otro') ? formValues.sintomasMejoresOtro : ''}
                            onChange={handleInputChange}
                            disabled={!formValues.sintomasMejores.includes('otro')}
                            style={{ width: '100%' }}
                        />
                    </div>

                </div>


                {/* Dolor nocturno */}
                <label htmlFor="dolorNocturno">Dolor nocturno:</label>
                <label>
                    <input
                        type="radio"
                        id="dolorNocturno"
                        name="dolorNocturno"
                        value="Si"
                        onChange={handleInputChange}
                        checked={formValues.dolorNocturno === 'Si'}

                    /> Sí
                </label>
                <label>
                    <input
                        type="radio"
                        id="dolorNocturno"
                        name="dolorNocturno"
                        value="No"
                        onChange={handleInputChange}
                        checked={formValues.dolorNocturno === 'No'}

                    /> No
                </label>

                {/* Posturas al dormir */}
                <label htmlFor="posturasDolor">Posturas al dormir</label>
                <label>
                    <input
                        type="checkbox"
                        id="posturasDolor"
                        name="posturasDolor"
                        value="Prono"
                        onChange={handleInputChange}
                        checked={formValues.posturasDolor.includes('Prono')}
                    />
                    Prono
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="posturasDolor"
                        name="posturasDolor"
                        value="Sup"
                        onChange={handleInputChange}
                        checked={formValues.posturasDolor.includes('Sup')}

                    />
                    Sup
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="posturasDolor"
                        name="posturasDolor"
                        value="de lado D"
                        onChange={handleInputChange}
                        checked={formValues.posturasDolor.includes('de lado D')}

                    />
                    de lado D
                </label>
                <label>
                    <input
                        type="checkbox"
                        id="posturasDolor"
                        name="posturasDolor"
                        value="de lado I"
                        onChange={handleInputChange}
                        checked={formValues.posturasDolor.includes('de lado I')}

                    />
                    de lado I
                </label>

                <label>
                    Almohadas:

                </label>
                <input
                    type="text"
                    id="almohada"
                    name="almohada"
                    value={formValues.almohada}
                    onChange={handleInputChange}
                />

                {/* Historia previa en columna */}
                <label htmlFor="historiaPrevia">Historia previa en columna</label>
                <input
                    type="text"
                    id="historiaPrevia"
                    name="historiaPrevia"
                    value={formValues.historiaPrevia}
                    onChange={handleInputChange}
                />

                {/* Tratamientos previos */}
                <label htmlFor="tratamientosPrevios">Tratamientos previos</label>
                <input
                    type="text"
                    id="tratamientosPrevios"
                    name="tratamientosPrevios"
                    value={formValues.tratamientosPrevios}
                    onChange={handleInputChange}
                />
                <h1>Preguntas específicas</h1>
                <div  style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                    <label>
                        Mareos
                        <input
                            type="checkbox"
                            id="tosEstornudo"
                            name="tosEstornudo"
                            value="Tos"
                            onChange={handleInputChange}
                            checked={formValues.tosEstornudo.includes('Tos')}

                        />
                    </label>
                    <label>
                        Zumbidos
                        <input
                            type="checkbox"
                            id="tosEstornudo"
                            name="tosEstornudo"
                            value="Estornudo"
                            onChange={handleInputChange}
                            checked={formValues.tosEstornudo.includes('Estornudo')}

                        />
                    </label>
                    <label>
                        Náusea
                        <input
                            type="checkbox"
                            id="tosEstornudo"
                            name="tosEstornudo"
                            value="Respiración profunda"
                            onChange={handleInputChange}
                            checked={formValues.tosEstornudo.includes('Respiración profunda')}

                        />
                    </label>
                    <label>
                        Visión
                        <input
                            type="checkbox"
                            id="tosEstornudo"
                            name="tosEstornudo"
                            value="Visión"
                            onChange={handleInputChange}
                            checked={formValues.tosEstornudo.includes('Visión')}

                        />
                    </label>
                    <label>
                        Habla
                        <input
                            type="checkbox"
                            id="tosEstornudo"
                            name="tosEstornudo"
                            value="Habla"
                            onChange={handleInputChange}
                            checked={formValues.tosEstornudo.includes('Habla')}

                        />
                    </label>
                </div>


                {/* Historia de cáncer */}
                <div  style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginTop: '20px' }}>

                    <div>
                        <label>
                            Marcha
                            <input
                                type="checkbox"
                                id="miembrosSupMarch"
                                name="miembrosSupMarch"
                                value="Marcha"
                                onChange={handleInputChange}
                                checked={formValues.miembrosSupMarch.includes('Marcha')}

                            />
                        </label>

                        <label>
                            Miembros superiores
                            <input
                                type="checkbox"
                                id="miembrosSupMarch"
                                name="miembrosSupMarch"
                                value="Miembros superiores"
                                onChange={handleInputChange}
                                checked={formValues.miembrosSupMarch.includes('Miembros superiores')}

                            />
                        </label>

                        <label>
                            Normal
                            <input
                                type="radio"
                                id="marcha"
                                name="marcha"
                                value="Normal"
                                onChange={handleInputChange}
                                checked={formValues.marcha.includes('Normal')}

                            />
                        </label>


                        <label>
                            Anormal
                            <input
                                type="radio"
                                id="marcha"
                                name="marcha"
                                value="Anormal"
                                onChange={handleInputChange}
                                checked={formValues.marcha.includes('Anormal')}

                            />
                        </label>
                    </div>
                </div>
                <label htmlFor="medicacion">Medicación:

                </label>
                <input
                    type="text"
                    id="medicacion"
                    name="medicacion"
                    value={formValues.medicacion}
                    onChange={handleInputChange}
                />
                <label htmlFor="medicacion">Salud general / Comorbilidades:

                </label>
                <input
                    type="text"
                    id="saludGeneral"
                    name="saludGeneral"
                    value={formValues.saludGeneral}
                    onChange={handleInputChange}
                />
                <label htmlFor="cirugiaReciente">Cirugía reciente / relevante:

                </label>
                <label>
                    Sí
                    <input
                        type="radio"
                        id="cirugiaReciente"
                        name="cirugiaReciente"
                        value="Si"
                        onChange={handleInputChange}
                        checked={formValues.cirugiaReciente.includes('Si')}

                    />
                </label>
                <label>
                    No
                    <input
                        type="radio"
                        id="cirugiaReciente"
                        name="cirugiaReciente"
                        value="No"
                        onChange={handleInputChange}
                        checked={formValues.cirugiaReciente.includes('No')}

                    />
                </label>


                <input
                    type="text"
                    id="cirugiaRecienteNota"
                    name="cirugiaRecienteNota"
                    value={formValues.cirugiaRecienteNota}
                    onChange={handleInputChange}
                />
                <label htmlFor="historiaCancer">Historia de cáncer:</label>
                <label>
                    Sí
                    <input
                        type="radio"
                        id="historiaCancer"
                        name="historiaCancer"
                        value="Si"
                        onChange={handleInputChange}
                        checked={formValues.historiaCancer.includes('Si')}

                    />
                </label>
                <label>
                    No
                    <input
                        type="radio"
                        id="historiaCancer"
                        name="historiaCancer"
                        value="No"
                        onChange={handleInputChange}
                        checked={formValues.historiaCancer.includes('No')}

                    />
                </label>
                <input
                    type="text"
                    id="historiaCancerNota"
                    name="historiaCancerNota"
                    value={formValues.historiaCancerNota}
                    onChange={handleInputChange}
                />
                {/* Historia de trauma */}
                <label htmlFor="historiaTrauma">Historia de trauma:</label>
                <label>
                    Sí
                    <input
                        type="radio"
                        id="historiaTrauma"
                        name="historiaTrauma"
                        value="Si"
                        onChange={handleInputChange}
                        checked={formValues.historiaTrauma.includes('Si')}

                    />
                </label>
                <label>
                    No
                    <input
                        type="radio"
                        id="historiaTrauma"
                        name="historiaTrauma"
                        value="No"
                        onChange={handleInputChange}
                        checked={formValues.historiaTrauma.includes('No')}

                    />
                </label>

                <input
                    type="text"
                    id="historiaTraumaNota"
                    name="historiaTraumaNota"
                    value={formValues.historiaTraumaNota}
                    onChange={handleInputChange}
                />
                {/* Cirugía reciente/relevante */}

                <label htmlFor="perdidaPeso">Pérdida inexplicada de peso:</label>
                <label>
                    Sí
                    <input
                        type="radio"
                        id="perdidaPeso"
                        name="perdidaPeso"
                        value="Si"
                        onChange={handleInputChange}
                        checked={formValues.perdidaPeso.includes('Si')}

                    />
                </label>
                <label>
                    No
                    <input
                        type="radio"
                        id="perdidaPeso"
                        name="perdidaPeso"
                        value="No"
                        onChange={handleInputChange}
                        checked={formValues.perdidaPeso.includes('No')}

                    />
                </label>


                <input
                    type="text"
                    id="perdidaPesoNota"
                    name="perdidaPesoNota"
                    value={formValues.perdidaPesoNota}
                    onChange={handleInputChange}
                />
                {/* Radiología */}
                <label htmlFor="radiologia">Radiología:</label>
                <label>
                    Sí
                    <input
                        type="radio"
                        id="radiologia"
                        name="radiologia"
                        value="Si"
                        onChange={handleInputChange}
                        checked={formValues.radiologia.includes('Si')}

                    />
                </label>
                <label>
                    No
                    <input
                        type="radio"
                        id="radiologia"
                        name="radiologia"
                        value="No"
                        onChange={handleInputChange}
                        checked={formValues.radiologia.includes('No')}

                    />
                </label>
                <input
                    type="text"
                    id="radiologiaNota"
                    name="radiologiaNota"
                    value={formValues.radiologiaNota}
                    onChange={handleInputChange}

                />
                <label htmlFor="objetivosPaciente">Objetivos / expectativas / creencias del paciente:</label>
                <input
                    type="text"
                    id="objetivosPaciente"
                    name="objetivosPaciente"
                    value={formValues.objetivosPaciente}
                    onChange={handleInputChange}
                />
                <label htmlFor="objetivosPaciente">Diagnóstico:</label>

                <textarea rows="10" cols="100" id="diagnostico" name="diagnostico" value={formValues.diagnostico} onChange={handleInputChange}></textarea>
                <BodyMapStyle>
                    <BodyMap key={"BodyMapColumnaCervical"}/>
                </BodyMapStyle>
                <Button type="submit" onClick={handleIngresarClick}>Ingresar</Button>
            </Form>
            <StyledModal isOpen={isModalVisible}>
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

export default FichaColumnaCervical;
