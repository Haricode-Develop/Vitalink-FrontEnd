import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    TabBar,
    Tab,
    TabContent,
    ActiveIndicator,
    DropdownMenu
} from './ConfiguracionStyle';
import axios from 'axios';
import { toast } from 'react-toastify';

import { API_BASE_URL, API_BASE_URL_INSIGHT } from "../../utils/config";
import ConfiguracionCitas from "../../components/ConfiguracionCitas/ConfiguracionCitas";
import { AuthContext } from "../../context/AuthContext";
import { useWebSocket } from '../../context/WebSocketContext';
import GestionPacientes from "../../components/GestionPacientes/GestionPacientes";
import ConfiguracionCuenta from "../../components/ConfiguracionCuenta/ConfiguracionCuenta";
import { useSede } from "../../context/SedeContext";

const Configuracion = () => {
    const [activeTab, setActiveTab] = useState('gestionPacientes');
    const tabsRef = useRef({
        gestionPacientes: null,
        citas: null,
        configuracionCuenta: null
    });
    const inputRefs = useRef({}); // Inicializando inputRefs como un objeto vacío

    const tabs = [
        { id: 'gestionPacientes', label: 'Gestión de Pacientes' },
        { id: 'citas', label: 'Calendario de Citas' },
        { id: 'configuracionCuenta', label: 'Configuración de Cuenta' }
    ];

    const [configuraciones, setConfiguraciones] = useState([]);
    const [tooltips, setTooltips] = useState({});
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [qrCode, setQrCode] = useState('');
    const [loadingQR, setLoadingQR] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [modalImageKey, setModalImageKey] = useState(0);
    const updateTimer = useRef(null);
    const { ws } = useWebSocket();
    const { idSedeActual } = useSede();

    const isChecked = (value) => {
        return ['1', 'true', true].includes(value);
    };

    const { userData } = useContext(AuthContext);

    const validarValorConRegex = (valor, patron) => {
        if (!patron || valor === '') return { valid: true };
        const regex = new RegExp(patron);
        if (regex.test(valor)) {
            return { valid: true };
        } else {
            const invalidChars = [];
            for (let i = 0; i < valor.length; i++) {
                const char = valor[i];
                if (!regex.test(char)) {
                    invalidChars.push(char);
                }
            }
            return {
                valid: false,
                message: `El valor ingresado no cumple con el formato requerido. Caracteres no válidos: "${invalidChars.join('')}"`
            };
        }
    };

    const updateIndicatorStyle = () => {
        const activeTabElement = tabsRef.current[activeTab];
        if (activeTabElement) {
            setIndicatorStyle({
                width: activeTabElement.offsetWidth,
                left: activeTabElement.offsetLeft,
            });
        }
    };

    useEffect(() => {
        updateIndicatorStyle();
        window.addEventListener('resize', updateIndicatorStyle);
        return () => {
            window.removeEventListener('resize', updateIndicatorStyle);
        };
    }, [activeTab]);

    useEffect(() => {
        const cargarConfiguraciones = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/configuraciones/configuracion/${idSedeActual}/${activeTab}`);
                const configs = response.data.configuraciones.map(c => ({
                    ...c,
                    VALOR: c.TIPO === 'boolean' ? c.VALOR === '1' || c.VALOR === 'true' : c.VALOR
                }));
                setConfiguraciones(configs || []);
                for (let config of configs) {
                    await cargarToolTips(config.ID_CONFIGURACION);
                }
            } catch (error) {
                console.error('Error al obtener configuraciones:', error);
                setConfiguraciones([]);
            }
        };

        cargarConfiguraciones();
    }, [activeTab, idSedeActual]);

    const cargarToolTips = async (idConfiguracion) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/configuraciones/tooltip/${idConfiguracion}`);
            setTooltips(prevTooltips => ({
                ...prevTooltips,
                [idConfiguracion]: response.data.tooltip
            }));
        } catch (error) {
            console.error('Error al obtener tooltips:', error);
        }
    };

    const handleInputChange = async (idConfiguracion, clave, nuevoValor, tipo, patron) => {
        const validation = validarValorConRegex(nuevoValor, patron);
        if (tipo !== 'boolean' && !validation.valid) {
            toast.error(validation.message);
            return;
        }

        const valorActualizado = tipo === 'boolean' ? nuevoValor : nuevoValor.toString();
        const configsActualizadas = configuraciones.map(conf =>
            conf.ID_CONFIGURACION === idConfiguracion ? { ...conf, VALOR: valorActualizado } : conf
        );
        setConfiguraciones(configsActualizadas);

        if (clave === 'whatsapp_activado' && nuevoValor) {
            setLoadingQR(true);
            try {
                const response = await axios.post(`${API_BASE_URL_INSIGHT}/reminders/whatsapp/activate/${idSedeActual}/${userData.id_usuario}`);
                setLoadingQR(false);
                if (response.data.success) {
                    setQrCode(response.data.qrCode);
                    setModalImageKey(prevKey => prevKey + 1);
                    setShowQRModal(true);
                } else {
                    console.error('Error al activar WhatsApp:', response.data.error);
                    toast.error('Error al activar WhatsApp');
                }
            } catch (error) {
                console.error('Error al activar WhatsApp:', error);
                setLoadingQR(false);
            }
        } else if (clave === 'whatsapp_activado' && !nuevoValor) {
            try {
                const response = await axios.post(`${API_BASE_URL_INSIGHT}/reminders/whatsapp/desactivar/${idSedeActual}`);
                if (!response.data.success) {
                    console.error('Error al desactivar WhatsApp:', response.data.error);
                }
            } catch (error) {
                console.error('Error al desactivar WhatsApp:', error);
            }
        }

        if (updateTimer.current) clearTimeout(updateTimer.current);

        updateTimer.current = setTimeout(async () => {
            try {
                await axios.patch(`${API_BASE_URL}/configuraciones/configuracion/${idConfiguracion}`, {
                    valor: valorActualizado
                });
            } catch (error) {
                console.error('Error al actualizar configuración:', error);
            }
        }, 10000);
    };

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'WHATSAPP_ACTIVATED') {
                const { isActivated, message } = data;
                if (isActivated) {
                    setShowQRModal(false);
                    toast.success(`WhatsApp activado: ${message}`);
                } else {
                    setShowQRModal(false);
                    toast.warn(`WhatsApp desactivado: ${message}`);
                }
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws]);

    const insertAtCursor = (input, textToInsert) => {
        if (input && typeof input.value === 'string') {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const text = input.value;
            const before = text.substring(0, start);
            const after = text.substring(end, text.length);
            input.value = before + textToInsert + after;
            input.selectionStart = input.selectionEnd = start + textToInsert.length;
            input.focus();
        }
    };

    const handleTooltipClick = (idConfiguracion, tooltip) => {
        const inputRef = inputRefs.current[idConfiguracion];
        if (inputRef && inputRef.current) {
            insertAtCursor(inputRef.current, `[${tooltip}]`);
            const event = new Event('input', { bubbles: true });
            inputRef.current.dispatchEvent(event);
        }
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <>
            <DropdownMenu
                onChange={(e) => handleTabChange(e.target.value)}
                value={activeTab}
            >
                {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                        {tab.label}
                    </option>
                ))}
            </DropdownMenu>

            <TabBar>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.id}
                        ref={(el) => (tabsRef.current[tab.id] = el)}
                        active={activeTab === tab.id}
                        onClick={() => handleTabChange(tab.id)}
                    >
                        {tab.label}
                    </Tab>
                ))}
                <ActiveIndicator style={indicatorStyle} />
            </TabBar>

            <TabContent>
                {activeTab === 'gestionPacientes' && <GestionPacientes />}
                {activeTab === 'citas' && (
                    <ConfiguracionCitas
                        configuraciones={configuraciones}
                        tooltips={tooltips}
                        inputRefs={inputRefs}
                        handleInputChange={handleInputChange}
                        handleTooltipClick={handleTooltipClick}
                        isChecked={isChecked}
                        loadingQR={loadingQR}
                        qrCode={qrCode}
                        showQRModal={showQRModal}
                        modalImageKey={modalImageKey}
                        setShowQRModal={setShowQRModal}
                    />
                )}
                {activeTab === 'configuracionCuenta' && <ConfiguracionCuenta />}
            </TabContent>
        </>
    );
};

export default Configuracion;
