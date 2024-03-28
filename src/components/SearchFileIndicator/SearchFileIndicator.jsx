import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import { SearchContainer, SearchInput, FileList, FileItem } from './SearchFileIndicatorStyle';
import { StyledModal } from "../../components/ModalPdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {useSede} from "../../context/SedeContext";

const SearchFileIndicator = () => {
    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPatientName, setSelectedPatientName] = useState(null);
    const { idSedeActual } = useSede();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const endpoint = searchTerm
                    ? `${API_BASE_URL}/dashboard/search-patient-files?searchTerm=${encodeURIComponent(searchTerm)}`
                    : `${API_BASE_URL}/dashboard/list-pdfs/${idSedeActual}`;
                const { data } = await axios.get(endpoint);
                setFiles(data);
            } catch (error) {
                console.error('Error al realizar la búsqueda', error);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchFiles();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [idSedeActual,searchTerm]);

    const handleFileClick = (file) => {
        setSelectedFile(file.url);
        setSelectedPatientName(file.patientName);
    };

    const closeModal = () => {
        setSelectedFile(null);
        setSelectedPatientName(null);
    };

    return (
        <SearchContainer>
            <h1>Fichas Clínicas Pacientes</h1>
            <SearchInput
                type="text"
                placeholder="Buscar ficha..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <FileList>
                {files.map(file => (
                    <FileItem key={file.patientName} onClick={() => handleFileClick(file)}>
                        {file.patientName}
                    </FileItem>
                ))}
            </FileList>
            <StyledModal isOpen={!!selectedFile} onRequestClose={closeModal} pdfUrl={selectedFile} title={selectedPatientName} />
        </SearchContainer>
    );
};

export default SearchFileIndicator;
