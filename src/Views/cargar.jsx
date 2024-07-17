import React, { useState } from 'react';
import Header from './HeaderSe';
import { Form, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Menu from './Repo/Menu';
import Breadcrumbs from './BreadcrumbsLog'
const CargaAlumnos = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const onFinish = async () => {
    if (!fileList.length) {
      message.error('Por favor selecciona un archivo PDF.');
      return;
    }

    const file = fileList[0];
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('El archivo debe ser un archivo PDF (.pdf).');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

// Realizar la solicitud HTTP para cargar el archivo PDF
try {
    const response = await fetch('https://sigaemail.host8b.me/cargaActPDF.php', {
      method: 'POST',
      body: formData,
    });
  
    if (response.ok) {
      message.success('Archivo subido correctamente.');
    } else {
      throw new Error('Error al subir el archivo.');
    }
  } catch (error) {
    console.error('Error de solicitud:', error);
  }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const beforeUpload = (file) => {
    // Limpiar la lista de archivos al subir uno nuevo
    setFileList([file]);
    return false; // Evitar la carga automática
  };

  return (
    <div className="Inicio">
      <Header />
      <Menu />

 <Breadcrumbs />
      <center>
        <main className="App-main" style={{ alignItems: 'center' }}>
          <h1>CARGA DE ACTIVIDADES</h1>
        </main>
      </center>

      {uploadCompleted && (
        <div className="mensaje">Archivo subido correctamente.</div>
      )}

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Upload beforeUpload={beforeUpload} maxCount={1} fileList={fileList} accept=".pdf">
  <Button icon={<UploadOutlined />}>Seleccionar archivo PDF</Button>
</Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Cargar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CargaAlumnos;
