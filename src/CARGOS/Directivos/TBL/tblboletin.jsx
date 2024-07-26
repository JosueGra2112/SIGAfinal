import React, { useState, useEffect } from 'react';
import './BOLETIN.css';

const Expedientes = () => {
  const [diario, setDiario] = useState(null);

  useEffect(() => {
    fetch('https://sigaemail.host8b.me/consultaDiarioBoletin.php')
      .then(response => response.json())
      .then(data => {
        console.log('Datos del diario:', data);
        setDiario(data);
      })
      .catch(error => console.error('Error al obtener los datos del diario:', error));
  }, []);

  return (
    <div className="diario-container">
      {diario ? (
        <div>
          {diario.map((item, index) => (
            <div key={index} className="diario-entry">
              <p className="diario-title"><strong>Asunto:</strong> {item.titulo}</p>
              <p className="diario-description"><strong>Descripción:</strong> {item.descripcion}</p>
              <p className="diario-date"><strong>Fecha:</strong> {item.fecha}</p>
              <p className="diario-time"><strong>Hora:</strong> {item.thora}</p>
              {index !== diario.length - 1 && <hr className="diario-divider" />}
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando datos del diario...</p>
      )}
    </div>
  );
};

export default Expedientes;
