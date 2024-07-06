import styled from 'styled-components';

export const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s, transform 0.2s ease;
  height: 450px; /* Altura fija para todas las tarjetas */

  @media (max-width: 768px) {
    grid-column: span 2; /* Mostrar una tarjeta por fila en pantallas pequeñas */
    height: auto; /* Altura automática en pantallas pequeñas */
  }

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    cursor: grab; /* Mostrar cursor de agarre */
  }

  &:active {
    cursor: grabbing; /* Mostrar cursor de agarrando */
    transform: scale(1.05); /* Agrandar levemente la tarjeta mientras se arrastra */
  }

  &.dragging {
    animation: swing 0.3s infinite alternate;
  }

  @keyframes swing {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(5deg);
    }
  }
`;

export const CardContent = styled.div`
  padding: 15px;
  height: 100%;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  color: #333;
`;

export const ChartContainer = styled.div`
  height: 300px; /* Ajuste de altura para el gráfico */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const NumericIndicator = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;