import styled, { css } from 'styled-components';

export const ConfiguracionCuentaWrapper = styled.div`
    padding: 20px;
`;

export const ConfiguracionCuentaInput = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

export const FileUploadWrapper = styled.div`
    margin: 20px 0;
`;

export const DropZone = styled.div`
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    cursor: pointer;

    ${(props) =>
            props.dragging &&
            css`
                background-color: #e6f7ff;
                border-color: #1890ff;
            `}

    ${(props) =>
            props.hovering &&
            css`
                background-color: #f0f8ff;
                border-color: #1890ff;
            `}
`;

export const DropZoneLabel = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
`;

export const DropZoneText = styled.p`
    color: #999;
    font-size: 1rem;
`;

export const ProfilePictureWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
`;

export const ProfilePicturePreview = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 10px;
    background-color: #f4f4f4;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 14px;

    &:hover {
        border-color: #1890ff;
    }
`;

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
