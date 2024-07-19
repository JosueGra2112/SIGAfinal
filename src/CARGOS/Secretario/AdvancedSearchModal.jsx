// src/Components/AdvancedSearchModal.jsx
import React, { useState } from 'react';
import './advancedSearchModal.css';

const AdvancedSearchModal = ({ isOpen, onClose, onSubmit }) => {
  const [cicloEsc, setCicloEsc] = useState('');
  const [grado, setGrado] = useState('');
  const [grupo, setGrupo] = useState('');
  const [exp, setExp] = useState('');

  const Grado = ['1', '2', '3'];
  const Grupo = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const Exp = ['BOLETA', 'CERTIFICADO', 'CONSTANCIA'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cicloEsc, grado, grupo, exp });
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-advanced">
        <div className="modal-content-advanced">
          <span className="close-advanced" onClick={onClose}>
            &times;
          </span>
          <h2>Búsqueda Avanzada</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row-advanced">
              <div className="form-group-advanced">
                <label>Ciclo Escolar: </label>
                <input type="text" value={cicloEsc} onChange={(e) => setCicloEsc(e.target.value)} />
              </div>
              <div className="form-group-advanced">
                <label>Grado: </label>
                <select value={grado} onChange={(e) => setGrado(e.target.value)}>
                  <option value="">Seleccione el Grado</option>
                  {Grado.map((c, index) => (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row-advanced">
              <div className="form-group-advanced">
                <label>Grupo: </label>
                <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
                  <option value="">Seleccione el Grupo</option>
                  {Grupo.map((c, index) => (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group-advanced">
                <label>Expediente: </label>
                <select value={exp} onChange={(e) => setExp(e.target.value)}>
                  <option value="">Seleccione el Expediente</option>
                  {Exp.map((c, index) => (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-buttons-advanced">
              <button type="submit" className="btn btn-primary">Buscar</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AdvancedSearchModal;
