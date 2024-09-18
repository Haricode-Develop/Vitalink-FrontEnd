import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const SedeContext = createContext();

export const useSede = () => useContext(SedeContext);

export const SedeProvider = ({ children }) => {
    const { userData } = useContext(AuthContext);
    const [idSedeActual, setIdSedeActual] = useState(null);
    const [nombreSedeActual, setNombreSedeActual] = useState('');
    const [isSedeInfoLoaded, setIsSedeInfoLoaded] = useState(false);

    useEffect(() => {
        if (userData && Array.isArray(userData.sedes) && userData.sedes.length > 0) {
            const primeraSede = userData.sedes.find(sede => sede && sede.ID_SEDE !== undefined);
            if (primeraSede) {
                setIdSedeActual(primeraSede.ID_SEDE);
                setNombreSedeActual(primeraSede.NOMBRE);
                setIsSedeInfoLoaded(true);
            } else {
                setIsSedeInfoLoaded(false);
            }
        } else {
            setIsSedeInfoLoaded(false);
        }
    }, [userData]);

    const changeSede = (newSedeId) => {
        if (!isSedeInfoLoaded) return;
        if (userData && Array.isArray(userData.sedes)) {
            const sedeSeleccionada = userData.sedes.find(sede => sede && sede.ID_SEDE && sede.ID_SEDE.toString() === newSedeId);
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
