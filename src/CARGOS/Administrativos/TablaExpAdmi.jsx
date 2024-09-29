// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './ExpedientesDocV';
import Header from './HeaderAdmi';
import Menu from './MenuAdmi';


const TablaExp = () => {
  return (
    <div>
      {/* Hacer el Header y Menu responsivos */}
      <Header />
      <Menu />

      {/* Contenedor para el contenido principal */}
      <div className="container mt-5">
        {/* Título centrado */}
        <center><h1>Expedientes</h1></center>

        {/* Contenido de la tabla */}
        <div className="row">
          <div className="col-12">
            <Expedientes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaExp;
