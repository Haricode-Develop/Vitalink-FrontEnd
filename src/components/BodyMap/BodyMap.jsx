import React, { useState, useRef, useEffect } from 'react';
import { BodyMapContainer, Canvas, Controls, ControlButton, ColorPicker } from "./BodyStyle";
import Body from "./Body";

const BodyMap = ({ onAreaSelected }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [color, setColor] = useState('red');
    const backgroundColor = 'white'; // Asegúrate de que esto coincida con el color de fondo de tu lienzo

    const toggleEraser = () => {
        setIsErasing(!isErasing);
        setColor(isErasing ? 'red' : backgroundColor);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = isErasing ? backgroundColor : color;
        }
    }, [color, isErasing]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const context = canvas.getContext('2d');
        context.scale(1, 1);
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = 3;
        contextRef.current = context;
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const handleAreaClick = (area) => {
        onAreaSelected(area);
    };

    return (
        <BodyMapContainer className={"pacienteEsquema"}>
            <Body />
            <Canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onMouseLeave={finishDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={finishDrawing}
                ref={canvasRef}
            />
            <Controls>
                <ControlButton onClick={clearCanvas}>Limpiar</ControlButton>
                <ControlButton onClick={toggleEraser}>
                    {isErasing ? 'Dibujar' : 'Borrar'}
                </ControlButton>
                <ColorPicker
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    disabled={isErasing}
                />
            </Controls>
        </BodyMapContainer>
    );
};

export default BodyMap;
