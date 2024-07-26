import React, { useState } from 'react';
import '../css/modalRegistro.css'; // Importa el archivo CSS específico para el modal de registro

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    clave: '',
    cicloEsc: '',
    alumno: '',
    grado: '',
    grupo: '',
    expediente: '',
    resguardo: '',
    caja: '',
    archivo: null,
  });

  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setErrors('Solo se permiten archivos PDF');
      setFormData({ ...formData, archivo: null });
    } else {
      setErrors('');
      setFormData({ ...formData, archivo: file });
    }
  };

  const validateForm = () => {
    const {
      clave,
      cicloEsc,
      alumno,
      grado,
      grupo,
      expediente,
      resguardo,
      caja,
      archivo
    } = formData;

    if (
      !clave ||
      !cicloEsc ||
      !alumno ||
      !grado ||
      !grupo ||
      !expediente ||
      !resguardo ||
      !caja ||
      !archivo
    ) {
      setErrors('Favor de llenar todos los campos para realizar el registro.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('clave', formData.clave);
    formDataToSend.append('cicloEsc', formData.cicloEsc);
    formDataToSend.append('alumno', formData.alumno);
    formDataToSend.append('grado', formData.grado);
    formDataToSend.append('grupo', formData.grupo);
    formDataToSend.append('expediente', formData.expediente);
    formDataToSend.append('resguardo', formData.resguardo);
    formDataToSend.append('caja', formData.caja);
    formDataToSend.append('archivo', formData.archivo);

    try {
      const response = await fetch('https://sigaemail.host8b.me/RegistroExp.php', {
        method: 'POST',
        body: formDataToSend,
      });
      if (response.ok) {
        console.log('Expediente registrado correctamente');
      } else {
        console.error('Error al registrar el expediente');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }

    onClose();
  };

  return (
    isOpen && (
      <div className="registro-modal-overlay">
        <div className="registro-modal-content">
          <span className="registro-close" onClick={onClose}>&times;</span>
          <h2>Registro</h2>
          <form onSubmit={handleSubmit} className="registro-form">
            <div className="registro-form-row">
              <div className="registro-form-group">
                <label>Clave (CURP):</label>
                <input type="text" name="clave" value={formData.clave} onChange={handleChange} />
              </div>
              <div className="registro-form-group">
                <label>Ciclo Escolar:</label>
                <input type="text" name="cicloEsc" value={formData.cicloEsc} onChange={handleChange} />
              </div>
              <div className="registro-form-group">
                <label>Nombre del Alumno:</label>
                <input type="text" name="alumno" value={formData.alumno} onChange={handleChange} />
              </div>
            </div>
            <div className="registro-form-row">
              <div className="registro-form-group">
                <label>Grado:</label>
                <select name="grado" value={formData.grado} onChange={handleChange}>
                  <option value="">Seleccione el Grado</option>
                  {[1, 2, 3].map((grado) => (
                    <option key={grado} value={grado}>{grado}</option>
                  ))}
                </select>
              </div>
              <div className="registro-form-group">
                <label>Grupo:</label>
                <select name="grupo" value={formData.grupo} onChange={handleChange}>
                  <option value="">Seleccione el Grupo</option>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map((grupo) => (
                    <option key={grupo} value={grupo}>{grupo}</option>
                  ))}
                </select>
              </div>
              <div className="registro-form-group">
                <label>Expediente:</label>
                <select name="expediente" value={formData.expediente} onChange={handleChange}>
                  <option value="">Seleccione el Expediente</option>
                  <option value="BOLETA">BOLETA</option>
                  <option value="CERTIFICADO">CERTIFICADO</option>
                  <option value="CONSTANCIA">CONSTANCIA</option>
                </select>
              </div>
            </div>
            <div className="registro-form-row">
              <div className="registro-form-group">
                <label>Resguardo Físico:</label>
                <input type="text" name="resguardo" value={formData.resguardo} onChange={handleChange} />
              </div>
              <div className="registro-form-group">
                <label>Caja:</label>
                <input type="text" name="caja" value={formData.caja} onChange={handleChange} />
              </div>
              <div className="registro-form-group">
                <label>Insertar Archivo PDF:</label>
                <input type="file" name="archivo" onChange={handleFileChange} />
              </div>
            </div>
            {errors && <p className="registro-error">{errors}</p>}
            <div className="registro-form-buttons">
              <button type="submit" className="registro-btn registro-btn-primary">Registrar</button>
              <button type="button" className="registro-btn registro-btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
