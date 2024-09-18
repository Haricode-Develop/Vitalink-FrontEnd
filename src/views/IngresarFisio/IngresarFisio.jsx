import React, { useEffect, useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { FaSave } from "react-icons/fa";
import {
  Container,
  Content,
  Title,
  Input,
  DateInput,
  EmailInput,
  Select,
  ProfilePicture,
  UploadButton,
  ActionButtons,
  Button,
  FormColumn,
  PictureColumn,
  DownloadLink,
  DatePickerWrapper,
  IndicadorGuardado
} from '../IngresarFisio/IngresarFisioStyle';
import { API_BASE_URL } from "../../utils/config";
import plantilla from '../IngresarFisio/templates/plantilla.xlsx';
import * as XLSX from "xlsx";
import ActivityFeed from "../../components/Feed/FeedActividad";
import { Label, SedeItem, SedesListTitle } from "../IngresarAdmin/IngresarAdminStyle";
import DatePicker from "react-datepicker";
import { StyledModal } from "../../components/Modal";
import moment from 'moment'; // Importamos moment

const IngresarFisioterapeuta = () => {
  const [fileData, setFileData] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const { userData } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [email, setEmail] = useState('');
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [isFileReady, setIsFileReady] = useState(false);
  const [mostrarGuardado, setMostrarGuardado] = useState(false);
  const [isSedesModalOpen, setIsSedesModalOpen] = useState(false);
  const [sedes, setSedes] = useState([]);
  const [selectedSede, setSelectedSede] = useState(null);

  let tipoCarga = 2;

  useEffect(() => {
    const datosGuardados = localStorage.getItem('datosFormularioFisioterapeuta');
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      if (datos.nombre) setNombre(datos.nombre);
      if (datos.apellido) setApellido(datos.apellido);
      if (datos.fechaNacimiento) setStartDate(moment(datos.fechaNacimiento).toDate());
      if (datos.email) setEmail(datos.email);
      if (datos.especialidad) setSelectedEspecialidad(datos.especialidad);
    }
    axios
        .get(`${API_BASE_URL}/fisio/especialidades`)
        .then((response) => {
          setEspecialidades(response.data);
        })
        .catch((error) => {
          console.error('Error cargando las especialidades:', error);
        });
  }, []);

  const guardarProgreso = () => {
    const datosFormulario = {
      nombre,
      apellido,
      fechaNacimiento: moment(startDate).format(), // Convertimos a cadena ISO para guardar
      email,
      especialidad: selectedEspecialidad,
    };
    localStorage.setItem('datosFormularioFisioterapeuta', JSON.stringify(datosFormulario));
    setMostrarGuardado(true);
    setTimeout(() => setMostrarGuardado(false), 2000);
  };

  const handleBlur = () => {
    guardarProgreso();
  };

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
      return;
    }
    axios.post(`${API_BASE_URL}/masivo/insertarFisioterapeutaMasivo`, {
      data: fileData,
      idRol: userData.id_rol,
      idInstituciones: userData.instituciones.map(inst => inst.ID_INSTITUCION),
      idUsuarioEditor: userData.id_usuario,
      tipoCarga,
    })
        .then((response) => { })
        .catch((error) => {
          console.log(error);
        });
  };

  const procederConInsercion = (sedeId) => {
    tipoCarga = 0;
    const fisioterapeutaData = {
      nombre,
      apellido,
      fechaNacimiento: startDate,
      email,
      id_rol: 2,
      id_usuario_editor: userData.id_usuario,
      tipo_carga: tipoCarga,
      id_especialidad: selectedEspecialidad,
      id_sede: sedeId,
    };
    insertarAdministrador(fisioterapeutaData);
  };

  const insertarAdministrador = (fisioData) => {
    axios
        .post(`${API_BASE_URL}/fisio/insertarFisioterapeuta`, fisioData)
        .then((response) => {
          if (response.data.success !== false && response.data.error !== 'registrado') {
            toast.success("Se ha añadido exitosamente", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
              hideProgressBar: true,
            });
          } else {
            toast.warn("El correo ya existe", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
              hideProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.error('Error insertando fisioterapeuta:', error);
        });
  };

  const handleSedeSelected = (sedeId) => {
    setIsSedesModalOpen(false);
    setSelectedSede(sedeId);
    procederConInsercion(sedeId);
  };

  const handleInsert = () => {

    if (!nombre || !apellido || !startDate || !email || !selectedEspecialidad) {
      toast.warn("Todos los campos son obligatorios", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
      });
      return;
    }
    if (userData.sedes && userData.sedes.length > 1) {
      setIsSedesModalOpen(true);
    } else {
      procederConInsercion(selectedSede);
    }
  };

  useEffect(() => {
    setSedes(userData.sedes || []);
    if (userData.sedes && userData.sedes.length > 0) {
      setSelectedSede(userData.sedes[0].ID_SEDE);
    }
  }, [userData.sedes]);


  return (
      <Container>
        <Content>
          <ToastContainer />
          <FormColumn className="fisioterapeutaIngreso">
            <Title>Ingresar Fisioterapeuta</Title>
            <Label>Nombre/s: </Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} onBlur={handleBlur} />
            <Label>Apellidos: </Label>
            <Input value={apellido} onChange={(e) => setApellido(e.target.value)} onBlur={handleBlur} />
            <Label>Fecha de Nacimiento: </Label>
            <DatePickerWrapper>
              <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  onBlur={handleBlur}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
              />
            </DatePickerWrapper>
            <Label>Correo Electrónico: </Label>
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur} />
            <Label>Especialización : </Label>
            <Select value={selectedEspecialidad} onChange={(e) => setSelectedEspecialidad(e.target.value)} onBlur={handleBlur}>
              {especialidades.map((especialidad) => (
                  <option key={especialidad.id} value={especialidad.id}>
                    {especialidad.nombre}
                  </option>
              ))}
            </Select>
            <ActionButtons>
              <Button onClick={handleInsert}>Ingresar Fisioterapeuta</Button>
              {/*
             <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
            />
             <UploadButton onClick={() => document.getElementById('file-upload').click()}>
              {isFileReady ? "Archivo Listo - Cambiar" : "Cargar Archivo"}
            </UploadButton>
            <Button onClick={handleMasiveInsert} disabled={!isFileReady}>
              Realizar Carga Masiva
            </Button>
            */}
            </ActionButtons>
            <DownloadLink href={plantilla} download>
              Descargar plantilla.xlsx
            </DownloadLink>
          </FormColumn>
          <IndicadorGuardado mostrar={mostrarGuardado}>
            <FaSave /> Progreso guardado
          </IndicadorGuardado>
          <ActivityFeed idRol={'4, 3'} idAccion={1} idEntidadAfectada={2} className="FeedActividades" />
        </Content>
        <StyledModal isOpen={isSedesModalOpen} onRequestClose={() => setIsSedesModalOpen(false)}>
          <SedesListTitle>Sedes</SedesListTitle>
          {sedes.map((sede) => (
              <SedeItem key={sede.ID_SEDE} onClick={() => handleSedeSelected(sede.ID_SEDE)}>
                {sede.NOMBRE}
              </SedeItem>
          ))}
        </StyledModal>
      </Container>
  );
};

export default IngresarFisioterapeuta;