import React, { useState, useEffect } from 'react';
import Header from './HeaderS';
import Menu from './MenuS';
import axios from 'axios';
import '../css/Diario.css'; 
import boletinImg from '../IMG/boletin.png'; 
import bitacoraImg from '../IMG/bitacora.png'; 
import { useNavigate } from 'react-router-dom';

const DiarioEventSec = () => {
  const [nuevaActividad, setNuevaActividad] = useState({
    tipoDiario: '',
    titulo: '',
    fecha: '',
    descripcion: '',
    thora: '' 
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser[0] && storedUser[0].Nombre) {
      setUsername(storedUser[0].Nombre);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const registrarActividad = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('https://sigaemail.host8b.me/registrarDiario.php', nuevaActividad);
      if (response.data.success) {
        setSuccessMessage('Diario creado exitosamente');
        enviarNotificaciones(response.data);
        setNuevaActividad({
          tipoDiario: '',
          titulo: '',
          fecha: '',
          descripcion: '',
          thora: '' 
        });
        setShowConfirmation(false);
      } else {
        console.error('Error al registrar actividad:', response.data.message);
        alert('Error al registrar la actividad. Verifica los datos e intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error en registrarDiario:', error);
      alert('Error al registrar la actividad. Verifica los datos e intenta nuevamente.');
    }
  };

  const enviarNotificaciones = async (data) => {
    try {
      const tokensResponse = await axios.get('https://sigaemail.host8b.me/ConsultarTokens.php');
      if (tokensResponse.data.success) {
        const tokens = tokensResponse.data.tokens;
        tokens.forEach(token => {
          axios.post('https://siga-firebase-dmugl1qgi-joxs-projects-fdf96bd4.vercel.app/', {
            tokenUser: token,
            title: data.data.title,
            body: data.data.body,
            url: data.data.url
          })
          .then(response => {
            console.log('Notificación enviada para token:', token);
          })
          .catch(error => {
            console.error('Error al enviar notificación:', error);
          });
        });
      } else {
        console.error('Error al consultar tokens:', tokensResponse.data.message);
      }
    } catch (error) {
      console.error('Error en ConsultarTokens:', error);
    }
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
    if (!validateForm()) return;
    setShowConfirmation(true); 
  };

  const handleCancel = () => {
    setShowConfirmation(false); 
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
            <button className="custom-button" onClick={() => handleNavigate('/BoletinSec')}>
              <img src={boletinImg} alt="Boletín" className="button-img" />
              Boletines
            </button>
            <button className="custom-button" onClick={() => handleNavigate('/BitacorasSec')}>
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
            <button className="button" onClick={registrarActividad}>Aceptar</button>
            <button className="button secondary" onClick={handleCancel}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiarioEventSec;
