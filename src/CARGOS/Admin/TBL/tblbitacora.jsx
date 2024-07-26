import React, { useState, useEffect } from 'react';
import './Bitacoras.css';  // Importa el archivo CSS para Bitacoras

const Expedientes = () => {
  const [diario, setDiario] = useState(null);

  useEffect(() => {
    fetch('https://sigaemail.host8b.me/consultaDiario.php')
      .then(response => response.json())
      .then(data => {
        console.log('Datos del diario:', data);
        setDiario(data); // Almacena los datos del diario en el estado
      })
      .catch(error => console.error('Error al obtener los datos del diario:', error));
  }, []);

  return (
    <div className="bitacora-container">
      {diario ? (
        <div>
          {diario.map((item, index) => (
            <div key={index} className="bitacora-entry">
              <p className="bitacora-title"><strong>Asunto:</strong> {item.titulo}</p>
              <p className="bitacora-description"><strong>Descripción:</strong> {item.descripcion}</p>
              <p className="bitacora-date"><strong>Fecha:</strong> {item.fecha}</p>
              <p className="bitacora-time"><strong>Hora:</strong> {item.thora}</p>
              {index !== diario.length - 1 && <hr className="bitacora-divider" />}
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
