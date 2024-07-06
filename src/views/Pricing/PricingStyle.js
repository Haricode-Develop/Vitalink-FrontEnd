import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PricingSection = styled.section`
  position: relative;
  padding: 4rem 2rem;
  background-color: var(--blanco);
  animation: ${fadeIn} 1s ease-in;
  text-align: center;
  overflow: hidden;
  z-index: 100;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 50%;
    background-color: var(--celeste);
    transform: skewX(-20deg);
    transform-origin: bottom right;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    &::before {
      right: 0;
      transform: none;
    }
  }
`;

export const PricingHeader = styled.h1`
  font-size: 3rem;
  color: var(--negro);
  margin-bottom: 2rem;
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export const PricingContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const PricingCard = styled.div`
  background-color: #f0f4ff; /* Fondo de color para el card */
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 400px;
  width: 100%;
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    order: 2;
  }
`;

export const PricingCardHeader = styled.div`
  background-color: var(--celeste);
  color: var(--blanco);
  padding: 1.5rem;
  text-align: center;

  h2 {
    margin: 0;
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
  }
`;

export const PricingCardBody = styled.div`
  padding: 1.5rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

export const PricingCardFooter = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

export const PricingButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  color: var(--blanco);
  background-color: var(--celeste);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--celeste-rgba);
  }
`;

export const RightContainer = styled.div`
  text-align: left;
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    order: 1;
  }
`;

export const VideoContainer = styled.div`
  margin-top: 5rem;

  video {
    width: 150%;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SVGContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  svg {
    position: absolute;
    width: 300px;
    height: 235px;
    opacity: 0.8;
  }

  svg:nth-of-type(2) {
    top: 50%;
    left: 10%;

    @media (max-width: 768px) {
      top: 10%;
    }
  }
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

export const PopupContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

export const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--celeste);
  color: var(--blanco);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--celeste-rgba);
  }
`;