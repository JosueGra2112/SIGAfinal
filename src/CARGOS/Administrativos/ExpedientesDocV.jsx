import React, { useState, useEffect } from 'react';
import '../css/table.css';
import '../css/search.css';
import '../css/button.css';
import pdfimg from './PDF.png';
import buscarImg from '../IMG/buscador.png';
import refrescarImg from '../IMG/refrescar.png'; // Importa la imagen de refrescar
import AdvancedSearchModal from './AdvancedSearchModal';

const Expedientes = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [filteredExpedientes, setFilteredExpedientes] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleRefresh = () => {
    fetchExpedientes(); // Refresca los datos de la tabla
  };

  return (
    <div>
      <div className="button-group">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expedientes;
