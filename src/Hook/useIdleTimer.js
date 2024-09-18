import { useState, useEffect } from 'react';

const useIdleTimer = (timeout = 1200000, onIdle, isDashboardRoute) => {
    const [active, setActive] = useState(true);

    const resetTimer = () => setActive(true);

    useEffect(() => {
        if (!active || !isDashboardRoute) return; // No ejecutar si no estamos en el Dashboard

        const id = setTimeout(() => {
            onIdle();
        }, timeout);

        const handleVisibilityChange = () => {
            if (!document.hidden) resetTimer();
        };

        const events = [
            'mousemove', 'keydown', 'scroll',
            'touchstart', 'touchmove', 'touchend',
            'click', 'wheel', 'resize',
            'input', 'change'
        ];

        events.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearTimeout(id);
            events.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [active, onIdle, timeout, isDashboardRoute]);

    useEffect(() => {
        setActive(true);
    }, []);

    return { resetTimer };
};

export default useIdleTimer;
