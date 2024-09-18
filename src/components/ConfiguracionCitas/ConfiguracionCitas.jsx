import React, { createRef } from 'react';
import {
    ConfigurationWrapper,
    ConfigurationItem,
    ConfigurationLabel,
    ConfigurationInput,
    ConfigurationInputCheckbox,
    ConfigurationTextArea,
    TooltipButton,
    ModalContent
} from './ConfiguracionCitasStyle';
import { StyledModal } from "../Modal";
import Loader from "../../components/Loader/Loader";

const ConfiguracionCitas = ({
                                configuraciones,
                                tooltips,
                                inputRefs,
                                isChecked,
                                handleInputChange,
                                handleTooltipClick,
                                loadingQR,
                                showQRModal,
                                qrCode,
                                modalImageKey,
                                setShowQRModal
                            }) => {

    return (
        <>
            {loadingQR && <Loader />}

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
                                        onChange={(e) => handleInputChange(ID_CONFIGURACION, CLAVE, e.target.checked, 'boolean', PATRON)}
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
        </>
    );
};

export default ConfiguracionCitas;
