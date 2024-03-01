import React, { useState, useRef, useEffect } from 'react';
import { BodyMapContainer, Canvas, Controls, ControlButton, ColorPicker, CanvasStyled } from "./BodyStyle";
import Body from "./Body";

const BodyMap = ({ onAreaSelected }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('red');
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    // Esta función inicializa el contexto del lienzo y ajusta el tamaño.
    const initCanvas = () => {
        const canvas = canvasRef.current;
        const container = canvas.parentElement; // El contenedor padre debería ser BodyMapContainer
        // Asegúrate de que el canvas tome el tamaño del contenedor padre
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = 3;
        contextRef.current = context;
    };



    useEffect(() => {
        initCanvas();
        // Añade el event listener para el redimensionamiento de la ventana
        window.addEventListener('resize', initCanvas);
        return () => {
            // Limpia el event listener cuando el componente se desmonte
            window.removeEventListener('resize', initCanvas);
        };
    }, []);




    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
        }
    }, [color]);

    // Previene el desplazamiento en dispositivos móviles al dibujar
    const preventScroll = (event) => {
        if (isDrawing) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    // Actualiza el estado de isDrawing a true y comienza el dibujo

    const startDrawing = (event) => {
        event.preventDefault();
        setIsDrawing(true);
        const { offsetX, offsetY } = getOffset(event);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    };
    // Continúa el dibujo si isDrawing es true
    const draw = (event) => {
        if (!isDrawing) return;
        event.preventDefault();
        const { offsetX, offsetY } = getOffset(event);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();

    };

    const preventGlobalScroll = (e) => {
        e.preventDefault();
    };
    const finishDrawing = () => {
        setIsDrawing(false);
        contextRef.current.closePath();
    };



    // Obtiene las coordenadas para el dibujo basado en eventos de mouse o táctiles

    const getOffset = (event) => {
        const target = canvasRef.current;
        const rect = target.getBoundingClientRect();
        const offsetX = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
        const offsetY = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;
        return { offsetX, offsetY };
    };

    // Limpia el lienzo
    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    return (
        <div>
        <BodyMapContainer>
            <Body />
            <CanvasStyled
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={finishDrawing}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={finishDrawing}
                onMouseOut={finishDrawing}
                ref={canvasRef}
            />

        </BodyMapContainer>

    <Controls>
        <ControlButton onClick={clearCanvas}>Limpiar</ControlButton>
        <ControlButton onClick={() => setColor(color === 'red' ? 'white' : 'red')}>
            {color === 'red' ? 'Borrar' : 'Dibujar'}
        </ControlButton>
        <ColorPicker
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={color !== 'red'}
        />
    </Controls>
        </div>
    );
};

export default BodyMap;
