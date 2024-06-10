import React, { useEffect, useState, useContext,useRef, useMemo  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import SearchComponent from "../../components/IASearch/IASearch";
import {
    Content,
    Box,
    BoxTitle,
    BoxButton,
    SearchInput,
    Table,
    TableContainer,
    TableCell,
    ChartContainer,
    BoxTitleMobile,
    Thead,
    HeaderTitle,
    StyledDatePicker,
    DatePickerContainer,
    DatePickerWrapper,
    ModalContainer,
    ModalContent,
    CloseButton,
    DatePickerLabel,
    FilterIcon,
    Pagination,
    PageButton,
    Ellipsis,
    ButtonAceptar
} from './DashboardStyle';
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import SearchFileIndicator from "../../components/SearchFileIndicator/SearchFileIndicator";
import {API_BASE_URL} from "../../utils/config";
import { useSede } from '../../context/SedeContext'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import ReactTooltip from 'react-tooltip';
import Chart from 'chart.js/auto';
import { StyledModal } from '../../components/Modal';
import styled from 'styled-components';
import {FiChevronsLeft, FiChevronsRight, FiFilter, FiX} from 'react-icons/fi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { parseISO, isValid, format } from 'date-fns';


import swal from 'sweetalert';
const Dashboard = () => {

    const {userData, logout} = useContext(AuthContext);
    const { idSedeActual, isSedeInfoLoaded } = useSede();

    const navigate = useNavigate();
    const chartRef = useRef(null);
    const chartDistribucionRef = useRef(null);
    const chartInstance = useRef(null);
    const chartDistribucionInstance = useRef(null);

    const chartRefData = useRef(null);
    const [chartData, setChartData] = useState([]);
    const [chartDistribucionGeneroEdad, setChartDistribucionGeneroEdad] = useState([]);

    const [errorMessage, setErrorMessage] = useState(null);
    const [fisioterapeutas, setFisioterapeutas] = useState([]);
    const [citasDelDia, setCitasDelDia] = useState([]);
    const [pacientesAlta, setPacientesAlta] = useState([]);
    const [pacientesIngresados, setPacientesIngresados] = useState([]);
    const [pacientesPorMedico, setPacientesPorMedico] = useState([]);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [citasPorEstado, setCitasPorEstado] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [horasCitas, setHorasCitas] = useState([]);
    const histogramaRef = useRef(null);
    const [isHistogramDataLoaded, setIsHistogramDataLoaded] = useState(false);
    const [isCitasPorEstadoLoaded, setIsCitasPorEstadoLoaded] = useState(false);
    const [isPacientesAltaLoaded, setIsPacientesAltaLoaded] = useState(false);
    const [isPacientesIngresadosLoaded, setIsPacientesIngresadosLoaded] = useState(false);
    const [tempStartDate, setTempStartDate] = useState(null);
    const [tempEndDate, setTempEndDate] = useState(null);


    const [startDate, setStartDate] = useState(moment().startOf('day').toDate());
    const [endDate, setEndDate] = useState(moment().endOf('day').toDate());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [currentPageFisioterapeutas, setCurrentPageFisioterapeutas] = useState(1);
    const [currentPagePacientesAlta, setCurrentPagePacientesAlta] = useState(1);
    const [currentPagePacientesIngresados, setCurrentPagePacientesIngresados] = useState(1);
    const itemsPerPage = 10;

    const filteredFisioterapeutas = useMemo(() => {
        return fisioterapeutas.filter(fisio =>
            fisio.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fisio.APELLIDO.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fisio.EMAIL.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, fisioterapeutas]);

    const totalPages = Math.ceil(filteredFisioterapeutas.length / itemsPerPage);


    useEffect(() => {
        if (userData.estado_contrasena === 1) {
            promptChangePassword();
        }
    }, [userData]);

    useEffect(() =>{
        if(isSedeInfoLoaded){

            if(selectedTabIndex === 0){
                fetchFisioterapeutas(idSedeActual);
                fetchPacientesAsignados(idSedeActual);
                fetchCitasDelDia(idSedeActual);
                fetchDistribucionGeneroEdad(idSedeActual);
            }else{
                console.log("Entre para actualizar los fetch**********");
                console.log("ESTE ES EL ID SEDE ACTUAL: ", idSedeActual);

                fetchPacientesAlta(idSedeActual, startDate, endDate);
                fetchPacientesIngresados(idSedeActual, startDate, endDate);
                fetchHistogramaDeHoras(idSedeActual, startDate, endDate);
                fetchCitasPorEstado(idSedeActual, startDate, endDate);
            }

        }

    }, [idSedeActual,isSedeInfoLoaded, startDate, endDate, selectedTabIndex]);




    const centerDoughnutPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            if (chart.config.type !== 'doughnut') {
                return;
            }
            let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            let fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
           // let totalPacientes = chart.options.plugins.totalPacientes;

            const totalPacientes = chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);

            let text =  totalPacientes, // Accede al total aquí
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    };
    Chart.register(centerDoughnutPlugin);
    const handleSelectFile = (url) => {
        setSelectedFileUrl(url);
        window.open(url, '_blank');

    };


    const fetchFisioterapeutas = async (idSedeActual) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/fisioterapeutasPorSede/${idSedeActual}`);
            setFisioterapeutas(response.data.fisioterapeutas);
        } catch (error) {
            console.error("Error al obtener fisioterapeutas:", error);
        }
    };

    const fetchCitasDelDia = async (idSedeActual) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/citasDelDia/${idSedeActual}`);
            // Suponiendo que la API devuelva un array de citas con un campo 'estado' que indica si está realizada
            setCitasDelDia(response.data.citas)
        } catch (error) {
            console.error("Error al obtener las citas del día:", error);
            setCitasDelDia([]);
        }
    };

    const fetchDistribucionGeneroEdad = async (idSedeActual) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/distribucionGeneroEdad/${idSedeActual}`);
            console.log("ESTA ES LA RESPUESTA DE DISTRIBUCION: ", response.data.distribucion);
            setChartDistribucionGeneroEdad(response.data.distribucion);
        } catch (error) {
            console.error("Error al obtener la distribución de género y edad:", error);
            setChartDistribucionGeneroEdad([]);
        }
    }


    const getFormattedDateTime = () => {
        const now = new Date();
        return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    };
// Asegúrate de tener una función para ajustar el ancho de las columnas
    function adjustColumnWidths(worksheet, headers) {
        headers.forEach((header, i) => {
            const maxLength = worksheet.getColumn(i + 1).values
                .filter(value => typeof value === 'string')
                .reduce((max, value) => Math.max(max, value.length), 10);
            worksheet.getColumn(i + 1).width = maxLength + 2;
        });
    }

    const onMedicoClick = async (medico) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/pacientesAsignadosLista/${medico.IdMedico}/${medico.IdSede}`);
            const listaPacientes = response.data.listaPacientes.map(paciente => `
            <div style="background-color: #f9f9f9; border: 1px solid #e1e1e1; border-radius: 4px; padding: 10px; margin-bottom: 10px;">
                <p><strong>Nombre:</strong> ${paciente.NombrePaciente}</p>
                <p><strong>Apellido:</strong> ${paciente.ApellidoPaciente}</p> 
                <p><strong>Fecha de Ingreso:</strong> ${convertToNormalDateOnly(paciente.FechaInicioAtencion)}</p>
                <p><strong>Email:</strong> ${paciente.EmailPaciente}</p>
            </div>
        `).join('');

            const contentHtml = `
        <div style="text-align: left; font-family: Arial, sans-serif;">
            <p><strong>Nombre:</strong> ${medico.NombreMedico}</p>
            <p><strong>Especialidad:</strong> ${medico.Especialidad}</p>
            <p><strong>Email:</strong> <a href="mailto:${medico.EmailMedico}">${medico.EmailMedico}</a></p>
            <p><strong>Pacientes asignados:</strong> ${medico.CantidadPacientes}</p>
            <div style="max-height: 300px; overflow-y: auto; margin-bottom: 10px;">
                ${listaPacientes}
            </div>
        </div>
        `;

            swal({
                title: "Información del Médico",
                content: {
                    element: "div",
                    attributes: {
                        innerHTML: contentHtml,
                    },
                },
                icon: "info",
                buttons: {
                    confirm: {
                        text: "Cerrar",
                        value: true,
                        visible: true,
                        className: "sweet-alert-button",
                        closeModal: true
                    }
                },
                className: "custom-sweet-alert",
            });
        } catch (error) {
            console.error("Error al obtener la lista de pacientes:", error);
        }
    };


    const downloadExcel = async (data, headers, titulo, nombreArchivoBase) => {
        if (data.length === 0) {
            swal("No hay registros", "No hay datos disponibles para descargar.", "warning");
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Hoja1');

        // Configura la fila de título y aplica estilos
        const numColumns = headers.length;
        worksheet.mergeCells(1, 1, 3, numColumns); // Ajusta la fusión de celdas para incluir la columna del logo

        const titleCell = worksheet.getCell('A1');
        titleCell.value = titulo;
        titleCell.style = {
            font: { size: 14, bold: true, color: { argb: 'FF000000' } },
            alignment: { horizontal: 'center', vertical: 'middle' },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } },
        };

        const logoBase64 = await fetchLogoAsBase64('logoExcel.png');
        const imageId = workbook.addImage({
            base64: logoBase64,
            extension: 'png',
        });

        const totalWidth = worksheet.getColumn(numColumns).width || 10 * numColumns;
        const logoWidth = 150;
        const logoHeight = 35;

        const logoPosition = (totalWidth - logoWidth) / 2;

        worksheet.addImage(imageId, {
            tl: { col: numColumns - 0.3, row: 0.3 }, // Ajusta la posición hacia la derecha y abajo
            ext: { width: logoWidth, height: logoHeight },
            editAs: 'absolute'
        });


        const headerRow = worksheet.getRow(4);
        headerRow.values = headers.map(header => header.headerName);
        headers.forEach((header, i) => {
            const cell = headerRow.getCell(i + 1);
            cell.font = { bold: true, color: { argb: 'FF000000' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF5465' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF000000' } },
                left: { style: 'thin', color: { argb: 'FF000000' } },
                bottom: { style: 'thin', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } },
            };
        });

        data.forEach((item, index) => {
            const rowIndex = index + 5;
            const row = worksheet.getRow(rowIndex);
            row.values = headers.map(header => {
                let value = item[header.accessor];
                // Si el encabezado es una fecha, convierte el valor
                if (header.isDate && value) {
                    value = convertToNormalDateOnly(value);
                }
                return value;
            });
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.fill = { type: 'pattern', pattern: 'none' };
            });
        });

        // Autoajusta el ancho de las columnas
        adjustColumnWidths(worksheet, headers);

        // Guarda el archivo
        const buffer = await workbook.xlsx.writeBuffer();
        const formattedDateTime = getFormattedDateTime();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${nombreArchivoBase}_${formattedDateTime}.xlsx`);
    };




    async function fetchLogoAsBase64(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }



    function convertToNormalDateOnly(isoDate) {
        const date = new Date(isoDate);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const twoDigits = (num) => num.toString().padStart(2, '0');

        return `${year}-${twoDigits(month)}-${twoDigits(day)}`;
    }

    const createChart = () => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const labels = pacientesPorMedico.map(paciente => paciente.NombreMedico);
            const data = pacientesPorMedico.map(paciente => paciente.CantidadPacientes);

            chartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cantidad de Pacientes',
                        data: data,
                        backgroundColor: [
                            '#97FFE4',
                            '#FF5C5C',
                            '#0372FF',
                            '#16205B',
                            '#FFFFFF',
                        ],
                        borderColor: '#FFFFFF',
                        borderWidth: 2,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    plugins: {
                        centerText: {
                            display: true,
                            text: "20",
                            color: '#FF6384',
                            font: {
                                size: 24,
                                family: 'Arial',
                                weight: 'bold',
                            },
                        },
                    },
                    cutout: '60%',
                    // Aquí es donde añades el evento onClick usando la nueva API
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const clickedElementIndex = elements[0].index;
                            const medico = pacientesPorMedico[clickedElementIndex];
                            onMedicoClick(medico);
                        }
                    }
                },
            });
        }
    };


    const CitasDelDia = ({ citas }) => {
        const now = new Date();
        const isPast = (horaCita) => {
            const [hours, minutes, seconds] = horaCita.split(':');
            const citaDate = new Date();
            citaDate.setHours(hours, minutes, seconds);
            return now >= citaDate;
        };

        return (
            <Box className="citasDelDia">
                <BoxTitle>CITAS DEL DÍA</BoxTitle>
                {citas.length > 0 ? (
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {citas.map((cita, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <div
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            backgroundColor: isPast(cita.HORA_CITA) ? 'green' : 'red',
                                            marginRight: '10px'
                                        }}
                                    ></div>
                                    <span>{cita.NOMBRE_COMPLETO} - {cita.HORA_CITA}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <NoDataMessage />
                )}
            </Box>
        );
    };



    useEffect(() => {
        createChart();
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [pacientesPorMedico]);



    // ESTA ES LA PETICIÓN  PARA GRÁFICA POR TIEMPO DE PACIENTeE


    const fetchPacientesAlta = async (idSedeActual, startDate, endDate) => {
        // Asegurarse de que startDate y endDate sean cadenas de texto
        const startDateString = typeof startDate === 'string' ? startDate : startDate.toISOString();
        const endDateString = typeof endDate === 'string' ? endDate : endDate.toISOString();

        // Parsear y validar fechas
        const parsedStartDate = parseISO(startDateString);
        const parsedEndDate = parseISO(endDateString);

        if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
            console.error("startDate o endDate no son fechas válidas");
            return;
        }

        // Formatear fechas a 'yyyy-MM-dd'
        const formattedStartDate = format(parsedStartDate, 'yyyy-MM-dd');
        const formattedEndDate = format(parsedEndDate, 'yyyy-MM-dd');

        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/ultimosPacientesAltaPorSede/${idSedeActual}`, {
                params: { startDate: formattedStartDate, endDate: formattedEndDate }
            });
            setPacientesAlta(response.data.pacientes);
            setIsPacientesAltaLoaded(true);
        } catch (error) {
            setPacientesAlta([]);
            setIsPacientesAltaLoaded(true);
        }
    };

    const fetchPacientesIngresados = async (idSedeActual, startDate, endDate) => {
        // Asegurarse de que startDate y endDate sean cadenas de texto
        const startDateString = typeof startDate === 'string' ? startDate : startDate.toISOString();
        const endDateString = typeof endDate === 'string' ? endDate : endDate.toISOString();

        // Parsear y validar fechas
        const parsedStartDate = parseISO(startDateString);
        const parsedEndDate = parseISO(endDateString);

        if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
            console.error("startDate o endDate no son fechas válidas");
            return;
        }

        // Formatear fechas a 'yyyy-MM-dd'
        const formattedStartDate = format(parsedStartDate, 'yyyy-MM-dd');
        const formattedEndDate = format(parsedEndDate, 'yyyy-MM-dd');

        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/ultimosPacientesIngresadosPorSede/${idSedeActual}`, {
                params: { startDate: formattedStartDate, endDate: formattedEndDate }
            });
            setPacientesIngresados(response.data.pacientes);
            setIsPacientesIngresadosLoaded(true);
        } catch (error) {
            setPacientesIngresados([]);
            setIsPacientesIngresadosLoaded(true);
        }
    };


    const fetchPacientesAsignados = async (idSedeActual, startDate, endDate) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/pacientesAsignados/${idSedeActual}`, {
                params: { startDate, endDate }
            });
            setPacientesPorMedico(response.data.detalleMedico);
        } catch (error) {
            console.error("Error al obtener pacientes asignados:", error);
        }
    };

    const fetchHistogramaDeHoras = async (idSedeActual, startDate, endDate) => {
        // Convertir fechas a ISO strings
        const startDateString = typeof startDate === 'string' ? startDate : startDate.toISOString();
        const endDateString = typeof endDate === 'string' ? endDate : endDate.toISOString();

        // Parsear y validar fechas
        const parsedStartDate = parseISO(startDateString);
        const parsedEndDate = parseISO(endDateString);

        if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
            console.error("startDate o endDate no son fechas válidas");
            return;
        }

        // Formatear fechas a 'yyyy-MM-dd'
        const formattedStartDate = format(parsedStartDate, 'yyyy-MM-dd');
        const formattedEndDate = format(parsedEndDate, 'yyyy-MM-dd');

        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/distribucionHorasCitas/${idSedeActual}`, {
                params: { startDate: formattedStartDate, endDate: formattedEndDate }
            });
            console.log("ESTAS SON LAS HORAS DE CITAS:", response.data.distribucionHorasCitas);
            setHorasCitas(response.data.distribucionHorasCitas);
        } catch (error) {
            setIsHistogramDataLoaded(true)
        }
    };



    const fetchCitasPorEstado = async (idSedeActual, startDate, endDate) => {
        const startDateString = typeof startDate === 'string' ? startDate : startDate.toISOString();
        const endDateString = typeof endDate === 'string' ? endDate : endDate.toISOString();

        const parsedStartDate = parseISO(startDateString);
        const parsedEndDate = parseISO(endDateString);

        if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
            console.error("startDate o endDate no son fechas válidas");
            return;
        }

        const formattedStartDate = format(parsedStartDate, 'yyyy-MM-dd');
        const formattedEndDate = format(parsedEndDate, 'yyyy-MM-dd');

        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/cantidadCitasPorEstado/${idSedeActual}`, {
                params: { startDate: formattedStartDate, endDate: formattedEndDate }
            });
            console.log("ESTAS SON LA CANTIDAD DE ESTADOS POR CITAS: ", response.data.cantidadCitasPorEstado);
            setCitasPorEstado(response.data.cantidadCitasPorEstado);
            setIsCitasPorEstadoLoaded(true);

        } catch (error) {
            setIsCitasPorEstadoLoaded(true);
        }
    };


    useEffect(() => {
        let chart;

        if (histogramaRef.current && Array.isArray(horasCitas) && horasCitas.length > 0) {
            const ctx = histogramaRef.current.getContext('2d');

            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: horasCitas.map(dato => `${dato.HoraDelDia} hs`),
                    datasets: [{
                        label: 'Cantidad de Citas',
                        data: horasCitas.map(dato => dato.CantidadDeCitas),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Cleanup function to destroy the chart
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [horasCitas]);



    const promptChangePassword = () => {
        const formContent = `
          <input type="password" id="currentPassword" placeholder="Contraseña actual" style="display:block; width: 100%; margin-bottom: 10px;">
          <input type="password" id="newPassword" placeholder="Nueva contraseña" style="display:block; width: 100%; margin-bottom: 10px;">
          <input type="password" id="confirmPassword" placeholder="Confirmar nueva contraseña" style="display:block; width: 100%;">
      `;

        swal({
            title: "Cambiar contraseña",
            text: "Para mantener tus datos seguros, te recomendamos que actualices tu contraseña.",
            content: {
                element: "div",
                attributes: {
                    innerHTML: formContent
                }
            },
            buttons: {
                cancel: "Cancelar",
                confirm: {
                    text: "Cambiar contraseña",
                    value: true,
                    className: "blue-button" // Agrega una clase para el botón
                }
            }
        })
            .then(willChange => {
                if (willChange) {
                    const currentPassword = document.getElementById('currentPassword').value;
                    const newPassword = document.getElementById('newPassword').value;
                    const confirmPassword = document.getElementById('confirmPassword').value;

                    if (!currentPassword || !newPassword || !confirmPassword) {
                        swal("Error", "Todos los campos son requeridos", "error");
                        return;
                    }

                    if (newPassword !== confirmPassword) {
                        swal("Error", "Las contraseñas no coinciden", "error");
                    } else {
                        changePasswordAPI(currentPassword, newPassword);
                    }
                }
            });
    }

    const handleDateChange = (start, end) => {
        const diffDays = moment(end).diff(moment(start), 'days');
        if (diffDays > 30) {
            setModalMessage("Solo se pueden filtrar datos de un máximo de 30 días.");
            setIsModalOpen(true);
            return;
        }
        setStartDate(start);
        setEndDate(end);
        setIsFilterOpen(false);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };



    const changePasswordAPI = async (currentPassword, newPassword) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/cambiarContrasena`, {
                id_usuario: userData.id_usuario,
                currentPassword,
                newPassword
            });

            if (response.data.success) {
                swal("¡Éxito!", "Contraseña cambiada exitosamente", "success");
                logout();
                navigate('/');
            } else {
                throw new Error(response.data.error || "Error cambiando la contraseña");
            }
        } catch (error) {
            const message = error.message || "Error cambiando la contraseña";
            setErrorMessage(message);
            swal("Error", message, "error");
        }
    };

    const NoDataMessage = () => (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}>
            No se encontraron datos.
        </div>
    );


    useEffect(() => {
        if (chartData.current && citasPorEstado.length > 0) {
            const ctx = chartData.current.getContext('2d');
            if (chartData.current.chartInstance) {
                chartData.current.chartInstance.destroy();
            }

            // Definir colores específicos para cada estado
            const colors = {
                Programada: 'rgba(255, 206, 86, 0.2)', // Amarillo
                Completada: 'rgba(75, 192, 192, 0.2)', // Verde
                Cancelada: 'rgba(255, 99, 132, 0.2)', // Rojo
            };

            const borderColors = {
                Programada: 'rgba(255, 206, 86, 1)', // Amarillo
                Completada: 'rgba(75, 192, 192, 1)', // Verde
                Cancelada: 'rgba(255, 99, 132, 1)', // Rojo
            };

            const chartColors = citasPorEstado.map(cita => colors[cita.NOMBRE_ESTADO]);
            const chartBorderColors = citasPorEstado.map(cita => borderColors[cita.NOMBRE_ESTADO]);

            chartData.current.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: citasPorEstado.map(cita => cita.NOMBRE_ESTADO),
                    datasets: [{
                        label: 'Cantidad de Citas',
                        data: citasPorEstado.map(cita => cita.CANTIDAD_CITAS),
                        backgroundColor: chartColors,
                        borderColor: chartBorderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [citasPorEstado]);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const displayedFisioterapeutas = useMemo(() => {
        const startIndex = (currentPageFisioterapeutas - 1) * itemsPerPage;
        return filteredFisioterapeutas.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPageFisioterapeutas, filteredFisioterapeutas]);

    const displayedPacientesAlta = useMemo(() => {
        const startIndex = (currentPagePacientesAlta - 1) * itemsPerPage;
        return pacientesAlta.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPagePacientesAlta, pacientesAlta]);

    const displayedPacientesIngresados = useMemo(() => {
        const startIndex = (currentPagePacientesIngresados - 1) * itemsPerPage;
        return pacientesIngresados.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPagePacientesIngresados, pacientesIngresados]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPageFisioterapeutas(1);
    };

    const renderPageNumbers = (currentPage, totalPages, setCurrentPage) => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pageNumbers.map((number, index) =>
            typeof number === 'string' ? (
                <Ellipsis key={index}>...</Ellipsis>
            ) : (
                <PageButton
                    key={number}
                    isActive={currentPage === number}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </PageButton>
            )
        );
    };


    const groupByAgeRange = (data) => {
        const ageRanges = {
            '0-10': 0,
            '11-20': 0,
            '21-30': 0,
            '31-40': 0,
            '41-50': 0,
            '51-60': 0,
            '61-70': 0,
            '71+': 0
        };

        data.forEach(({ Edad, Conteo }) => {
            if (Edad <= 10) ageRanges['0-10'] += Conteo;
            else if (Edad <= 20) ageRanges['11-20'] += Conteo;
            else if (Edad <= 30) ageRanges['21-30'] += Conteo;
            else if (Edad <= 40) ageRanges['31-40'] += Conteo;
            else if (Edad <= 50) ageRanges['41-50'] += Conteo;
            else if (Edad <= 60) ageRanges['51-60'] += Conteo;
            else if (Edad <= 70) ageRanges['61-70'] += Conteo;
            else ageRanges['71+'] += Conteo;
        });

        return ageRanges;
    };

    // Función para construir los datos del gráfico
    const createChartDistribucion = () => {
        if (chartDistribucionRef.current) {
            const ctx = chartDistribucionRef.current.getContext('2d');
            if (chartDistribucionInstance.current) {
                chartDistribucionInstance.current.destroy();
            }

            const ageRanges = groupByAgeRange(chartDistribucionGeneroEdad);
            const labels = Object.keys(ageRanges);
            const data = Object.values(ageRanges);
            const genderColors = ['#FF6384', '#36A2EB', '#FFCE56']; // Colores para cada género

            chartDistribucionInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Conteo',
                        data: data,
                        backgroundColor: genderColors.map(color => color + '80'), // Opacidad para cada barra
                        borderColor: genderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Conteo'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Rango de Edad'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    }
                }
            });
        }
    };

    useEffect(() => {
        createChartDistribucion();
        return () => {
            if (chartDistribucionInstance.current) {
                chartDistribucionInstance.current.destroy();
            }
        };
    }, [chartDistribucionGeneroEdad]);


    return (
        <div>

            {/* <SearchComponent onSearch={handleSearch} /> */}
            <HeaderTitle>Dashboard indicadores</HeaderTitle>
            <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setSelectedTabIndex(index)}>
                <TabList>
                    <Tab>Indicadores</Tab>
                    <Tab>Indicadores por Filtros</Tab>
                </TabList>
                <TabPanel>
                    <div style={{display: 'flex'}}>
                    <Content>
                        <Box className={"dashboardFisioterapeutasEnMiInstitucion"}>
                            <BoxTitle>FISIOTERAPEUTAS EN MI INSTITUCIÓN</BoxTitle>
                            <SearchInput
                                type="text"
                                placeholder="Buscar fisioterapeuta..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <TableContainer>
                                <Table>
                                    <Thead>
                                        <tr>
                                            <th>Apellido</th>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                        </tr>
                                    </Thead>
                                    <tbody>
                                    {displayedFisioterapeutas.length > 0 ? (
                                        displayedFisioterapeutas.map(fisio => (
                                            <tr key={`fisio-${fisio.ID_USUARIO}`}>
                                                <TableCell data-tip={fisio.APELLIDO}>{fisio.APELLIDO}</TableCell>
                                                <TableCell data-tip={fisio.NOMBRE}>{fisio.NOMBRE}</TableCell>
                                                <TableCell data-tip={fisio.EMAIL}>
                                                    <a href={`mailto:${fisio.EMAIL}`}>{fisio.EMAIL}</a>
                                                </TableCell>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">No hay fisioterapeutas disponibles.</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </TableContainer>
                            <Pagination>
                                <PageButton
                                    disabled={currentPageFisioterapeutas === 1}
                                    onClick={() => setCurrentPageFisioterapeutas(1)}
                                >
                                    <FiChevronsLeft />
                                </PageButton>
                                {renderPageNumbers(currentPageFisioterapeutas, Math.ceil(filteredFisioterapeutas.length / itemsPerPage), setCurrentPageFisioterapeutas)}
                                <PageButton
                                    disabled={currentPageFisioterapeutas === Math.ceil(filteredFisioterapeutas.length / itemsPerPage)}
                                    onClick={() => setCurrentPageFisioterapeutas(Math.ceil(filteredFisioterapeutas.length / itemsPerPage))}
                                >
                                    <FiChevronsRight />
                                </PageButton>
                            </Pagination>
                            <BoxButton onClick={() => downloadExcel(filteredFisioterapeutas, [
                                { headerName: 'Apellido', accessor: 'APELLIDO' },
                                { headerName: 'Nombre', accessor: 'NOMBRE' },
                                { headerName: 'Email', accessor: 'EMAIL' },
                            ], 'FISIOTERAPEUTAS EN MI INSTITUCIÓN', 'FisioEnMiInstitucion')}>Descargar resumen</BoxButton>
                        </Box>

                        <Box className="chart-container dashboardCargaPersonal">
                            <BoxTitleMobile>CARGA DE PERSONAL</BoxTitleMobile>

                            <ChartContainer>
                                {pacientesPorMedico && pacientesPorMedico.length > 0 ? (
                                    <canvas ref={chartRef} />
                                ) : (
                                    <NoDataMessage />
                                )}
                            </ChartContainer>


                        </Box>

                        <CitasDelDia citas={citasDelDia} />
                        <Box className="chart-container dashboardDistribucionGeneroEdad">
                            <BoxTitleMobile>Distribución de Género y Edad</BoxTitleMobile>
                            <ChartContainer>
                                <canvas ref={chartDistribucionRef} />
                            </ChartContainer>
                            {chartDistribucionGeneroEdad.length === 0 && <NoDataMessage />}
                        </Box>

                    </Content>

                    </div>
                </TabPanel>

                <TabPanel>
                    <div style={{ display: 'flex', position: 'relative' }}>
                        <Content>
                            {/* Solo muestra el ícono en este tab */}
                            {selectedTabIndex === 1 && (
                                <FilterIcon onClick={toggleFilter}>
                                    <FiFilter size={30} />
                                </FilterIcon>
                            )}
                            {/* Modal para Filtros */}
                            {isFilterOpen && (
                                <ModalContainer isOpen={isFilterOpen}>
                                    <ModalContent>
                                        <CloseButton onClick={toggleFilter}>
                                            <FiX />
                                        </CloseButton>
                                        <DatePickerContainer>
                                            <DatePickerWrapper>
                                                <DatePickerLabel>Fecha de inicio:</DatePickerLabel>
                                                <StyledDatePicker
                                                    selected={tempStartDate}
                                                    dateFormat="yyyy-MM-dd"
                                                    onChange={date => setTempStartDate(date)}
                                                    popperPlacement="top"
                                                />
                                            </DatePickerWrapper>
                                            <DatePickerWrapper>
                                                <DatePickerLabel>Fecha de fin:</DatePickerLabel>
                                                <StyledDatePicker
                                                    selected={tempEndDate}
                                                    dateFormat="yyyy-MM-dd"
                                                    onChange={date => setTempEndDate(date)}
                                                    popperPlacement="top"
                                                />
                                            </DatePickerWrapper>
                                        </DatePickerContainer>
                                        <ButtonAceptar
                                            onClick={() => handleDateChange(tempStartDate, tempEndDate)}
                                        >
                                            Aceptar
                                        </ButtonAceptar>
                                    </ModalContent>
                                </ModalContainer>
                            )}

                            <Box className="chart-container dashboardPromedioDuracionAtencion">
                                <BoxTitleMobile>Cantidad de Citas por Estado</BoxTitleMobile>
                                <ChartContainer>
                                    <canvas ref={chartData}></canvas>
                                </ChartContainer>
                                {isCitasPorEstadoLoaded && citasPorEstado && citasPorEstado.length === 0 && <NoDataMessage />}
                            </Box>

                            <Box className={"dashboardUltimosPacientesIngresados"}>
                                <BoxTitle>ULTIMOS PACIENTES INGRESADOS</BoxTitle>
                                {isPacientesIngresadosLoaded && pacientesIngresados.length === 0 ? (
                                    <NoDataMessage />
                                ) : (
                                    <>
                                        <TableContainer>
                                            <Table>
                                                <Thead>
                                                    <tr>
                                                        <th>Apellido</th>
                                                        <th>Nombre</th>
                                                        <th>Fecha de Ingreso</th>
                                                    </tr>
                                                </Thead>
                                                <tbody>
                                                {displayedPacientesIngresados.length > 0 ? (
                                                    displayedPacientesIngresados.map(paciente => (
                                                        <tr key={paciente.ID_USUARIO}>
                                                            <TableCell>{paciente.APELLIDO}</TableCell>
                                                            <TableCell>{paciente.NOMBRE}</TableCell>
                                                            <TableCell>{convertToNormalDateOnly(paciente.FECHA_INGRESO)}</TableCell>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3">No hay pacientes recientes.</td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </Table>
                                        </TableContainer>
                                        <Pagination>
                                            <PageButton
                                                disabled={currentPagePacientesIngresados === 1}
                                                onClick={() => setCurrentPagePacientesIngresados(1)}
                                            >
                                                <FiChevronsLeft />
                                            </PageButton>
                                            {renderPageNumbers(currentPagePacientesIngresados, Math.ceil(pacientesIngresados.length / itemsPerPage), setCurrentPagePacientesIngresados)}
                                            <PageButton
                                                disabled={currentPagePacientesIngresados === Math.ceil(pacientesIngresados.length / itemsPerPage)}
                                                onClick={() => setCurrentPagePacientesIngresados(Math.ceil(pacientesIngresados.length / itemsPerPage))}
                                            >
                                                <FiChevronsRight />
                                            </PageButton>
                                        </Pagination>
                                        <BoxButton onClick={() => downloadExcel(pacientesIngresados, [
                                            { headerName: 'Apellido', accessor: 'APELLIDO' },
                                            { headerName: 'Nombre', accessor: 'NOMBRE' },
                                            { headerName: 'Fecha ingreso', accessor: 'FECHA_INGRESO', isDate: true },
                                        ], 'ULTIMOS PACIENTES INGRESADOS', 'UltimosPacientesIngresados')}>
                                            Descargar resumen
                                        </BoxButton>
                                    </>
                                )}
                            </Box>
                            <Box className={"dashboardUltimosPacientesAlta"}>
                                <BoxTitle>ULTIMOS PACIENTES DE ALTA</BoxTitle>
                                {isPacientesAltaLoaded && pacientesAlta.length === 0 ? (
                                    <NoDataMessage />
                                ) : (
                                    <>
                                        <TableContainer>
                                            <Table>
                                                <Thead>
                                                    <tr>
                                                        <th>Apellido</th>
                                                        <th>Nombre</th>
                                                        <th>Fecha de Ingreso</th>
                                                        <th>Fecha de Alta</th>
                                                    </tr>
                                                </Thead>
                                                <tbody>
                                                {displayedPacientesAlta.length > 0 ? (
                                                    displayedPacientesAlta.map(paciente => (
                                                        <tr key={paciente.ID_USUARIO}>
                                                            <TableCell>{paciente.APELLIDO}</TableCell>
                                                            <TableCell>{paciente.NOMBRE}</TableCell>
                                                            <TableCell>{convertToNormalDateOnly(paciente.FECHA_INGRESO)}</TableCell>
                                                            <TableCell>{convertToNormalDateOnly(paciente.FECHA_DE_ALTA)}</TableCell>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4">No hay pacientes de alta.</td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </Table>
                                        </TableContainer>
                                        <Pagination>
                                            <PageButton
                                                disabled={currentPagePacientesAlta === 1}
                                                onClick={() => setCurrentPagePacientesAlta(1)}
                                            >
                                                <FiChevronsLeft />
                                            </PageButton>
                                            {renderPageNumbers(currentPagePacientesAlta, Math.ceil(pacientesAlta.length / itemsPerPage), setCurrentPagePacientesAlta)}
                                            <PageButton
                                                disabled={currentPagePacientesAlta === Math.ceil(pacientesAlta.length / itemsPerPage)}
                                                onClick={() => setCurrentPagePacientesAlta(Math.ceil(pacientesAlta.length / itemsPerPage))}
                                            >
                                                <FiChevronsRight />
                                            </PageButton>
                                        </Pagination>
                                        <BoxButton onClick={() => downloadExcel(pacientesAlta, [
                                            { headerName: 'Apellido', accessor: 'APELLIDO' },
                                            { headerName: 'Nombre', accessor: 'NOMBRE' },
                                            { headerName: 'Fecha ingreso', accessor: 'FECHA_INGRESO', isDate: true },
                                            { headerName: 'Fecha de Alta', accessor: 'FECHA_DE_ALTA', isDate: true },
                                        ], 'ULTIMOS PACIENTES DE ALTA', 'UltimosPacientesDeAlta')}>
                                            Descargar resumen
                                        </BoxButton>
                                    </>
                                )}
                            </Box>

                            <Box className="graficaHistogramaHorasCitas">
                                <BoxTitleMobile>Horas más ocupadas</BoxTitleMobile>
                                <ChartContainer>
                                    <canvas ref={histogramaRef} />
                                </ChartContainer>
                                {isHistogramDataLoaded && horasCitas && horasCitas.length === 0 && <NoDataMessage />}
                            </Box>

                        </Content>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};
    export default Dashboard;
