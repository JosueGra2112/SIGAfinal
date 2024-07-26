// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './AlumnosAdmi';
import Header from './HeaderAdmi';
import Menu from './MenuAdmi';
const TablaExp = () => {
  return (

<div>
<Header />
<Menu />
      <center><h1>ALUMNOS</h1></center>
      <Expedientes />
    </div>
  );
};

export default TablaExp;
