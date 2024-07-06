import React, { useRef } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    CardContainer,
    CardContent,
    CardTitle,
    ChartContainer,
    NumericIndicator
} from './CardDragAndDropStyle';

const ItemType = {
    CARD: 'card'
};

const Card = ({ id, index, moveCard, children }) => {
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        type: ItemType.CARD,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: ItemType.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{
            cursor: 'grab',
            transition: 'transform 0.2s ease',
            opacity: isDragging ? 0 : 1,  // Dejar el espacio en blanco
            width: '95%'
        }}>
            <div style={{
                opacity: isDragging ? 1 : 1,  // Mantener la opacidad
                transform: isDragging ? 'rotate(5deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                width: '95%'
            }}>
                {children}
            </div>
        </div>
    );
};

const CardWithDragAndDrop = ({ id, index, moveCard, children }) => (
    <DndProvider backend={HTML5Backend}>
        <Card id={id} index={index} moveCard={moveCard}>
            {children}
        </Card>
    </DndProvider>
);

export default CardWithDragAndDrop;
