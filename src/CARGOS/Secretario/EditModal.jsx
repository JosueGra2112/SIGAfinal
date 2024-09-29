import React, { useState, useEffect } from 'react';
import Modal from './modalAct'; // Assuming modalAct is your reusable modal component

const EditModal = ({ isOpen, onClose, expediente, onSubmit }) => {
  const [Clave, setClave] = useState(expediente ? expediente.Clave : '');
  const [cicloEsc, setCicloEsc] = useState(expediente ? expediente.cicloEsc : '');
  const [Alumno, setAlumno] = useState(expediente ? expediente.Alumno : '');
  const [grado, setGrado] = useState(expediente ? expediente.Grado : '');
  const [grupo, setGrupo] = useState(expediente ? expediente.Grupo : '');
  const [exp, setExp] = useState(expediente ? expediente.Expediente : '');
  const [Resguardo, setResguardo] = useState(expediente ? expediente.Resguardo : '');
  const [Caja, setCaja] = useState(expediente ? expediente.Caja : '');
  const [errors, setErrors] = useState({});

  // Update the state when expediente is updated
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

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;

    if (!Clave) newErrors.Clave = 'La clave es requerida';
    if (!cicloEsc) newErrors.cicloEsc = 'El ciclo escolar es requerido';
    if (!Alumno) newErrors.Alumno = 'El nombre del alumno es requerido';
    if (Alumno && !namePattern.test(Alumno)) newErrors.Alumno = 'El nombre solo debe contener letras';
    if (!grado) newErrors.grado = 'El grado es requerido';
    if (!grupo) newErrors.grupo = 'El grupo es requerido';
    if (!exp) newErrors.exp = 'El expediente es requerido';
    if (!Resguardo) newErrors.Resguardo = 'El resguardo es requerido';
    if (!Caja) newErrors.Caja = 'La caja es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    onSubmit({ ...expediente, idexp: expediente.idexp, Clave, cicloEsc, Alumno, grado, grupo, exp, Resguardo, Caja });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="edit-form">
          <center><h1>Actualizar Datos</h1></center>
          <div className="form-row">
            <div className="form-group">
              <label>Clave: </label>
              <input
                type="text"
                value={Clave}
                onChange={(e) => setClave(e.target.value)}
              />
              {errors.Clave && <p className="error">{errors.Clave}</p>}
            </div>
            <div className="form-group">
              <label>Ciclo Escolar: </label>
              <input
                type="text"
                value={cicloEsc}
                onChange={(e) => setCicloEsc(e.target.value)}
              />
              {errors.cicloEsc && <p className="error">{errors.cicloEsc}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Alumno: </label>
              <input
                type="text"
                value={Alumno}
                onChange={(e) => setAlumno(e.target.value)}
              />
              {errors.Alumno && <p className="error">{errors.Alumno}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Grado: </label>
              <select
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
              >
                <option value="">Seleccione el Grado</option>
                {[1, 2, 3].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.grado && <p className="error">{errors.grado}</p>}
            </div>
            <div className="form-group">
              <label>Grupo: </label>
              <select
                value={grupo}
                onChange={(e) => setGrupo(e.target.value)}
              >
                <option value="">Seleccione el Grupo</option>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map((gr) => (
                  <option key={gr} value={gr}>
                    {gr}
                  </option>
                ))}
              </select>
              {errors.grupo && <p className="error">{errors.grupo}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expediente: </label>
              <select
                value={exp}
                onChange={(e) => setExp(e.target.value)}
              >
                <option value="">Seleccione el Expediente</option>
                {['BOLETA', 'CERTIFICADO', 'CONSTANCIA'].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.exp && <p className="error">{errors.exp}</p>}
            </div>
            <div className="form-group">
              <label>Resguardo: </label>
              <input
                type="text"
                value={Resguardo}
                onChange={(e) => setResguardo(e.target.value)}
              />
              {errors.Resguardo && <p className="error">{errors.Resguardo}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Caja: </label>
              <input
                type="text"
                value={Caja}
                onChange={(e) => setCaja(e.target.value)}
              />
              {errors.Caja && <p className="error">{errors.Caja}</p>}
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Actualizar</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
