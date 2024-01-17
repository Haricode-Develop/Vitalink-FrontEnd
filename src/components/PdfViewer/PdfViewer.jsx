import React from 'react';
import { Document, Page } from '@react-pdf/renderer';

const PDFViewerComponent = ({ fileUrl }) => {
    return (
        <Document file={fileUrl}>
            <Page pageNumber={1} />
        </Document>
    );
};

export default PDFViewerComponent;