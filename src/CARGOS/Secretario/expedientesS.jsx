import React, { useState, useEffect } from 'react';
import '../css/table.css';
import '../css/search.css';
import '../css/button.css'
import pdfimg from './PDF.png';
import buscarImg from '../IMG/buscador.png';
import actualizarImg from '../IMG/actualizar.png';
import refrescarImg from '../IMG/refrescar.png'; // Importa la imagen de refrescar
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
  const [missingFields, setMissingFields] = useState([]);

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

  const handleOpenAdvancedSearch = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenEditModal = (expediente) => {
    setSelectedExpediente(expediente);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setMissingFields([]);
  };

  const handleOpenSolicitarModal = (expediente) => {
    setSelectedExpediente(expediente);
    setShowSolicitarModal(true);
  };

  const handleCloseSolicitarModal = () => {
    setShowSolicitarModal(false);
  };

  const handleAdvancedSearchSubmit = ({ nombre, cicloEsc, grado, grupo, exp }) => {
    const filtered = expedientes.filter(expediente => {
      return (
        (!nombre || expediente.Alumno.toLowerCase().includes(nombre.toLowerCase())) &&
        (!cicloEsc || expediente.cicloEsc.includes(cicloEsc)) &&
        (!grado || expediente.Grado.includes(grado)) &&
        (!grupo || expediente.Grupo.includes(grupo)) &&
        (!exp || expediente.Expediente.includes(exp))
      );
    });
    setFilteredExpedientes(filtered);
    handleCloseModal();
  };

  const handleEditSubmit = (updatedExpediente) => {
    fetch('https://sigaemail.host8b.me/updateExpediente.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedExpediente)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          const updatedExpedientes = expedientes.map(exp => 
            exp.idexp === updatedExpediente.idexp ? updatedExpediente : exp
          );
          setExpedientes(updatedExpedientes);
          setFilteredExpedientes(updatedExpedientes);
          handleCloseEditModal();
          fetchExpedientes(); // Refrescar la tabla después de actualizar los datos
        } else {
          console.error(data.error);
          if (data.missing_fields) {
            setMissingFields(data.missing_fields);
          }
        }
      })
      .catch(error => console.error('Error al actualizar el expediente:', error));
  };

  const handleSolicitarSubmit = (solicitudData) => {
    fetch('https://sigaemail.host8b.me/solicitudes_expedientes.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(solicitudData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          handleCloseSolicitarModal();
          fetchExpedientes(); // Refrescar la tabla después de registrar la solicitud
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error('Error al registrar la solicitud:', error));
  };

  const handleRefresh = () => {
    fetchExpedientes(); // Refresca los datos de la tabla
  };

  return (
    <div>
      <div className="button-group">
        <ExpedienteRe />
        <button onClick={handleOpenAdvancedSearch} className="search-button">
          <img src={buscarImg} alt="buscar" className="icon" />
          Buscador
        </button>
        <button onClick={handleRefresh} className="refresh-button">
          <img src={refrescarImg} alt="refrescar" className="icon" />
          Refrescar
        </button>
      </div>
      <AdvancedSearchModal isOpen={showModal} onClose={handleCloseModal} onSubmit={handleAdvancedSearchSubmit} />
      {filteredExpedientes.length === 0 && <h1>No se encontraron resultados</h1>}
      <table>
        <thead>
          <tr>
            <th><center>Clave</center></th>
            <th><center>Ciclo Escolar</center></th>
            <th><center>Alumno</center></th>
            <th><center>Grado</center></th>
            <th><center>Grupo</center></th>
            <th><center>Expediente</center></th>
            <th><center>Resguardo</center></th>
            <th><center>Caja</center></th>
            <th><center>Visualizar Expediente</center></th>
            <th><center>Acciones</center></th>
          </tr>
        </thead>
        <tbody>
          {filteredExpedientes.map(expediente => (
            <tr key={expediente.idexp}>
              <td>{expediente.Clave}</td>
              <td>{expediente.cicloEsc}</td>
              <td>{expediente.Alumno}</td>
              <td>{expediente.Grado}</td>
              <td>{expediente.Grupo}</td>
              <td>{expediente.Expediente}</td>
              <td>{expediente.Resguardo}</td>
              <td>{expediente.Caja}</td>
              <td>
                <center>
                  <a href={`https://sigaemail.host8b.me/PDF/${expediente.archivo}`} target="_blank" rel="noopener noreferrer">
                    <img src={pdfimg} alt="pdfimg" style={{ alignItems: 'center', maxWidth: '10%' }} />
                  </a>
                </center>
              </td>
              <td>
                <p className="action-button-group">
                  <button onClick={() => handleOpenSolicitarModal(expediente)} className="action-button red-button">
                    <img src={solicitarImg} alt="solicitar" className="icon" />
                    Solicitar
                  </button>
                  <button onClick={() => handleOpenEditModal(expediente)} className="action-button yellow-button">
                    <img src={actualizarImg} alt="actualizar" className="icon" />
                    Actualizar
                  </button>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {missingFields.length > 0 && (
        <div style={{ color: 'red' }}>
          <h3>Campos faltantes:</h3>
          <ul>
            {missingFields.map(field => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      )}
      <br />
      <EditModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        expediente={selectedExpediente}
        onSubmit={handleEditSubmit}
      />
      <SolicitarModal
        isOpen={showSolicitarModal}
        onClose={handleCloseSolicitarModal}
        expediente={selectedExpediente}
        onSubmit={handleSolicitarSubmit}
      />
    </div>
  );
};

export default Expedientes;