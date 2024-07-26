import React, { useState, useEffect } from 'react';
import './modalConfirm.css'; // Asegúrate de importar el archivo CSS

const ConsultaSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedSolicitudId, setSelectedSolicitudId] = useState(null);

  useEffect(() => {
    fetch('https://sigaemail.host8b.me/consultar_solicitudes_expedientes.php')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSolicitudes(data.data);
        } else {
          console.error('No se encontraron solicitudes');
        }
      })
      .catch(error => console.error('Error al consultar las solicitudes:', error));
  }, []);

  const handleOpenConfirmModal = (id) => {
    setSelectedSolicitudId(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setSelectedSolicitudId(null);
    setShowConfirmModal(false);
  };

  const handleDeleteSolicitud = () => {
    fetch('https://sigaemail.host8b.me/eliminar_solicitud_expediente.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: selectedSolicitudId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== selectedSolicitudId));
        handleCloseConfirmModal();
      } else {
        console.error('Error al eliminar la solicitud');
      }
    })
    .catch(error => console.error('Error al eliminar la solicitud:', error));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre del Responsable</th>
            <th>Nombre del Solicitante</th>
            <th>Motivo de Solicitud</th>
            <th>Clave</th>
            <th>Ciclo Escolar</th>
            <th>Alumno</th>
            <th>Grado</th>
            <th>Grupo</th>
            <th>Expediente</th>
            <th>Fecha de Solicitud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud, index) => (
            <tr key={index}>
              <td>{solicitud.nombre_responsable}</td>
              <td>{solicitud.nombre_solicitante}</td>
              <td>{solicitud.motivo}</td>
              <td>{solicitud.clave}</td>
              <td>{solicitud.ciclo_escolar}</td>
              <td>{solicitud.alumno}</td>
              <td>{solicitud.grado}</td>
              <td>{solicitud.grupo}</td>
              <td>{solicitud.expediente}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>
                <button onClick={() => handleOpenConfirmModal(solicitud.id)} style={{ backgroundColor: 'yellow' }}>
                  Regreso el Expediente
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Devolución</h2>
            <p>¿El expediente se regresó correctamente?</p>
            <button onClick={handleDeleteSolicitud} className="btn btn-primary">Sí</button>
            <button onClick={handleCloseConfirmModal} className="btn btn-secondary">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultaSolicitudes;
