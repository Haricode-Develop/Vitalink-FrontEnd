
import styled from "styled-components";

export const BodyMapContainer = styled.div`
  position: relative;
  margin: 50px;
  width: 30rem; 
  height: 30rem;
`;

export const Canvas = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  margin-top: 10px; 
`;
export const ControlButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #072B4A;
  color: white;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #06253d;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const ColorPicker = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }
`;

