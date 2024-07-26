import React, { useState } from 'react';
import '../css/advancedSearchModal.css'; // Importa el archivo CSS

const AdvancedSearchModal = ({ isOpen, onClose, onSubmit }) => {
  const [cicloEsc, setCicloEsc] = useState('');
  const [grado, setGrado] = useState('');
  const [grupo, setGrupo] = useState('');
  const [exp, setExp] = useState('');
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, cicloEsc, grado, grupo, exp });
  };

  return (
    isOpen && (
      <div className="advanced-modal-overlay">
        <div className="advanced-modal">
          <div className="advanced-modal-content">
            <span className="advanced-close" onClick={onClose}>
              &times;
            </span>
            <h2>Búsqueda Avanzada</h2>
            <form onSubmit={handleSubmit} className="advanced-form">
              <label>Nombre del Alumno: </label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <label>Ciclo Escolar: </label>
              <input type="text" value={cicloEsc} onChange={(e) => setCicloEsc(e.target.value)} />
              <label>Grado: </label>
              <select value={grado} onChange={(e) => setGrado(e.target.value)}>
                <option value="">Seleccione el Grado</option>
                {[1, 2, 3].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <label>Grupo: </label>
              <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
                <option value="">Seleccione el Grupo</option>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <label>Expediente: </label>
              <select value={exp} onChange={(e) => setExp(e.target.value)}>
                <option value="">Seleccione el Expediente</option>
                {['BOLETA', 'CERTIFICADO', 'CONSTANCIA'].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AdvancedSearchModal;
