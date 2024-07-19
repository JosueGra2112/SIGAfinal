// src/Components/RequestModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from './modalAct';
import './modalAct.css';


const SolicitarModal = ({ isOpen, onClose, expediente, onSubmit }) => {
  const [nombreResponsable, setNombreResponsable] = useState('');
  const [nombreSolicitante, setNombreSolicitante] = useState('');

  useEffect(() => {
    if (expediente) {
      setNombreResponsable('');
      setNombreSolicitante('');
    }
  }, [expediente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const solicitudData = {
      nombre_responsable: nombreResponsable,
      nombre_solicitante: nombreSolicitante,
      clave: expediente.Clave,
      ciclo_escolar: expediente.cicloEsc,
      alumno: expediente.Alumno,
      grado: expediente.Grado,
      grupo: expediente.Grupo,
      expediente: expediente.Expediente,
      resguardo: expediente.Resguardo,
      caja: expediente.Caja
    };
    onSubmit(solicitudData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="solicitar-form">
        <h2>Solicitar Expediente</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre del Responsable: </label>
            <input type="text" placeholder="Persona que atendió" value={nombreResponsable} onChange={(e) => setNombreResponsable(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre de la persona que solicita Expediente: </label>
            <input type="text" placeholder="Nombre completo y si es mamá, tutor, tía, amigo, conocido" value={nombreSolicitante} onChange={(e) => setNombreSolicitante(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Alumno: </label>
            <input type="text" value={expediente?.Alumno || ''} readOnly />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Clave: </label>
            <input type="text" value={expediente?.Clave || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Ciclo Escolar: </label>
            <input type="text" value={expediente?.cicloEsc || ''} readOnly />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Grado: </label>
            <input type="text" value={expediente?.Grado || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Grupo: </label>
            <input type="text" value={expediente?.Grupo || ''} readOnly />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expediente: </label>
            <input type="text" value={expediente?.Expediente || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Resguardo: </label>
            <input type="text" value={expediente?.Resguardo || ''} readOnly />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Caja: </label>
            <input type="text" value={expediente?.Caja || ''} readOnly />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">Solicitar</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
};

export default SolicitarModal;
