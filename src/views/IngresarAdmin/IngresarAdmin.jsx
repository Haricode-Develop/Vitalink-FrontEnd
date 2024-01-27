import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../../context/AuthContext';
import * as XLSX from 'xlsx';
import plantilla from '../IngresarAdmin/templates/plantilla.xlsx';
import {toast,ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import {
  Container,
  Content,
  Title,
  Input,
  DateInput,
  EmailInput,
  ActionButtons,
  Button,
  FormColumn,
    DownloadLink,
    UploadButton,
    Label,
    DatePickerWrapper,
    IndicadorGuardado,
    ContenedorBotones
} from '../IngresarAdmin/IngresarAdminStyle';
import {API_BASE_URL} from "../../utils/config";
import ActivityFeed from '../../components/Feed/FeedActividad';
import {PictureColumn, ProfilePicture} from "../ActualizarAdministrador/ActualizarAdministradorStyle";
import {FaSave} from "react-icons/fa";

const IngresarAdministrador = () => {
    const [fileData, setFileData] = useState([]);
  const { userData } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [isFileReady, setIsFileReady] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [mostrarGuardado, setMostrarGuardado] = useState(false);

  let tipoCarga = 2;

  const handleInsert = () => {

    if (!nombre || !apellido || !startDate || !email || !userData.id_usuario) {
        toast.warn("Todos los campos son obligatorios", {
            position: toast.POSITION.TOP_RIGHT, 
            autoClose: 5000, 
            hideProgressBar: true, 
          });
        
      return;
    }

    if (contrasena !== confirmarContrasena) {
        toast.warn("Las contraseñas no coinciden", {
            position: toast.POSITION.TOP_RIGHT, 
            autoClose: 5000, 
            hideProgressBar: true, 
          });
      
        
      return;
    }
      tipoCarga = 0;
    const administradorData = {
      nombre,
      apellido,
        fechaNacimiento: startDate,
      email,
      id_rol: 3,
      id_institucion: userData.id_empresa,
        id_usuario_editor: userData.id_usuario,
        tipo_carga:tipoCarga
    };

    axios
      .post(`${API_BASE_URL}/admin/insertarAdministrador`, administradorData)
      .then((response) => {
   
        if(response.data.error !== 'registrado' && response.data.success){
            toast.success("El administrador fue añadido exitosamente", {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 5000, 
                hideProgressBar: true, 
              });
        }else{
            toast.warn("El correo electrónico ya existe", {
                position: toast.POSITION.TOP_RIGHT, 
                autoClose: 5000, 
                hideProgressBar: true, 
              });
            
        }
      })
      .catch((error) => {
        console.error('Error insertando administrador:', error);
      });
  };
    const handleMasiveInsert = () => {
        if (!isFileReady) {
            toast.warn("Por favor, carga un archivo antes de realizar la carga masiva.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
            });
            return;
        }
        tipoCarga = 1;
        if (fileData.length === 0) {
            // No hay datos para insertar
            return;
        }
        axios.post(`${API_BASE_URL}/masivo/insertarAdministradorMasivo`, { data: fileData, idRol: userData.id_rol, idInstitucion: userData.id_empresa, idUsuarioEditor: userData.id_usuario,tipoCarga })
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        const datosGuardados = localStorage.getItem('datosFormularioAdministrador');
        if(datosGuardados){
            const datos = JSON.parse(datosGuardados);
            setNombre(datos.nombre);
            setApellido(datos.apellido);
            setEmail(datos.email);
            setStartDate(datos.fechaNacimiento);

        }

    }, []);
    const guardarProgreso = () => {
        const datosFormulario ={
            nombre,
            apellido,
            startDate,
            email
        };
        localStorage.setItem('datosFormularioAdministrador', JSON.stringify(datosFormulario));
        setMostrarGuardado(true);
        setTimeout(() => setMostrarGuardado(false), 2000);

    }
    const handleBlur = () =>{
        guardarProgreso();
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {

            const reader = new FileReader();
            reader.onload = (evt) => {
                const bstr = evt.target.result;
                const workbook = XLSX.read(bstr, { type: 'binary' });
                const wsname = workbook.SheetNames[0];
                const ws = workbook.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                setFileData(data);
                setIsFileReady(true);

            };
            reader.readAsBinaryString(file);
        }

    };

    return (
    <Container>
      <Content>
      <ToastContainer />
        <FormColumn className={"administradorIngreso"}>
          <Title>Ingresar Administrador</Title>
            <Label>Nombre/s:</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} onBlur={handleBlur} />
            <Label>Apellidos:</Label>
            <Input value={apellido} onChange={(e) => setApellido(e.target.value)} onBlur={handleBlur}/>
            <Label>Fecha de Nacimiento:</Label>
            <DatePickerWrapper>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    onBlur={handleBlur}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                />            </DatePickerWrapper>
            <Label>Correo Electrónico:</Label>

            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur}/>

          <ActionButtons>
            <Button onClick={handleInsert}>Ingresar Administrador</Button>
              <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }} // Ocultamos el input original
                  id="file-upload" // Añadimos un ID para poder referenciarlo
              />
              <UploadButton onClick={() => document.getElementById('file-upload').click()}>
                  {isFileReady ? "Archivo Listo - Cambiar" : "Cargar Archivo"}
              </UploadButton>
              <Button onClick={handleMasiveInsert} disabled={!isFileReady}>
                  Realizar Carga Masiva
              </Button>
          </ActionButtons>
            <DownloadLink href={plantilla} download>
                Descargar plantilla.xlsx
            </DownloadLink>
        </FormColumn>
          <IndicadorGuardado mostrar={mostrarGuardado}>
              <FaSave /> Progreso guardado
          </IndicadorGuardado>
          <ActivityFeed idRol={'4'} idAccion={1} idInstitucion={userData.id_empresa} idEntidadAfectada={3}/>
      </Content>
    </Container>
  );
};

export default IngresarAdministrador;
