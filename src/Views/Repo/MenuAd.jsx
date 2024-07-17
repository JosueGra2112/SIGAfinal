import React from 'react';
import { Link } from 'react-router-dom';
import './css/MenuAd.css'; // Asegúrate de tener un archivo CSS para los estilos del menú

//<li><Link to="../CargaAlm">Carga Alumnos</Link></li>
const MenuAd = () => {
  return (
    <div className="menu-inicio-container">
      <ul className="menu-inicio-list">
      <li><Link to="../sesionAd">Inicio</Link></li>  
        <li><Link to="../TablaExp">Expedientes</Link></li>
        <li><Link to="../ViewsBit">Diario de Eventos</Link></li>
        <li><Link to="../UserControl">Perfiles</Link></li>
        <li><Link to="../CargaAlumnos">Carga Alumnos</Link></li>
        <li><Link to="../TablaAlumnos">Alumnos</Link></li>
      </ul>
    </div>
  );
};

export default MenuAd;
