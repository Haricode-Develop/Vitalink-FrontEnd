import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { FaFilter } from 'react-icons/fa';
import {
    DashboardContainer,
    CardContainer,
    CardContent,
    CardTitle,
    ChartContainer,
    NumericIndicator,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    FilterButton
} from './ReporteServiciosStyle';
import DateFilter from '../../components/DateFilter/DateFilter';
import { StyledModal } from '../../components/Modal';
import axios from 'axios';
import moment from 'moment';
import { API_BASE_URL } from "../../utils/config";
import { useSede } from "../../context/SedeContext";
import { HeaderTitle } from "../Dashboard/DashboardStyle";

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
    const [charts, setCharts] = useState({});
    const { idSedeActual } = useSede();

    // Obtener el rango de fechas del mes actual
    const currentMonthStart = moment().startOf('month').toDate();
    const currentMonthEnd = moment().endOf('month').toDate();

    const [startDate, setStartDate] = useState(currentMonthStart);
    const [endDate, setEndDate] = useState(currentMonthEnd);
    const [showDateFilter, setShowDateFilter] = useState(false);

    const fetchData = async () => {
        try {
            const [salesResponse, packagesResponse, transactionsResponse, totalServicesResponse] = await Promise.allSettled([
                axios.get(`${API_BASE_URL}/dashboardIndicadores/ventas-servicios/${idSedeActual}`, { params: { startDate, endDate } }),
                axios.get(`${API_BASE_URL}/dashboardIndicadores/ventas-paquetes/${idSedeActual}`, { params: { startDate, endDate } }),
                axios.get(`${API_BASE_URL}/dashboardIndicadores/transacciones-servicios-paquetes/${idSedeActual}`, { params: { startDate, endDate } }),
                axios.get(`${API_BASE_URL}/dashboardIndicadores/cantidad-servicios-vendidos/${idSedeActual}`, { params: { startDate, endDate } })
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

            updateChart(totalSalesRef.current, totalSalesChart, salesData, 'Ventas Totales', 'bar', 'servicio');
            updateChart(transactionCountRef.current, transactionCountChart, transactionsData, 'Transacciones por Usuario', 'pie', 'usuario');
            updateChart(averageSalesRef.current, averageSalesChart, salesData, 'Ventas Promedio', 'doughnut', 'servicio');
            updateChart(servicesSalesRef.current, servicesSalesChart, salesData, 'Ventas de Servicios por Día', 'bar', 'fecha');
            updateChart(packagesSalesRef.current, packagesSalesChart, packagesData, 'Ventas de Paquetes por Día', 'bar', 'fecha');
            updateChart(totalServicesRef.current, totalServicesChart, totalServicesData, 'Total de Servicios', 'bar', 'servicio');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();

        return () => {
            Object.values(charts).forEach(chart => chart.destroy());
        };
    }, [idSedeActual, startDate, endDate]);

    const destroyChart = (chartRef) => {
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
    };

    const generateColorArray = (baseColor, length) => {
        const colorArray = [];
        const base = baseColor.match(/\d+/g).map(Number);
        for (let i = 0; i < length; i++) {
            const factor = 1 - i / (length * 1.5);
            const color = `rgba(${base[0] * factor}, ${base[1] * factor}, ${base[2] * factor}, ${base[3] || 1})`;
            colorArray.push(color);
        }
        return colorArray;
    };

    const updateChart = (canvasRef, chartRef, data, label, type, axisType = 'fecha') => {
        destroyChart(chartRef);

        // Obtener variables CSS
        const style = getComputedStyle(document.body);
        const primaryColor = style.getPropertyValue('--celeste');
        const primaryColorRgba = style.getPropertyValue('--celeste-rgba');
        const secondaryColorRgba = style.getPropertyValue('--rojo-rgba');

        const backgroundColors = generateColorArray(primaryColorRgba, data.length);
        const borderColors = generateColorArray(primaryColor, data.length);

        let chartData = data;
        if (axisType === 'fecha') {
            if (label === 'Ventas de Servicios por Día' || label === 'Ventas de Paquetes por Día') {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
            chartData = {
                labels: data.map(item => item.servicio || item.paquete),
                datasets: [{
                    label,
                    data: data.map(item => parseFloat(item.total_ventas || item.total_vendidos)),
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
                        display: type !== 'pie' // Ocultar leyenda para gráficos de pie
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
                <CardContainer>
                    <CardContent>
                        <CardTitle>Ventas Totales</CardTitle>
                        <NumericIndicator>{currency}{totalSales.toFixed(2)}</NumericIndicator>
                        <ChartContainer>
                            <canvas ref={totalSalesRef}></canvas>
                        </ChartContainer>
                    </CardContent>
                </CardContainer>
                <CardContainer>
                    <CardContent>
                        <CardTitle>Transacciones</CardTitle>
                        <NumericIndicator>{transactionCount}</NumericIndicator>
                        <ChartContainer>
                            <canvas ref={transactionCountRef}></canvas>
                        </ChartContainer>
                    </CardContent>
                </CardContainer>
                <CardContainer>
                    <CardContent>
                        <CardTitle>Ventas Promedio</CardTitle>
                        <NumericIndicator>{currency}{averageSales.toFixed(2)}</NumericIndicator>
                        <ChartContainer>
                            <canvas ref={averageSalesRef}></canvas>
                        </ChartContainer>
                    </CardContent>
                </CardContainer>
                <CardContainer>
                    <CardContent>
                        <CardTitle>Ventas de Servicios por Día</CardTitle>
                        <ChartContainer>
                            <canvas ref={servicesSalesRef}></canvas>
                        </ChartContainer>
                    </CardContent>
                </CardContainer>
                <CardContainer>
                    <CardContent>
                        <CardTitle>Ventas de Paquetes por Día</CardTitle>
                        <ChartContainer>
                            <canvas ref={packagesSalesRef}></canvas>
                        </ChartContainer>
                    </CardContent>
                </CardContainer>
                <CardContainer>
                    <CardContent>
                        <CardTitle>Total de Servicios</CardTitle>
                        <NumericIndicator>{totalServices}</NumericIndicator>
                        <ChartContainer>
                            <canvas ref={totalServicesRef}></canvas>
                        </ChartContainer>
                    </CardContent>
                </CardContainer>
            </DashboardContainer>
        </div>
    );
};

export default ReporteServicios;