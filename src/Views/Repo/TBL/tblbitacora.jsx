import React, { useState, useEffect } from 'react';

const Expedientes = () => {
  const [diario, setDiario] = useState(null);

  useEffect(() => {
    // Realizar la solicitud al servicio web para obtener los datos del diario
    //fetch('http://localhost/WebServices/consultaDiario.php')
    fetch('https://sigaemail.host8b.me/consultaDiario.php')
    .then(response => response.json())
    .then(data => {
      console.log('Datos del diario:', data);
      setDiario(data); // Almacena los datos del diario en el estado
    })
    .catch(error => console.error('Error al obtener los datos del diario:', error));
}, []);

  return (
    <div className="diario-container">
      <style>
        {`
          .diario-container {
            font-family: Arial, sans-serif;
            padding: 30px;
          }

          .diario-entry {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            padding: 20px;
          }

          .diario-entry p {
            margin: 10px 0;
          }

          .diario-entry hr {
            border: none;
            border-top: 1px solid #ccc; /* Línea divisoria gris */
            margin: 20px 0; /* Espacio por encima y por debajo de la línea divisoria */
          }
        `}
      </style>
      {diario ? (
        <div>
          {diario.map((item, index) => (
            <div key={index} className="diario-entry">
              <p><strong>Asunto:</strong> {item.titulo}</p>
              <p><strong>Descripción:</strong> {item.descripcion}</p>
              <p><strong>Fecha:</strong> {item.fecha}</p>
              <p><strong>Hora:</strong> {item.thora}</p>
              {index !== diario.length - 1 && <hr />} {/* Agrega una línea divisoria entre entradas */}
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
