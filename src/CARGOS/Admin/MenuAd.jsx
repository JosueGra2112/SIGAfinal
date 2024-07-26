import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuAd.css'; // Asegúrate de tener un archivo CSS para los estilos del menú

//<li><Link to="../CargaAlm">Carga Alumnos</Link></li>
const MenuAd = () => {
  return (
    <div className="menu-inicio-container">
      <ul className="menu-inicio-list">
      <li><Link to="../SesionAdmin">Inicio</Link></li>  
        <li><Link to="../DiaEvent">Diario de Eventos</Link></li>
        <li><Link to="../UserControl">Perfiles</Link></li>
        <li><Link to="../CargaAlumnos">Carga Alumnos</Link></li>
        <li><Link to="../TablaAlumnos">Alumnos</Link></li>
        <li><Link to="../TablaHistoral">Solicitudes de Expediente</Link></li>
      </ul>
    </div>
  );
};

export default MenuAd;
