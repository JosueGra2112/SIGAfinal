import React, { useState, useEffect } from 'react';
import Modal from './modalAct';
import '../css/solicitarModal.css'; // Importa el nuevo archivo CSS

const SolicitarModal = ({ isOpen, onClose, expediente, onSubmit }) => {
  const [nombreResponsable, setNombreResponsable] = useState('');
  const [nombreSolicitante, setNombreSolicitante] = useState('');
  const [motivo, setMotivo] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  useEffect(() => {
    if (expediente) {
      setNombreResponsable('');
      setNombreSolicitante('');
      setMotivo('');
    }
  }, [expediente]);

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;

    if (!nombreResponsable) newErrors.nombreResponsable = 'El nombre del responsable es requerido';
    if (nombreResponsable && !namePattern.test(nombreResponsable)) newErrors.nombreResponsable = 'El nombre solo debe contener letras';
    if (!nombreSolicitante) newErrors.nombreSolicitante = 'El nombre del solicitante es requerido';
    if (!motivo) newErrors.motivo = 'El motivo de la solicitud es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const solicitudData = {
      nombre_responsable: nombreResponsable,
      nombre_solicitante: nombreSolicitante,
      motivo: motivo,
      clave: expediente.Clave,
      ciclo_escolar: expediente.cicloEsc,
      alumno: expediente.Alumno,
      grado: expediente.Grado,
      grupo: expediente.Grupo,
      expediente: expediente.Expediente,
      resguardo: expediente.Resguardo,
      caja: expediente.Caja,
    };
    onSubmit(solicitudData);
    setSuccessMessage('Solicitud enviada con éxito'); // Mostrar mensaje de éxito
    setTimeout(() => {
      setSuccessMessage(''); // Ocultar mensaje de éxito después de 3 segundos
    }, 3000);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="solicitar-modal-overlay">
        <div className="solicitar-modal-content">
          <span className="solicitar-close" onClick={onClose}>&times;</span>
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Mostrar mensaje de éxito */}
          <form onSubmit={handleSubmit} className="solicitar-form">
            <h2>Solicitar Expediente</h2>
            <div className="solicitar-form-row">
              <div className="solicitar-form-group">
                <label>Nombre del Responsable: </label>
                <input
                  type="text"
                  placeholder="Persona que atendió"
                  value={nombreResponsable}
                  onChange={(e) => setNombreResponsable(e.target.value)}
                  required
                />
                {errors.nombreResponsable && <p className="error">{errors.nombreResponsable}</p>}
              </div>
            </div>
            <div className="solicitar-form-row">
              <div className="solicitar-form-group">
                <label>Solicitante: </label>
                <input
                  type="text"
                  placeholder="Nombre completo, Madre, Padre, amigo, conocido"
                  value={nombreSolicitante}
                  onChange={(e) => setNombreSolicitante(e.target.value)}
                  required
                />
                {errors.nombreSolicitante && <p className="error">{errors.nombreSolicitante}</p>}
              </div>
            </div>
            <div className="solicitar-form-row">
              <div className="solicitar-form-group">
                <label>Motivo de la Solicitud: </label>
                <input
                  type="text"
                  placeholder="Motivo de la solicitud"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                />
                {errors.motivo && <p className="error">{errors.motivo}</p>}
              </div>
            </div>
            <h2>Informacion Solicitada</h2>
            <div className="solicitar-form-row">
              <div className="solicitar-form-group">
                <label>Alumno: </label>
                <input type="text" value={expediente?.Alumno || ''} readOnly />
              </div>
            </div>
            <div className="solicitar-form-row">
              <div className="solicitar-form-group">
                <label>Clave: </label>
                <input type="text" value={expediente?.Clave || ''} readOnly />
              </div>
              <div className="solicitar-form-group">
                <label>Ciclo Escolar: </label>
                <input type="text" value={expediente?.cicloEsc || ''} readOnly />
              </div>
            </div>
            <div className="solicitar-form-row">
              <div className="solicitar-form-group">
                <label>Grado: </label>
                <input type="text" value={expediente?.Grado || ''} readOnly />
              </div>
              <div className="solicitar-form-group">
                <label>Grupo: </label>
                <input type="text" value={expediente?.Grupo || ''} readOnly />
              </div>
            </div>
            <div className="solicitar-form-row">
              <div className="solicitar-form-group">
                <label>Expediente: </label>
                <input type="text" value={expediente?.Expediente || ''} readOnly />
              </div>
              <div className="solicitar-form-group">
                <label>Resguardo: </label>
                <input type="text" value={expediente?.Resguardo || ''} readOnly />
              </div>
            </div>
            <div className="solicitar-form-row">
              <div className="solicitar-form-group">
                <label>Caja: </label>
                <input type="text" value={expediente?.Caja || ''} readOnly />
              </div>
            </div>
            <div className="solicitar-form-buttons">
              <button type="submit" className="solicitar-btn solicitar-btn-primary">Solicitar</button>
              <button type="button" className="solicitar-btn solicitar-btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SolicitarModal;
