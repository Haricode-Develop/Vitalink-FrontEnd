import React, { useState, useRef, useEffect } from 'react';
import { BodyMapContainer, Canvas, Controls, ControlButton, ColorPicker } from "./BodyStyle";
import Body from "./Body";

const BodyMap = ({ onAreaSelected }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('red');
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    // Esta función inicializa el contexto del lienzo y ajusta el tamaño.
    const initCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

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
    const startDrawing = ({ nativeEvent }) => {
        nativeEvent.preventDefault();
        const { offsetX, offsetY } = getOffset(nativeEvent);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    // Continúa el dibujo si isDrawing es true
    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        nativeEvent.preventDefault();
        const { offsetX, offsetY } = getOffset(nativeEvent);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    // Termina el dibujo y actualiza el estado de isDrawing a false
    const finishDrawing = ({ nativeEvent }) => {
        nativeEvent.preventDefault();
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    // Obtiene las coordenadas para el dibujo basado en eventos de mouse o táctiles
    const getOffset = (nativeEvent) => {
        if (nativeEvent.touches) {
            const touch = nativeEvent.touches[0];
            const rect = canvasRef.current.getBoundingClientRect();
            return {
                offsetX: touch.clientX - rect.left,
                offsetY: touch.clientY - rect.top,
            };
        } else {
            return {
                offsetX: nativeEvent.offsetX,
                offsetY: nativeEvent.offsetY,
            };
        }
    };

    // Limpia el lienzo
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <BodyMapContainer>
            <Body />
            <Canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseOut={finishDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={finishDrawing}
                onTouchMove={draw}
                ref={canvasRef}
            />
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
        </BodyMapContainer>
    );
};

export default BodyMap;
