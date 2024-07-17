import React from 'react';
import { Link } from 'react-router-dom';
import './css/MenuAd.css'; // Asegúrate de tener un archivo CSS para los estilos del menú

const MenuInicio = () => {
  return (
    <div className="menu-inicio-container">
      <ul className="menu-inicio-list">
      <li><Link to="../sesion">Inicio</Link></li>  
        <li><Link to="../CargaAct">Cargar Archivos</Link></li>
        <li><Link to="../DownAct">Actividades</Link></li>
        <li><Link to="">Vizualizar Sabanas</Link></li>
        <li><Link to="">Dato3</Link></li>
      </ul>
    </div>
  );
};

export default MenuInicio;
