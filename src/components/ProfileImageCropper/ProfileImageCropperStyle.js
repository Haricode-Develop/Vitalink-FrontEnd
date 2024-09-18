import styled from "styled-components";

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
`;


export const GuardarButton = styled.button`
    padding: 10px 20px;
    background-color: var(--celeste);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #1e90ff;
    }
`;

export const CancelarButton = styled.button`
    padding: 10px 20px;
    background-color: var(--rojo);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #ff7875;
    }
`;
