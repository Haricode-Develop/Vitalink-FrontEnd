import React, { useState, useRef, useEffect, useContext, createRef } from 'react';
import { TabBar, Tab, TabContent, ActiveIndicator, ConfigurationWrapper, ConfigurationItem, ConfigurationLabel, ConfigurationInput, ConfigurationInputCheckbox, ModalContent, ConfigurationTextArea, TooltipButton } from './ConfiguracionStyle';
import axios from 'axios';
import { API_BASE_URL, API_BASE_URL_INSIGHT } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import { useWebSocket } from '../../context/WebSocketContext';
import { StyledModal } from "../../components/Modal";
import { toast } from 'react-toastify';
import GestionPacientes from "../../components/GestionPacientes/GestionPacientes";
import Loader from "../../components/Loader/Loader";
import { useSede } from "../../context/SedeContext";

const Configuracion = () => {
    const [activeTab, setActiveTab] = useState('gestionPacientes');
    const [configuraciones, setConfiguraciones] = useState([]);
    const [tooltips, setTooltips] = useState({});
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [qrCode, setQrCode] = useState('');
    const [loadingQR, setLoadingQR] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [modalImageKey, setModalImageKey] = useState(0);
    const tabsRef = useRef({ usuarios: null, citas: null });
    const updateTimer = useRef(null);
    const inputRefs = useRef({});
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

    useEffect(() => {
        const activeTabElement = tabsRef.current[activeTab];
        if (activeTabElement) {
            setIndicatorStyle({
                width: activeTabElement.offsetWidth,
                left: activeTabElement.offsetLeft,
            });
        }
    }, [activeTab]);

    useEffect(() => {
        const cargarConfiguraciones = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/configuraciones/configuracion/${idSedeActual}/${activeTab}`);
                const configs = response.data.configuraciones.map(c => ({
                    ...c,
                    VALOR: c.TIPO === 'boolean' ? c.VALOR === '1' || c.VALOR === 'true' : c.VALOR
                }));
                setConfiguraciones(configs);
                // Cargar tooltips para cada configuración
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

        // Manejo de la activación de WhatsApp
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
                }
                return;
            } catch (error) {
                console.error('Error al activar WhatsApp:', error);
                setLoadingQR(false);
            }
            // Manejo de la desactivación de WhatsApp
        } else if (clave === 'whatsapp_activado' && !nuevoValor) {
            try {
                const response = await axios.post(`${API_BASE_URL_INSIGHT}/reminders/whatsapp/desactivar/${idSedeActual}`);
                if (!response.data.success) {
                    console.error('Error al desactivar WhatsApp:', response.data.error);
                }
            } catch (error) {
                console.error('Error al desactivar WhatsApp:', error);
            }
            return;
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

                // La lógica para manejar el estado activado o desactivado
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

    return (
        <>
            {loadingQR && <Loader />}
            <TabBar>
                <Tab
                    ref={(el) => (tabsRef.current.gestionPacientes = el)}
                    active={activeTab === 'gestionPacientes'}
                    onClick={() => setActiveTab('gestionPacientes')}
                >
                    Gestión de Pacientes
                </Tab>
                <Tab
                    ref={(el) => (tabsRef.current.citas = el)}
                    active={activeTab === 'citas'}
                    onClick={() => setActiveTab('citas')}
                >
                    Calendario de Citas
                </Tab>
                <ActiveIndicator style={indicatorStyle} />
            </TabBar>

            <TabContent>
                {activeTab === 'gestionPacientes' && <GestionPacientes />}

                <ConfigurationWrapper>
                    {configuraciones.map(({ ID_CONFIGURACION, CLAVE, VALOR, DESCRIPCION, TIPO, PATRON }) => {
                        if (!inputRefs.current[ID_CONFIGURACION]) {
                            inputRefs.current[ID_CONFIGURACION] = createRef();
                        }

                        return (
                            <ConfigurationItem key={ID_CONFIGURACION}>
                                <ConfigurationLabel>
                                    {DESCRIPCION || CLAVE}
                                    {TIPO === 'boolean' && (
                                        <ConfigurationInputCheckbox
                                            type="checkbox"
                                            checked={isChecked(VALOR)}
                                            onChange={(e) => handleInputChange(ID_CONFIGURACION, CLAVE, e.target.checked, 'checkbox', PATRON)}
                                            disabled={loadingQR && CLAVE === 'whatsapp_activado'}
                                        />
                                    )}
                                </ConfigurationLabel>
                                {tooltips[ID_CONFIGURACION] && tooltips[ID_CONFIGURACION].length > 0 && (
                                    <div>
                                        {tooltips[ID_CONFIGURACION].map((tooltip, index) => (
                                            <TooltipButton
                                                key={index}
                                                onClick={() => handleTooltipClick(ID_CONFIGURACION, tooltip.TOOLTIP)}
                                            >
                                                {tooltip.TOOLTIP}
                                            </TooltipButton>
                                        ))}
                                    </div>
                                )}
                                {TIPO !== 'boolean' && TIPO !== 'textarea' && (
                                    <ConfigurationInput
                                        type={TIPO}
                                        value={VALOR}
                                        onChange={(e) => handleInputChange(ID_CONFIGURACION, CLAVE, e.target.value, TIPO, PATRON)}
                                        ref={inputRefs.current[ID_CONFIGURACION]}
                                    />
                                )}
                                {TIPO === 'textarea' && (
                                    <ConfigurationTextArea
                                        value={VALOR}
                                        onChange={(e) => handleInputChange(ID_CONFIGURACION, CLAVE, e.target.value, TIPO, PATRON)}
                                        ref={inputRefs.current[ID_CONFIGURACION]}
                                    />
                                )}
                            </ConfigurationItem>
                        );
                    })}
                </ConfigurationWrapper>
                {showQRModal && (
                    <StyledModal
                        title="Escanea el código QR"
                        isOpen={showQRModal}
                        onRequestClose={() => setShowQRModal(false)}
                    >
                        <ModalContent>
                            {qrCode ? (
                                <img key={modalImageKey} src={qrCode} alt="Código QR" />
                            ) : (
                                <p>Cargando código QR...</p>
                            )}
                            <p>Escanea este código QR con tu aplicación de WhatsApp para activar las notificaciones.</p>
                        </ModalContent>
                    </StyledModal>
                )}
            </TabContent>
        </>
    );
};

export default Configuracion;
