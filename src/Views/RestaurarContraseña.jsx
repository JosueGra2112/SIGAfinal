import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

import './css/email.css';


const RestaurarContraseña = () => {
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [mostrarPregunta, setMostrarPregunta] = useState(false); // Estado para controlar si se muestra la pregunta secreta
  const [mostrarContraseña, setMostrarContraseña] = useState(false); // Estado para controlar si se muestra la contraseña
  const { usuario } = useParams();

  useEffect(() => {
    // Aquí debes hacer la llamada para obtener la pregunta secreta del usuario
    // Supongamos que obtienes la pregunta secreta y la guardas en una variable llamada pregunta
    const pregunta = "¿Cuál es el nombre de tu mascota?";
    setPreguntaSecreta(pregunta);
    setMostrarPregunta(true); // Muestra la pregunta secreta
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sigaemail.host8b.me/CambiarContrasena.php', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasenaNueva: contraseña }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      const data = await response.json();
      if (data.success) {
        alert('Contraseña cambiada con éxito');
        window.location.href = '/Login';
      } else {
        alert('Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };
  return (
    <div className="forgot-password-container">
      <Header />
      <div className="forgot-password-content">
      <center><h2 className="forgot-password-title">Restaurar la Contraseña</h2></center>
      <h1 className="forgot-password-description">Bienvenido: {usuario}</h1>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <h2 className="forgot-password-description">Nueva Contraseña</h2>
          <input type={mostrarContraseña ? 'text' : 'password'} placeholder="Nueva Contraseña" className="form-control" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <h2 className="forgot-password-description">Confirmar la Contraseña</h2>
          <input type={mostrarContraseña ? 'text' : 'password'} placeholder="Confirmar la Nueva Contraseña" className="form-control" value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} required />
        </div> 
        <button type="button" onClick={() => setMostrarContraseña(!mostrarContraseña)}>
            {mostrarContraseña ? 'Ocultar' : 'Mostrar'} Contraseña
          </button>
          <br />
          <br />
        <center><button type="submit">Restaurar Contraseña</button></center>
      </form>
 
    </div>
 

    </div>
    
  );
};

export default RestaurarContraseña;
