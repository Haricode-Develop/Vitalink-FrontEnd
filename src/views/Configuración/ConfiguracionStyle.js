import styled, { css } from 'styled-components';

export const TabBar = styled.div`
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    position: relative;
    background-color: var(--blanco);
    border-bottom: 1px solid var(--negro);

    @media (max-width: 768px) {
        display: none;
    }
`;


export const Tab = styled.button`
    padding: 15px 30px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    transition: color 0.3s ease;
    color: var(--negro);
    font-size: 1.2rem;
    border-radius: 5px 5px 0 0;
    display: inline-block;
    white-space: nowrap;

    &:focus {
        outline: none;
    }

    @media (max-width: 768px) {
        padding: 10px 15px;
        font-size: 1rem;
    }

    ${(props) =>
            props.active &&
            css`
                font-weight: bold;
                color: var(--blanco);
                z-index: 1;
                background-color: var(--celeste);
            `}
`;

export const ActiveIndicator = styled.div`
    height: 4px;
    width: ${(props) => props.width}px;
    position: absolute;
    bottom: 0;
    left: ${(props) => props.left}px;
    background-color: var(--celeste);
    transition: left 0.3s ease, width 0.3s ease;
    z-index: 0;
`;


export const TabContent = styled.div`
    padding: 20px;
    background-color: var(--blanco);
    color: var(--negro);
`;

export const DropdownMenu = styled.select`
    display: none;

    @media (max-width: 768px) {
        display: block;
        width: 100%;
        padding: 12px 15px;
        font-size: 1.1rem;
        color: var(--negro);
        background-color: var(--blanco);
        border: 1px solid var(--gris);
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        appearance: none;
        transition: border-color 0.3s ease;

        &:focus {
            outline: none;
            border-color: var(--celeste);
        }
    }
`;