import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordForm, ResetButton, Overlay, BackgroundColor, Input, Label } from "./ResetPasswordStyle";
import Swal from 'sweetalert2';
import { API_BASE_URL } from "../../utils/config";

const ResetPasswordPage = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');

        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            axios.post(`${API_BASE_URL}/auth/validarToken`, { resetToken: tokenFromUrl })
                .then(response => {
                    if (response.data.success) {
                        setIsValidToken(true);
                    } else {
                        setMessage('Token inválido o expirado');
                    }
                })
                .catch(error => {
                    setMessage('Error al validar el token');
                });
        } else {
            setMessage('Token no proporcionado');
        }
    }, []);

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        axios.post(`${API_BASE_URL}/auth/reinicioContrasena`, { resetToken: token, newPassword })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Éxito',
                        'Contraseña actualizada con éxito',
                        'success'
                    ).then(() => navigate('/'));
                } else {
                    Swal.fire(
                        'Error',
                        response.data.error || 'Ocurrió un error al actualizar la contraseña',
                        'error'
                    );
                }
            })
            .catch(error => {
                setMessage('Error al actualizar la contraseña');
            });
    };

    if (!isValidToken) {
        return <div>{message}</div>;
    }

    return (
        <BackgroundColor>
            <Overlay>
                <ResetPasswordForm>
                    <h1>Restablecer contraseña</h1>
                    <Label>
                        Nueva contraseña:
                        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </Label>
                    <Label>
                        Confirmar contraseña:
                        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Label>
                    <ResetButton onClick={handleResetPassword}>Restablecer contraseña</ResetButton>
                    <div>{message}</div>
                </ResetPasswordForm>
            </Overlay>
        </BackgroundColor>
    );
};

export default ResetPasswordPage;
