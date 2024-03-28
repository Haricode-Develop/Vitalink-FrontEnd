import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'; // Asegúrate de importar correctamente AuthContext

export const SedeContext = createContext();

export const useSede = () => useContext(SedeContext);

export const SedeProvider = ({ children }) => {
    const { userData } = useContext(AuthContext);
    const [idSedeActual, setIdSedeActual] = useState(null);
    const [nombreSedeActual, setNombreSedeActual] = useState('');
    const [isSedeInfoLoaded, setIsSedeInfoLoaded] = useState(false);

    useEffect(() => {
        if (userData && userData.sedes && userData.sedes.length > 0) {
            setIdSedeActual(userData.sedes[0].ID_SEDE);
            setNombreSedeActual(userData.sedes[0].NOMBRE);
            setIsSedeInfoLoaded(true);

        } else {
            setIsSedeInfoLoaded(false);
        }
    }, [userData]);

    const changeSede = (newSedeId) => {
        if (!isSedeInfoLoaded) return;
        if (userData && userData.sedes) {
            const sedeSeleccionada = userData.sedes.find(sede => sede.ID_SEDE.toString() === newSedeId);
            setIdSedeActual(sedeSeleccionada?.ID_SEDE || null);
            setNombreSedeActual(sedeSeleccionada?.NOMBRE || '');
        }
    };

    return (
        <SedeContext.Provider value={{ idSedeActual, nombreSedeActual, changeSede, isSedeInfoLoaded }}>
            {children}
        </SedeContext.Provider>
    );
};
