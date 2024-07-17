import React, { useState, useEffect } from 'react';
import Header from './HeaderSe';
import { List, Button, message } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import Menu from './Repo/Menu';

const ActDoc = () => {
  const [pdfList, setPdfList] = useState([]);

  useEffect(() => {
    // Obtener la lista de documentos del servidor al cargar el componente
    fetchPDFList();
  }, []);

  const fetchPDFList = async () => {
    try {
      const response = await fetch('https://sigaemail.host8b.me/listarPDF.php');
      if (response.ok) {
        const data = await response.json();
        setPdfList(data);
      } else {
        throw new Error('Error al obtener la lista de documentos.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error al obtener la lista de documentos.');
    }
  };

  const handleOpenPDF = (fileName) => {
    // Lógica para abrir el archivo PDF
    // Por ejemplo, podrías usar window.open() para abrirlo en una nueva pestaña
    window.open(`https://sigaemail.host8b.me/PDFDocente/${fileName}`);
  };

  return (
    <div>
    <Header />
      <Menu />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1>Actividades</h1>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <List
          bordered
          dataSource={pdfList}
          renderItem={(item) => (
            <List.Item>
              <FilePdfOutlined style={{ marginRight: '10px' }} />
              <span>{item.fileName}</span>
              <Button type="link" onClick={() => handleOpenPDF(item.fileName)}>Abrir</Button>
            </List.Item>
          )}
        />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ActDoc;
