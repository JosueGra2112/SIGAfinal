// src/Components/EditModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from './modalAct';

const EditModal = ({ isOpen, onClose, expediente, onSubmit }) => {
  const [Clave, setClave] = useState(expediente ? expediente.Clave : '');
  const [cicloEsc, setCicloEsc] = useState(expediente ? expediente.cicloEsc : '');
  const [Alumno, setAlumno] = useState(expediente ? expediente.Alumno : '');
  const [grado, setGrado] = useState(expediente ? expediente.Grado : '');
  const [grupo, setGrupo] = useState(expediente ? expediente.Grupo : '');
  const [exp, setExp] = useState(expediente ? expediente.Expediente : '');
  const [Resguardo, setResguardo] = useState(expediente ? expediente.Resguardo : '');
  const [Caja, setCaja] = useState(expediente ? expediente.Caja : '');

  useEffect(() => {
    if (expediente) {
      setClave(expediente.Clave);
      setCicloEsc(expediente.cicloEsc);
      setAlumno(expediente.Alumno);
      setGrado(expediente.Grado);
      setGrupo(expediente.Grupo);
      setExp(expediente.Expediente);
      setResguardo(expediente.Resguardo);
      setCaja(expediente.Caja);
    }
  }, [expediente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...expediente, idexp: expediente.idexp, Clave, cicloEsc, Alumno, grado, grupo, exp, Resguardo, Caja });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="edit-form">
          <center><h1>Actualizar Datos</h1></center>
        <div className="form-row">
          <div className="form-group">
            <label>Clave: </label>
            <input type="text" value={Clave} onChange={(e) => setClave(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Ciclo Escolar: </label>
            <input type="text" value={cicloEsc} onChange={(e) => setCicloEsc(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Alumno: </label>
            <input type="text" value={Alumno} onChange={(e) => setAlumno(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Grado: </label>
            <select value={grado} onChange={(e) => setGrado(e.target.value)}>
              <option value="">Seleccione el Grado</option>
              {[1, 2, 3].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Grupo: </label>
            <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
              <option value="">Seleccione el Grupo</option>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expediente: </label>
            <select value={exp} onChange={(e) => setExp(e.target.value)}>
              <option value="">Seleccione el Expediente</option>
              {['BOLETA', 'CERTIFICADO', 'CONSTANCIA'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Resguardo: </label>
            <input type="text" value={Resguardo} onChange={(e) => setResguardo(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Caja: </label>
            <input type="text" value={Caja} onChange={(e) => setCaja(e.target.value)} />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">Actualizar</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
