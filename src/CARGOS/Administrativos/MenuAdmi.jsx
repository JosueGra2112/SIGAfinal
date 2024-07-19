import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuAd.css'; // Asegúrate de tener un archivo CSS para los estilos del menú

//<li><Link to="../CargaAlm">Carga Alumnos</Link></li>
const MenuAd = () => {
  return (
    <div className="menu-inicio-container">
      <ul className="menu-inicio-list">
      <li><Link to="../SesionAdmi">Inicio</Link></li>  
        <li><Link to="../DiaEventAdmi">Diario de Eventos</Link></li>
        <li><Link to="../TblExpS">Expedientes</Link></li>
        <li><Link to="../CargaAlumnosAdmi">Carga Alumnos</Link></li>
        <li><Link to="../TablaAlumnosAdmu">Alumnos</Link></li>
      </ul>
    </div>
  );
};

export default MenuAd;
