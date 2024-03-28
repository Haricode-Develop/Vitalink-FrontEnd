import React, { useEffect, useState, useContext,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import SearchComponent from "../../components/IASearch/IASearch";
import {
    Content,
    Box,
    BoxTitle,
    BoxButton,
    DashboardContainer,
    SearchInput,
    Table,
    TableContainer,
    TableCell,
    ChartContainer,
    ChartContainerTime,
    BoxTitleMobile, Thead
} from './DashboardStyle';
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import SearchFileIndicator from "../../components/SearchFileIndicator/SearchFileIndicator";
import {API_BASE_URL} from "../../utils/config";
import { useSede } from '../../context/SedeContext'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';

import ReactTooltip from 'react-tooltip';
import Chart from 'chart.js/auto';

import styled from 'styled-components';

import swal from 'sweetalert';
const Dashboard = () => {

    const {userData, logout} = useContext(AuthContext);
    const { idSedeActual, isSedeInfoLoaded } = useSede();

    const navigate = useNavigate();
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const chartRefTime = useRef(null);
    const chartInstanceTime = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [fisioterapeutas, setFisioterapeutas] = useState([]);
    const [pacientesAlta, setPacientesAlta] = useState([]);
    const [pacientesIngresados, setPacientesIngresados] = useState([]);
    const [areasAfectadas, setAreasAfectadas] = useState([]);
    const [pacientesPorMedico, setPacientesPorMedico] = useState([]);
    const [promedioTiempoTratamientoPorMes, setPromedioTiempoTratamientoPorMes] = useState([]);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [citasSemanales, setCitasSemanales] = useState(null);
    const [horasCitas, setHorasCitas] = useState([]);
    const histogramaRef = useRef(null);


    const filteredFisioterapeutas = fisioterapeutas.filter(fisio =>
        fisio.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fisio.APELLIDO.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fisio.EMAIL.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        if (userData.estado_contrasena === 1) {
            promptChangePassword();
        }
    }, [userData]);

    useEffect(() =>{
        if(isSedeInfoLoaded){
            fetchFisioterapeutas(idSedeActual);
            fetchPacientesAlta(idSedeActual);
            fetchPacientesIngresados(idSedeActual);
            fetchPacientesAsignados(idSedeActual);
            fetchCitasSemanales(idSedeActual);
            fetchHistogramaDeHoras(idSedeActual);
        }

    }, [idSedeActual,isSedeInfoLoaded]);

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

    const getFormattedDateTime = () => {
        const now = new Date();
        return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    };
    const adjustColumnWidths = (worksheet, headers) => {
        headers.forEach((header, index) => {
            let maxWidth = 10;
            worksheet.eachRow((row) => {
                const cellValue = row.getCell(index + 1).value;
                const cellLength = cellValue ? cellValue.toString().length : 0;
                if (cellLength > maxWidth) {
                    maxWidth = cellLength;
                }
            });
            worksheet.getColumn(index + 1).width = maxWidth < 10 ? 10 : maxWidth + 2;
        });
    };
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




    const downloadExcel = (data, headers, titulo, nombreArchivoBase) => {
        if (data.length === 0) {
            swal("No hay registros", "No hay datos disponibles para descargar.", "warning");
            return;
        }
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Hoja1');

        // Configura la fila de título y aplica estilos
        worksheet.mergeCells(1, 1, 3, headers.length);
        const titleCell = worksheet.getCell('A1');
        titleCell.value = titulo;
        titleCell.style = {
            font: { size: 14, bold: true, color: { argb: 'FFFFFFFF' } },
            alignment: { horizontal: 'center', vertical: 'middle' },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF072B4A' } },
        };

        // Configura los encabezados y sus estilos
        const headerRow = worksheet.getRow(4);
        headerRow.values = headers.map(header => header.headerName);
        headers.forEach((header, i) => {
            const cell = headerRow.getCell(i + 1);
            cell.font = { bold: true, color: { argb: 'FF000000' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCCCCCC' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF000000' } },
                left: { style: 'thin', color: { argb: 'FF000000' } },
                bottom: { style: 'thin', color: { argb: 'FF000000' } },
                right: { style: 'thin', color: { argb: 'FF000000' } },
            };
        });

        // Ajusta el ancho de las columnas según el contenido
        data.forEach((item, index) => {
            const rowIndex = index + 5; // Comienza después de los encabezados
            const row = worksheet.getRow(rowIndex);
            row.values = headers.map(header => {
                let value = item[header.accessor];
                // Si el encabezado es una fecha, convierte el valor
                if (header.isDate && value) {
                    value = convertToNormalDateOnly(value);
                }
                return value;
            });
            // Autoajuste del ancho de la columna
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const column = worksheet.getColumn(colNumber);
                const value = cell.value;
                let columnWidth = value ? value.toString().length : 0;
                if (columnWidth > column.width) {
                    column.width = columnWidth < 10 ? 10 : columnWidth + 2;
                }
            });
        });
        adjustColumnWidths(worksheet, headers);

        // Guarda el archivo
        workbook.xlsx.writeBuffer().then((buffer) => {
            const formattedDateTime = getFormattedDateTime();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `${nombreArchivoBase}_${formattedDateTime}.xlsx`);
        });
    };
    const fetchCitasSemanales = async (idSedeActual) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/promedioPacientesDia/${idSedeActual}`);
            setCitasSemanales(response.data.citasSemanales);
        } catch (error) {
            console.error("Error al obtener las citas semanales:", error);
        }
    };

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



    useEffect(() => {
        createChart();
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [pacientesPorMedico]);



    // ESTA ES LA PETICIÓN  PARA GRÁFICA POR TIEMPO DE PACIENTeE
    const createChartTime = () => {
        if (chartRefTime.current && citasSemanales) {
            const ctx = chartRefTime.current.getContext('2d');
            if (chartInstanceTime.current) {
                chartInstanceTime.current.destroy();
            }

            const labels = citasSemanales.map((item) =>
                moment(item.Dia).format('dddd, MMMM Do'));

            const data = citasSemanales.map((item) => item.Cantidad_Pacientes_Atendidos);

            chartInstanceTime.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cantidad de Pacientes Atendidos por Día',
                            data: data,
                            borderColor: 'rgba(31, 136, 162, 1)',
                            borderWidth: 2,
                            fill: true,
                            backgroundColor: 'rgba(31, 136, 162, 0.2)',
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'category',
                            position: 'bottom',
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'index',
                            intersect: false,
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        }
    };
    useEffect(() => {
        createChartTime();
    }, [promedioTiempoTratamientoPorMes]);


    useEffect(() => {
        createChartTime();
    }, [citasSemanales]);


    useEffect(() => {
        createChartTime();

        return () => {
            if (chartInstanceTime.current) {
                chartInstanceTime.current.destroy();
            }
        };
    }, [promedioTiempoTratamientoPorMes]);





    const fetchPacientesAlta = async (idSedeActual) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/ultimosPacientesAltaPorSede/${idSedeActual}`);

            setPacientesAlta(response.data.pacientes);

        } catch (error) {
            console.error("Error al obtener pacientes de alta:", error);
        }
    };

    const fetchPacientesIngresados = async (idSedeActual) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/ultimosPacientesIngresadosPorSede/${idSedeActual}`);
            setPacientesIngresados(response.data.pacientes);
        } catch (error) {
            console.error("Error al obtener pacientes ingresados:", error);
        }
    };


    const fetchPacientesAsignados = async(idSedeActual) => {
        try{
            const response = await axios.get(`${API_BASE_URL}/dashboard/pacientesAsignados/${idSedeActual}`);
            setPacientesPorMedico(response.data.detalleMedico);
        }catch(error){
            console.error("Error al obtener pacientes asignados:", error);

        }
    }

    const fetchHistogramaDeHoras = async (idSedeActual) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dashboard/distribucionHorasCitas/${idSedeActual}`);
            setHorasCitas(response.data);
        } catch (error) {
            console.error("Error al obtener datos para el histograma:", error);
        }
    };

    useEffect(() => {
        const ctx = histogramaRef.current.getContext('2d');
        if (ctx && horasCitas && Array.isArray(horasCitas.distribucionHorasCitas)) {
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: horasCitas.distribucionHorasCitas.map(dato => `${dato.HoraDelDia} hs`),
                    datasets: [{
                        label: 'Cantidad de Citas',
                        data: horasCitas.distribucionHorasCitas.map(dato => dato.CantidadDeCitas),
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

            return () => chart.destroy();
        }
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

    return (
        <div>


            {/* <SearchComponent onSearch={handleSearch} /> */}
            <div className={"dashboardFichasClinicas"}>
                <SearchFileIndicator onSelectFile={handleSelectFile} />
                {selectedFileUrl && <PdfViewer fileUrl={selectedFileUrl} />}
            </div>

            <div style={{display: 'flex'}}>
            <Content>
                <Box className={"dashboardFisioterapeutasEnMiInstitucion"}>
                    <BoxTitle>FISIOTERAPEUTAS EN MI INSTITUCIÓN</BoxTitle>
                    <SearchInput
                        type="text"
                        placeholder="Buscar fisioterapeuta..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
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
                            {filteredFisioterapeutas.length > 0 ? (
                                filteredFisioterapeutas.map(fisio => (
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
                    <BoxButton onClick={() => downloadExcel(filteredFisioterapeutas, [
                        { headerName: 'Apellido', accessor: 'APELLIDO' },
                        { headerName: 'Nombre', accessor: 'NOMBRE' },
                        { headerName: 'Email', accessor: 'EMAIL' },
                    ],'FISIOTERAPEUTAS EN MI INSTITUCIÓN', 'FisioEnMiInstitucion')}>Descargar resumen</BoxButton>

                </Box>


                <Box className="chart-container dashboardPromedioDuracionAtencion">
                    <BoxTitle>Cantidad Pacientes por día</BoxTitle>
                    <ChartContainerTime>
                        <canvas ref={chartRefTime} style={{ width: '100%'}}></canvas>
                    </ChartContainerTime>
                </Box>
                <Box className={"dashboardUltimosPacientesIngresados"}>
                    <BoxTitle>ULTIMOS PACIENTES INGRESADOS</BoxTitle>
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
                            {pacientesIngresados.length > 0 ? (
                                pacientesIngresados.map(paciente => (
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
                    <BoxButton onClick={() =>  downloadExcel(pacientesIngresados,[
                        { headerName: 'Apellido', accessor: 'APELLIDO' },
                        { headerName: 'Nombre', accessor: 'NOMBRE' },
                        { headerName: 'Fecha ingreso', accessor: 'FECHA_INGRESO', isDate: true  },
                    ], 'ULTIMOS PACIENTES INGRESADOS', 'UltimosPacientesIngresados')}>
                        Descargar resumen
                    </BoxButton>
                </Box>
                <Box className="chart-container dashboardCargaPersonal">
                    <BoxTitleMobile>CARGA DE PERSONAL</BoxTitleMobile>

                    <ChartContainer>

                        <canvas ref={chartRef}></canvas>
                    </ChartContainer>


                </Box>

                <Box className={"dashboardUltimosPacientesAlta"}>
                    <BoxTitle>ULTIMOS PACIENTES DE ALTA</BoxTitle>
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
                            {pacientesAlta.length > 0 ? (
                                pacientesAlta.map(paciente => (
                                    <tr key={paciente.ID_USUARIO}>
                                        <TableCell data-tip={paciente.APELLIDO}>{paciente.APELLIDO}</TableCell>
                                        <TableCell data-tip={paciente.NOMBRE}>{paciente.NOMBRE}</TableCell>
                                        <TableCell data-tip={convertToNormalDateOnly(paciente.FECHA_INGRESO)}>{convertToNormalDateOnly(paciente.FECHA_INGRESO)}</TableCell>
                                        <TableCell data-tip={convertToNormalDateOnly(paciente.FECHA_DE_ALTA)}>{convertToNormalDateOnly(paciente.FECHA_DE_ALTA)}</TableCell>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No hay pacientes de alta.</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </TableContainer>

                    <BoxButton onClick={() => downloadExcel(pacientesAlta,[
                        { headerName: 'Apellido', accessor: 'APELLIDO' },
                        { headerName: 'Nombre', accessor: 'NOMBRE' },
                        { headerName: 'Fecha ingreso', accessor: 'FECHA_INGRESO', isDate: true  },
                        { headerName: 'Fecha de Alta', accessor: 'FECHA_DE_ALTA', isDate: true  },
                        { headerName: 'Descripción patología', accessor: 'DESCRIPCION_PATOLOGIA' },
                    ], 'ULTIMOS PACIENTES DE ALTA', 'UltimosPacientesDeAlta')}>
                        Descargar resumen
                    </BoxButton>
                </Box>

                <Box className="graficaHistogramaHorasCitas">
                    <BoxTitleMobile>Horas más ocupadas</BoxTitleMobile>
                    <canvas ref={histogramaRef}></canvas>
                </Box>

            </Content>
        </div>
        </div>
    );
};
    export default Dashboard;
