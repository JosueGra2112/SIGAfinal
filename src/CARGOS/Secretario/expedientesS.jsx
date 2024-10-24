import React, { useState, useEffect } from 'react';
import '../css/Exp.css';
import pdfimg from './PDF.png';
import buscarImg from '../IMG/buscador.png';
import actualizarImg from '../IMG/actualizar.png';
import refrescarImg from '../IMG/refrescar.png';
import solicitarImg from '../IMG/solicitar.png';
import ExpedienteRe from './RegistroExpS';
import AdvancedSearchModal from './AdvancedSearchModal';
import EditModal from './EditModal';
import SolicitarModal from './RequestModal';

const Expedientes = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [filteredExpedientes, setFilteredExpedientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpediente, setSelectedExpediente] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSolicitarModal, setShowSolicitarModal] = useState(false);

  const fetchExpedientes = () => {
    fetch('https://sigaemail.host8b.me/expedientes.php')
      .then(response => response.json())
      .then(data => {
        setExpedientes(data);
        setFilteredExpedientes(data);
      })
      .catch(error => console.error('Error al obtener los expedientes de la tabla:', error));
  };

  useEffect(() => {
    
    fetchExpedientes();
  }, []);

  const handleAdvancedSearchSubmit = (searchCriteria) => {
    const filtered = expedientes.filter(expediente => {
      return (
        (!searchCriteria.nombre || expediente.Alumno.toLowerCase().includes(searchCriteria.nombre.toLowerCase())) &&
        (!searchCriteria.cicloEsc || expediente.cicloEsc.includes(searchCriteria.cicloEsc)) &&
        (!searchCriteria.grado || expediente.Grado === searchCriteria.grado) &&
        (!searchCriteria.grupo || expediente.Grupo === searchCriteria.grupo) &&
        (!searchCriteria.exp || expediente.Expediente === searchCriteria.exp)
      );
    });
    setFilteredExpedientes(filtered);
    setShowModal(false);
  };

  const handleOpenSolicitarModal = (expediente) => {
    setSelectedExpediente(expediente);
    setShowSolicitarModal(true);
  };

  const handleOpenEditModal = (expediente) => {
    setSelectedExpediente(expediente);
    setShowEditModal(true);
  };

  const handleRefresh = () => {
    fetchExpedientes();
  };

  return (
    <div>
      <div className="button-group">
        <ExpedienteRe />
        <button onClick={() => setShowModal(true)} className="search-button">
          <img src={buscarImg} alt="buscar" className="icon" />
          <span className="button-text">Buscador</span>
        </button>
        <button onClick={handleRefresh} className="refresh-button">
          <img src={refrescarImg} alt="refrescar" className="icon" />
          <span className="button-text">Refrescar</span>
        </button>
      </div>

      {filteredExpedientes.length === 0 && (
        <p>No se encontraron resultados</p>
      )}

      <div className="table-container d-none d-lg-block">
        <table className="table">
          <thead>
            <tr>
              <th>CURP</th>
              <th>Alumno</th>
              <th>Ciclo Escolar</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Expediente</th>
              <th>Resguardo</th>
              <th>Caja</th>
              <th>Visualizar Expediente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpedientes.map(expediente => (
              <tr key={expediente.idexp}>
                <td>{expediente.Clave}</td>
                <td>{expediente.Alumno}</td>
                <td>{expediente.cicloEsc}</td>
                <td>{expediente.Grado}</td>
                <td>{expediente.Grupo}</td>
                <td>{expediente.Expediente}</td>
                <td>{expediente.Resguardo}</td>
                <td>{expediente.Caja}</td>
                <td>
                  <a href={`https://sigaemail.host8b.me/PDF/${expediente.archivo}`} target="_blank" rel="noopener noreferrer">
                    <center><img src={pdfimg} style={{ maxWidth: '20px'}} alt="Ver PDF" /></center>
                  </a>
                </td>
                <td>
                  <button onClick={() => handleOpenSolicitarModal(expediente)} className="action-button">
                    <img src={solicitarImg} alt="solicitar" className="icon" /> Solicitar
                  </button>
                  <button onClick={() => handleOpenEditModal(expediente)} className="action-button">
                    <img src={actualizarImg} alt="actualizar" className="icon" /> Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-list d-lg-none">
        {filteredExpedientes.map(expediente => (
          <div key={expediente.idexp} className="expediente-card">
            <button className="expediente-name" data-toggle="collapse" data-target={`#exp-${expediente.idexp}`}>
              {expediente.Alumno} <span className="toggle-icon">+</span>
            </button>
            <div id={`exp-${expediente.idexp}`} className="collapse">
              <p><strong>Clave:</strong> {expediente.Clave}</p>
              <p><strong>Ciclo Escolar:</strong> {expediente.cicloEsc}</p>
              <p><strong>Grado:</strong> {expediente.Grado}</p>
              <p><strong>Grupo:</strong> {expediente.Grupo}</p>
              <p><strong>Expediente:</strong> {expediente.Expediente}</p>
              <p><strong>Resguardo:</strong> {expediente.Resguardo}</p>
              <p><strong>Caja:</strong> {expediente.Caja}</p>
              <p>
                <a href={`https://sigaemail.host8b.me/PDF/${expediente.archivo}`} target="_blank" rel="noopener noreferrer">
                  Ver Expediente
                </a>
              </p>
              <div className="action-buttons">
                <button onClick={() => handleOpenSolicitarModal(expediente)} className="action-button">Solicitar</button>
                <button onClick={() => handleOpenEditModal(expediente)} className="action-button">Actualizar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdvancedSearchModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleAdvancedSearchSubmit} />
      <EditModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} expediente={selectedExpediente} />
      <SolicitarModal isOpen={showSolicitarModal} onClose={() => setShowSolicitarModal(false)} expediente={selectedExpediente} />
    </div>
  );
};

export default Expedientes;
