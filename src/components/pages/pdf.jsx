import React from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/default-layout';

const AdvancedPDFViewer = () => {

    /* const pdfUrl = './pdf-open-parameters.pdf'; */
    const pdfUrl = './pdf-open-parameters3.pdf';

    return (
        <div style={styles.container}>
          <h1 style={styles.h1}>Ato da mesa 2388/2019</h1>
          <iframe src={pdfUrl} style={styles.iframe} title="PDF Viewer"></iframe>
        </div>
      );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px',
    },
    downloadBtn: {
      marginBottom: '20px',
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#FFF',
      textDecoration: 'none',
      borderRadius: '5px',
    },
    iframe: {
      width: '100%',
      maxWidth: '950px',
      height: '850px',
      border: '1px solid #ccc',
    },
    h1: {
        marginBottom: '20px'
      },
  };

export default AdvancedPDFViewer;