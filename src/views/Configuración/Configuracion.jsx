// Configuracion.js

import React, {useState, useRef, useEffect, useContext} from 'react';
import { TabBar, Tab, TabContent, ActiveIndicator, ConfigurationWrapper, ConfigurationItem, ConfigurationLabel, ConfigurationInput, ConfigurationInputCheckbox, ModalContent } from './ConfiguracionStyle';
import axios from 'axios';
import {API_BASE_URL} from "../../utils/config";
import {AuthContext} from "../../context/AuthContext";
import { useWebSocket } from '../../context/WebSocketContext';
import {StyledModal} from "../../components/Modal";
import { toast } from 'react-toastify';
import GestionPacientes from "../../components/GestionPacientes/GestionPacientes";
import Loader from "../../components/Loader/Loader";

const Configuracion = () => {
    const [activeTab, setActiveTab] = useState('gestionPacientes');
    const [configuraciones, setConfiguraciones] = useState([]);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [qrCode, setQrCode] = useState('');
    const [loadingQR, setLoadingQR] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [modalImageKey, setModalImageKey] = useState(0);
    const tabsRef = useRef({ usuarios: null, citas: null });
    const updateTimer = useRef(null);
    const { ws } = useWebSocket();

    const isChecked = (value) => {
        return ['1', 'true', true].includes(value);
    };

    const { userData } = useContext(AuthContext);
    const validarValorConRegex = (valor, patron) => {
        if (!patron) return true;
        const regex = new RegExp(patron);
        return regex.test(valor);
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
                const response = await axios.get(`${API_BASE_URL}/configuraciones/configuracion/${userData.id_empresa}/${activeTab}`);
                const configs = response.data.configuraciones.map(c => ({
                    ...c,
                    VALOR: c.TIPO === 'boolean' ? c.VALOR === '1' || c.VALOR === 'true' : c.VALOR
                }));
                setConfiguraciones(configs);
            } catch (error) {
                console.error('Error al obtener configuraciones:', error);
                setConfiguraciones([]);
            }
        };

        cargarConfiguraciones();
    }, [activeTab, userData.id_empresa]);


    const handleInputChange = async (idConfiguracion, clave, nuevoValor, tipo, patron) => {
        if (tipo !== 'boolean' && !validarValorConRegex(nuevoValor, patron)) {
            toast.error('El valor ingresado no cumple con el formato requerido.');
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
                const response = await axios.post(`${API_BASE_URL}/configuraciones/activar-whatsapp/${userData.id_empresa}/${userData.id_usuario}`);
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
                const response = await axios.post(`${API_BASE_URL}/configuraciones/desactivar-whatsapp/${userData.id_empresa}`);
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

    // Dentro de tu componente Configuracion

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'WHATSAPP_SESSION_STARTED') {
                setShowQRModal(false);
                toast.success('Sesión de WhatsApp iniciada correctamente');
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws]);


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
                    {configuraciones.map(({ ID_CONFIGURACION, CLAVE, VALOR, DESCRIPCION, TIPO, PATRON }) => (
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
                            {TIPO !== 'boolean' && (
                                <ConfigurationInput
                                    type={TIPO}
                                    value={VALOR}
                                    onChange={(e) => handleInputChange(ID_CONFIGURACION, CLAVE, e.target.value, TIPO, PATRON)}
                                />
                            )}
                        </ConfigurationItem>
                    ))}
                </ConfigurationWrapper>
                {showQRModal && (
                    <StyledModal
                        title="Escanea el código QR"
                        isOpen={showQRModal}
                        onClose={() => setShowQRModal(false)}
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
