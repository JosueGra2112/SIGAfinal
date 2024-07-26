import React, { useState, useEffect } from 'react';
import Header from './HeaderAdmi';
import Menu from './MenuAdmi';
import '../css/Diario.css'; // Importa el archivo CSS
import boletinImg from '../IMG/boletin.png'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import bitacoraImg from '../IMG/bitacora.png'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { useNavigate } from 'react-router-dom';

const Bitacoras = () => {
  const [nuevaActividad, setNuevaActividad] = useState({
    tipoDiario: '',
    titulo: '',
    fecha: '',
    descripcion: '',
    thora: '' // Agregar campo "thora"
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar la confirmación
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser[0] && storedUser[0].Nombre) {
      setUsername(storedUser[0].Nombre);
      console.log('Nombre del usuario:', storedUser[0].Nombre); // Verifica el nombre recuperado
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const agregarActividad = () => {
    if (!validateForm()) {
      return;
    }

    fetch('https://sigaemail.host8b.me/registrarDiario.php', {    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaActividad),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      setNuevaActividad({
        tipoDiario: '',
        titulo: '',
        fecha: '',
        descripcion: '',
        thora: '' // Limpiar campo "thora"
      });
      setSuccessMessage('Diario creado exitosamente');
      setShowConfirmation(false); // Ocultar la confirmación después de agregar la actividad
    })
    .catch(error => console.error('Error al registrar la actividad:', error));
  };

  const validateForm = () => {
    const { tipoDiario, titulo, fecha, descripcion, thora } = nuevaActividad;
    if (!tipoDiario || !titulo || !fecha || !descripcion || !thora) {
      alert('Favor de llenar todos los campos para agregar la actividad.');
      return false;
    }
    return true;
  };

  const handleVerify = () => {
    if (!validateForm()) {
      return;
    }
    setShowConfirmation(true); // Mostrar la confirmación
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Ocultar la confirmación
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div>
      <Header />
      <Menu />
      <div>
        <h1>{username}</h1>
        <div className="bitacoras-container">
          <h2 className="title">Diario de Eventos</h2>
          <div className="buttons-container">
            <button className="custom-button" onClick={() => handleNavigate('/BoletinAds')}>
              <img src={boletinImg} alt="Boletín" className="button-img" />
              Boletines
            </button>
            <button className="custom-button" onClick={() => handleNavigate('/BitacorasAds')}>
              <img src={bitacoraImg} alt="Bitácora" className="button-img" />
              Bitácora
            </button>
          </div>
          <div className="form">
            <select
              name="tipoDiario"
              value={nuevaActividad.tipoDiario}
              onChange={handleChange}
              className="input"
            >
              <option value="">Seleccione el tipo de diario</option>
              <option value="Boletín">Boletín</option>
              <option value="Bitácora">Bitácora</option>
            </select>
            <label className="label">Asunto</label>
            <input
              type="text"
              name="titulo"
              value={nuevaActividad.titulo}
              onChange={handleChange}
              className="input"
            />
            <label className="label">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={nuevaActividad.fecha}
              onChange={handleChange}
              className="input"
            />
            <label className="label">Hora</label>
            <input
              type="time"
              name="thora"
              value={nuevaActividad.thora}
              onChange={handleChange}
              className="input"
            />
            <label className="label">Agregar descripción</label>
            <textarea
              name="descripcion"
              placeholder="Agrega una descripción"
              value={nuevaActividad.descripcion}
              onChange={handleChange}
              className="textarea"
              rows="3"
            ></textarea>
            <button className="button" onClick={handleVerify}>Verificar datos</button>
          </div>
          {successMessage && <p className="successMessage">{successMessage}</p>}
        </div>
        {showConfirmation && (
          <div className="confirmation-dialog">
            <p>Verifique que los datos estén correctos.</p>
            <p>Los boletines y los datos que se registren en la bitácora no se pueden eliminar.</p>
            <button className="button" onClick={agregarActividad}>Aceptar</button>
            <button className="button secondary" onClick={handleCancel}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bitacoras;
