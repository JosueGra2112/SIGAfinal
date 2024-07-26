import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuAd.css'; // Asegúrate de tener un archivo CSS para los estilos del menú

//<li><Link to="../CargaAlm">Carga Alumnos</Link></li>
const MenuAd = () => {
  return (
    <div className="menu-inicio-container">
      <ul className="menu-inicio-list">
      <li><Link to="../sesionD">Inicio</Link></li>  
        <li><Link to="../Acti">Actividades</Link></li>
      </ul>
    </div>
  );
};

export default MenuAd;
