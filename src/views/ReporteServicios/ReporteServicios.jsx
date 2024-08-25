import React, { useEffect, useRef, useState, useContext } from 'react';
import Chart from 'chart.js/auto';
import { FaFilter } from 'react-icons/fa';
import update from 'immutability-helper';
import {
    DashboardContainer,
    CardContainer,
    CardContent,
    CardTitle,
    ChartContainer,
    NumericIndicator,
    FilterButton,
    HeaderTitle
} from './ReporteServiciosStyle';
import DateFilter from '../../components/DateFilter/DateFilter';
import { StyledModal } from '../../components/Modal';
import axios from 'axios';
import moment from 'moment';
import { API_BASE_URL } from "../../utils/config";
import { useSede } from "../../context/SedeContext";
import CardWithDragAndDrop from "../../components/CardWithDragAndDrop/CardDragAndDrop";
import { AuthContext } from "../../context/AuthContext";

const ReporteServicios = () => {
    const totalSalesRef = useRef(null);
    const transactionCountRef = useRef(null);
    const averageSalesRef = useRef(null);
    const servicesSalesRef = useRef(null);
    const packagesSalesRef = useRef(null);
    const totalServicesRef = useRef(null);

    const totalSalesChart = useRef(null);
    const transactionCountChart = useRef(null);
    const averageSalesChart = useRef(null);
    const servicesSalesChart = useRef(null);
    const packagesSalesChart = useRef(null);
    const totalServicesChart = useRef(null);

    const [totalSales, setTotalSales] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);
    const [averageSales, setAverageSales] = useState(0);
    const [totalServices, setTotalServices] = useState(0);
    const [currency, setCurrency] = useState('');
    const { idSedeActual } = useSede();
    const [charts, setCharts] = useState({});
    const [cards, setCards] = useState([]);
    const [boardConfigLoaded, setBoardConfigLoaded] = useState(false);

    const currentMonthStart = moment().startOf('month').toDate();
    const currentMonthEnd = moment().endOf('month').toDate();

    const [startDate, setStartDate] = useState(currentMonthStart);
    const [endDate, setEndDate] = useState(currentMonthEnd);
    const [showDateFilter, setShowDateFilter] = useState(false);
    const { userData } = useContext(AuthContext);

    const adjustDatesForUTC = (start, end) => {
        const adjustedStartDate = moment(start).utc().set({ hour: 6, minute: 0, second: 0 });
        const adjustedEndDate = moment(end).utc().add(1, 'day').set({ hour: 5, minute: 59, second: 59 });
        return { adjustedStartDate, adjustedEndDate };
    };

    const formatDatesForAPI = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
    };

    const fetchData = async () => {
        try {
            const { adjustedStartDate, adjustedEndDate } = adjustDatesForUTC(startDate, endDate);
            const formattedStartDate = formatDatesForAPI(adjustedStartDate);
            const formattedEndDate = formatDatesForAPI(adjustedEndDate);

            const [salesResponse, packagesResponse, transactionsResponse, totalServicesResponse] = await Promise.allSettled([
                axios.get(`${API_BASE_URL}/dashboardIndicadores/ventas-servicios/${idSedeActual}`, { params: { startDate: formattedStartDate, endDate: formattedEndDate } }),
                axios.get(`${API_BASE_URL}/dashboardIndicadores/ventas-paquetes/${idSedeActual}`, { params: { startDate: formattedStartDate, endDate: formattedEndDate } }),
                axios.get(`${API_BASE_URL}/dashboardIndicadores/transacciones-servicios-paquetes/${idSedeActual}`, { params: { startDate: formattedStartDate, endDate: formattedEndDate } }),
                axios.get(`${API_BASE_URL}/dashboardIndicadores/cantidad-servicios-vendidos/${idSedeActual}`, { params: { startDate: formattedStartDate, endDate: formattedEndDate } })
            ]);

            const salesData = salesResponse.status === 'fulfilled' ? salesResponse.value.data.ventasServicios : [];
            const packagesData = packagesResponse.status === 'fulfilled' ? packagesResponse.value.data.ventasPaquetes : [];
            const transactionsData = transactionsResponse.status === 'fulfilled' ? transactionsResponse.value.data.transacciones : [];
            const totalServicesData = totalServicesResponse.status === 'fulfilled' ? totalServicesResponse.value.data.cantidadServiciosVendidos : [];

            const totalSalesAmount = salesData.reduce((a, b) => a + parseFloat(b.total_ventas), 0);
            const totalTransactionCount = transactionsData.reduce((a, b) => a + parseInt(b.total_transacciones), 0);
            const avgSales = totalTransactionCount === 0 ? 0 : totalSalesAmount / totalTransactionCount;
            const totalServicesSold = totalServicesData.reduce((a, b) => a + parseInt(b.total_vendidos, 10), 0);
            const currency = salesData[0]?.moneda || '';

            setTotalSales(totalSalesAmount);
            setTransactionCount(totalTransactionCount);
            setAverageSales(avgSales);
            setTotalServices(totalServicesSold);
            setCurrency(currency);

            if (totalSalesRef.current && totalSalesRef.current.getContext) updateChart(totalSalesRef.current, totalSalesChart, salesData, 'Ventas Totales', 'bar', 'servicio');
            if (transactionCountRef.current && transactionCountRef.current.getContext) updateChart(transactionCountRef.current, transactionCountChart, transactionsData, 'Transacciones por Usuario', 'pie', 'usuario');
            if (averageSalesRef.current && averageSalesRef.current.getContext) updateChart(averageSalesRef.current, averageSalesChart, salesData, 'Ventas Promedio', 'doughnut', 'servicio');
            if (servicesSalesRef.current && servicesSalesRef.current.getContext) updateChart(servicesSalesRef.current, servicesSalesChart, salesData, 'Ventas de Servicios por Día', 'bar', 'fecha');
            if (packagesSalesRef.current && packagesSalesRef.current.getContext) updateChart(packagesSalesRef.current, packagesSalesChart, packagesData, 'Ventas de Paquetes por Día', 'bar', 'fecha');
            if (totalServicesRef.current && totalServicesRef.current.getContext) updateChart(totalServicesRef.current, totalServicesChart, totalServicesData, 'Total de Servicios', 'bar', 'servicio');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchBoardConfig = async (userId, sedeId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/gestionDeNegocios/board-config/${userId}/${sedeId}`);
            const boardConfig = response.data;

            console.log("ESTE ES EL BOARDING CONFIGURACIÓN", boardConfig);
            if (boardConfig.length === 0) {
                // Configuración predeterminada
                const defaultCards = [
                    { id: 1, content: { title: "Ventas Totales", chart: "totalSalesChart" } },
                    { id: 2, content: { title: "Transacciones", chart: "transactionCountChart" } },
                    { id: 3, content: { title: "Ventas Promedio", chart: "averageSalesChart" } },
                    { id: 4, content: { title: "Ventas de Servicios por Día", chart: "servicesSalesChart" } },
                    { id: 5, content: { title: "Ventas de Paquetes por Día", chart: "packagesSalesChart" } },
                    { id: 6, content: { title: "Total de Servicios", chart: "totalServicesChart" } }
                ];
                setCards(defaultCards);
            } else {
                setCards(boardConfig.map(config => ({
                    id: config.ID_CARD,
                    content: typeof config.CARD_CONTENT === 'string' ? JSON.parse(config.CARD_CONTENT.replace(/^"|"$/g, '').replace(/\\"/g, '"')) : config.CARD_CONTENT, // Deserializar y limpiar las barras invertidas si es una cadena
                    position: config.POSITION
                })));
            }
            setBoardConfigLoaded(true); // Configuración cargada
        } catch (error) {
            console.error('Error fetching board config:', error);
        }
    };

    const saveBoardConfig = async (userId, sedeId, cards) => {
        try {
            const payload = {
                userId,
                sedeId,
                cards: cards.map((card, index) => ({
                    id: card.id,
                    content: typeof card.content === 'string' ? card.content : JSON.stringify(card.content), // Serializar solo si no es una cadena
                    position: index
                }))
            };
            await axios.post(`${API_BASE_URL}/gestionDeNegocios/board-config`, payload);
        } catch (error) {
            console.error('Error saving board config:', error);
        }
    };

    useEffect(() => {
        const userId = userData.id_usuario;
        fetchBoardConfig(userId, idSedeActual).then(() => {
            fetchData();
        });
    }, [idSedeActual, startDate, endDate]);

    useEffect(() => {
        const userId = userData.id_usuario;
        if (cards.length > 0) {
            saveBoardConfig(userId, idSedeActual, cards);
        }
    }, [cards]);

    const destroyChart = (chartRef) => {
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
    };

    const hexToRgba = (hex, alpha = 1) => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const generateColorArray = (baseColor, length) => {
        const colorArray = [];
        let base;

        if (baseColor.startsWith('rgba')) {
            base = baseColor.match(/\d+/g).map(Number);
            base.push(1); // Add alpha value
        } else if (baseColor.startsWith('#')) {
            base = hexToRgba(baseColor).match(/\d+/g).map(Number);
        } else {
            console.error("Color base no válido:", baseColor);
            return colorArray;
        }

        for (let i = 0; i < length; i++) {
            const factor = 1 - i / (length * 1.5);
            const color = `rgba(${base[0] * factor}, ${base[1] * factor}, ${base[2] * factor}, ${base[3]})`;
            colorArray.push(color);
        }
        return colorArray;
    };

    const updateChart = (canvasRef, chartRef, data, label, type, axisType = 'fecha') => {
        destroyChart(chartRef);

        const style = getComputedStyle(document.documentElement);
        const primaryColor = style.getPropertyValue('--celeste').trim();
        const primaryColorRgba = style.getPropertyValue('--celeste-rgba').trim();
        const secondaryColorRgba = style.getPropertyValue('--rojo-rgba').trim();

        const backgroundColors = generateColorArray(primaryColorRgba, data.length);
        const borderColors = generateColorArray(primaryColor, data.length);

        let chartData = data;
        if (axisType === 'fecha') {
            if (label === 'Ventas de Servicios por Día' || label === 'Ventas de Paquetes por Día') {
                const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                const salesByDay = Array(7).fill(0);

                data.forEach(item => {
                    const date = new Date(item.fecha);
                    const day = date.getDay();
                    salesByDay[day] += parseFloat(item.total_ventas);
                });

                chartData = {
                    labels: days,
                    datasets: [{
                        label,
                        data: salesByDay,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                };
            } else {
                chartData = {
                    labels: data.map(item => moment(item.fecha).format('YYYY-MM-DD')),
                    datasets: [{
                        label,
                        data: data.map(item => parseFloat(item.total_ventas || item.total_transacciones)),
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                };
            }
        } else if (axisType === 'usuario') {
            chartData = {
                labels: data.map(item => item.usuario),
                datasets: [{
                    label,
                    data: data.map(item => parseInt(item.total_transacciones, 10)),
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            };
        } else {
            // Agrupar los datos por servicio
            const groupedData = data.reduce((acc, item) => {
                const serviceName = item.servicio || item.paquete;
                if (!acc[serviceName]) {
                    acc[serviceName] = 0;
                }
                acc[serviceName] += parseFloat(item.total_ventas || item.total_vendidos);
                return acc;
            }, {});

            const groupedLabels = Object.keys(groupedData);
            const groupedValues = Object.values(groupedData);

            chartData = {
                labels: groupedLabels,
                datasets: [{
                    label,
                    data: groupedValues,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            };
        }

        chartRef.current = new Chart(canvasRef, {
            type,
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                if (axisType === 'usuario') {
                                    const user = data[tooltipItem.dataIndex];
                                    return `${user.usuario}: ${user.total_transacciones} (Paquetes: ${user.paquetes}, Servicios: ${user.servicios})`;
                                }
                                return tooltipItem.raw;
                            }
                        }
                    },
                    legend: {
                        display: type !== 'pie'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const checkEmptyData = (data, label) => {
        return data.length === 0 ? "No hay datos" : label;
    };

    const moveCard = (dragIndex, hoverIndex) => {
        const draggedCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, draggedCard]
            ]
        }));
    };

    const renderCardContent = (content) => {
        switch (content.chart) {
            case 'totalSalesChart':
                return <CardContent> <CardTitle>{content.title}</CardTitle> <NumericIndicator>{currency}{totalSales.toFixed(2)}</NumericIndicator> <ChartContainer> <canvas ref={totalSalesRef}></canvas> </ChartContainer> </CardContent>;
            case 'transactionCountChart':
                return <CardContent> <CardTitle>{content.title}</CardTitle> <NumericIndicator>{transactionCount}</NumericIndicator> <ChartContainer> <canvas ref={transactionCountRef}></canvas> </ChartContainer>  </CardContent>;
            case 'averageSalesChart':
                return <CardContent> <CardTitle>{content.title}</CardTitle> <NumericIndicator>{currency}{averageSales.toFixed(2)}</NumericIndicator> <ChartContainer> <canvas ref={averageSalesRef}></canvas> </ChartContainer> </CardContent>;
            case 'servicesSalesChart':
                return <CardContent> <CardTitle>{content.title}</CardTitle> <ChartContainer> <canvas ref={servicesSalesRef}></canvas> </ChartContainer> </CardContent>;
            case 'packagesSalesChart':
                return <CardContent> <CardTitle>{content.title}</CardTitle> <ChartContainer> <canvas ref={packagesSalesRef}></canvas></ChartContainer>  </CardContent>;
            case 'totalServicesChart':
                return <CardContent> <CardTitle>{content.title}</CardTitle> <NumericIndicator>{totalServices}</NumericIndicator> <ChartContainer> <canvas ref={totalServicesRef}></canvas> </ChartContainer> </CardContent>;
            default:
                return null;
        }
    };

    return (
        <div>
            <HeaderTitle>Reporte de servicios</HeaderTitle>
            <DashboardContainer>
                <FilterButton onClick={() => setShowDateFilter(true)}>
                    <FaFilter />
                </FilterButton>
                <StyledModal isOpen={showDateFilter} onRequestClose={() => setShowDateFilter(false)}>
                    <DateFilter
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                    />
                    <button onClick={() => { setShowDateFilter(false); fetchData(); }} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Filtrar
                    </button>
                </StyledModal>
                {boardConfigLoaded && cards.map((card, index) => (
                    <CardWithDragAndDrop key={card.id} index={index} id={card.id} moveCard={moveCard}>
                        <CardContainer>
                            {renderCardContent(card.content)}
                        </CardContainer>
                    </CardWithDragAndDrop>
                ))}
            </DashboardContainer>
        </div>
    );
};

export default ReporteServicios;
