import React, { useEffect, useState } from 'react';
import Header from './HeaderD';
import Menu from './MenuD';
import pdfIcon from './PDF.png'; // Importa la imagen de PDF
import './Act.css'; // Importa el archivo CSS

const Act = () => {
  const [nameUser, setNameUser] = useState('');
  const [idUser, setIdUser] = useState('');
  const [listActivities, setListActivities] = useState([]);
  const [nombreAct, setNombreAct] = useState('');
  const [rutaArchivo, setRutaArchivo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedIdUser = localStorage.getItem('idUser');
    const storedUser = localStorage.getItem('user');
    if (storedIdUser) {
      setIdUser(storedIdUser);
      setNameUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (idUser) {
      fetch('https://sigaemail.host8b.me/consultarAct.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUser }),
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setListActivities(data);
          } else {
            console.error('Error en la respuesta del servidor:', data);
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
    }
  }, [idUser]);

  const handleAgregarActividad = () => {
    if (!rutaArchivo || rutaArchivo.type !== 'application/pdf') {
      alert('Por favor, selecciona un archivo PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('nombreAct', nombreAct);
    formData.append('idUser', idUser);
    formData.append('rutaArchivo', rutaArchivo);

    fetch('https://sigaemail.host8b.me/agregarAct.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Actividad registrada correctamente');
          // Recargar la lista de actividades
          setListActivities([...listActivities, { nombreAct, rutaArchivo: rutaArchivo.name }]);
          // Limpiar los campos del formulario
          setNombreAct('');
          setRutaArchivo(null);
          setIsModalOpen(false);
        } else {
          alert('Error al registrar la actividad: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error al registrar la actividad:', error);
      });
  };

  return (
    <div>
      <Header />
      <Menu />
      <center><h1>Actividades</h1></center>
      <label style={{ display: 'none' }}>Bienvenido {nameUser}</label>
      <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
        Agregar Actividad
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Actividad</h5>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="nombreAct">Nombre de la Actividad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreAct"
                    value={nombreAct}
                    onChange={(e) => setNombreAct(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rutaArchivo">Archivo PDF</label>
                  <input
                    type="file"
                    className="form-control"
                    id="rutaArchivo"
                    accept=".pdf"
                    onChange={(e) => setRutaArchivo(e.target.files[0])}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cerrar</button>
              <button className="btn-primary" onClick={handleAgregarActividad}>Guardar Actividad</button>
            </div>
          </div>
        </div>
      )}

      <h3>Listado de Actividades:</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="blue-header">Actividad</th>
            <th className="blue-header">PDF</th>
          </tr>
        </thead>
        <tbody>
          {listActivities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.nombreAct}</td>
              <td>
                <a href={`https://sigaemail.host8b.me/PDF/${activity.rutaArchivo}`} target="_blank" rel="noopener noreferrer">
                  <img src={pdfIcon} alt="PDF" style={{ width: '30px', height: '30px' }} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Act;
