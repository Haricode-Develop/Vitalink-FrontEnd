import React from 'react';
import { FaTrash, FaBox, FaPercentage } from 'react-icons/fa';
import {
    CardContainer,
    CardContent,
    CardTitle,
    CardDescription,
    CardPrice,
    CardIcons,
    CardActions,
} from './ServiceStyle';

const ServiceCard = ({ servicio, onEdit, onDelete }) => {
    return (
        <CardContainer>
            <CardContent onClick={onEdit}>
                <CardTitle>{servicio.titulo}</CardTitle>
                <CardDescription>{servicio.descripcion}</CardDescription>
                <CardPrice>
                    {servicio.precio} {servicio.moneda}
                </CardPrice>
                <CardIcons>
                    {servicio.paquete && <FaBox title="Paquete de Servicios" />}
                    {servicio.oferta && <FaPercentage title={`Oferta: ${servicio.descuento}%`} />}
                </CardIcons>
            </CardContent>
            <CardActions>
                <FaTrash onClick={onDelete} />
                <span>Última modificación: {servicio.fechaModificacion}</span>
            </CardActions>
        </CardContainer>
    );
};

export default ServiceCard;
