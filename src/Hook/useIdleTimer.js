import { useState, useEffect } from 'react';

const useIdleTimer = (timeout = 1200000, onIdle, onIdleWarning) => {
    const [active, setActive] = useState(true);

    const resetTimer = () => setActive(true);

    useEffect(() => {
        if (!active) return;

        const id = setTimeout(() => {
            onIdleWarning();
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
    }, [active, onIdle, onIdleWarning, timeout]);

    useEffect(() => {
        setActive(true);
    }, []);

    return { resetTimer };
};

export default useIdleTimer;
