import React, { useState, useEffect } from 'react';
import '../css/table.css';
import '../css/search.css';
import pdfimg from './PDF.png';
import ExpedienteRe from './RegistroExpS';
import Modal from './modalAct';
import EditModal from './EditModal';
import SolicitarModal from './RequestModal';

const Expedientes = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('Todos');
  const [filteredExpedientes, setFilteredExpedientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpediente, setSelectedExpediente] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSolicitarModal, setShowSolicitarModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    fetch('https://sigaemail.host8b.me/expedientes.php')
      .then(response => response.json())
      .then(data => {
        setExpedientes(data);
        setFilteredExpedientes(data);
      })
      .catch(error => console.error('Error al obtener los expedientes de la tabla:', error));
  }, []);

  const handleSearch = () => {
    const filtered = expedientes.filter(expediente => {
      if (searchField === 'Todos') {
        return Object.values(expediente).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return expediente[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
    setFilteredExpedientes(filtered);
  };

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

  const handleAdvancedSearchSubmit = ({ cicloEsc, grado, grupo, exp }) => {
    const filtered = expedientes.filter(expediente => {
      return (
        expediente.cicloEsc.includes(cicloEsc) &&
        expediente.Grado.includes(grado) &&
        expediente.Grupo.includes(grupo) &&
        expediente.Expediente.includes(exp)
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
      } else {
        console.error(data.message);
      }
    })
    .catch(error => console.error('Error al registrar la solicitud:', error));
  };

  return (
    <div>
      <ExpedienteRe />

      <div>
        <h4>Buscador</h4>
        <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
          <option value="Todos">Todos los datos</option>
          <option value="Alumno">Nombre del alumno</option>
          <option value="Clave">Clave</option>
          <option value="cicloEsc">Ciclo Escolar</option>
        </select>
        <input
          type="text"
          placeholder="Término de búsqueda..."
          value={searchTerm}
          onChange={(e) => { 
            setSearchTerm(e.target.value);
            handleSearch();
          }}
        />
        <br />
        <br />
        <button onClick={handleOpenAdvancedSearch}>Búsqueda Avanzada</button>
        <Modal isOpen={showModal} onClose={handleCloseModal} onSubmit={handleAdvancedSearchSubmit} />
      </div>
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
                <p>
                  <button onClick={() => handleOpenSolicitarModal(expediente)} style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>Solicitar</button>
                  <button onClick={() => handleOpenEditModal(expediente)} style={{ backgroundColor: 'yellow', color: 'black', border: 'none', padding: '5px', cursor: 'pointer' }}>Actualizar</button>
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
