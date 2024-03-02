import React, { useState, useRef, useEffect } from 'react';
import { BodyMapContainer, Canvas, Controls, ControlButton, ColorPicker, CanvasStyled } from "./BodyStyle";
import Body from "./Body";

const BodyMap = ({ onAreaSelected }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const [color, setColor] = useState('#ff0000');
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const initCanvas = () => {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
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
        window.addEventListener('resize', initCanvas);
        return () => {
            // Limpia el event listener cuando el componente se desmonte
            window.removeEventListener('resize', initCanvas);
        };
    }, []);




    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
            contextRef.current.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
        }
    }, [color, isErasing]);

    const preventScroll = (event) => {
        if (isDrawing) {
            event.preventDefault();
            event.stopPropagation();
        }
    };


    const startDrawing = (event) => {
        event.preventDefault();
        setIsDrawing(true);
        const { offsetX, offsetY } = getOffset(event);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    };
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




    const getOffset = (event) => {
        const target = canvasRef.current;
        const rect = target.getBoundingClientRect();
        const offsetX = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
        const offsetY = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;
        return { offsetX, offsetY };
    };

    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const handleError = (e) => {
        console.error("Error al seleccionar el color:", e);
    };


    const toggleEraser = () => {
        setIsErasing(!isErasing);
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
                <ControlButton onClick={toggleEraser}>
                    {isErasing ? 'Dibujar' : 'Borrar'}
                </ControlButton>
                <ColorPicker
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', border: 'none', padding: '0' }}
                    disabled={isErasing}
                />
            </Controls>
        </div>
    );
};

export default BodyMap;
