// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './Alumnos';
import Header from './HeaderSe';
import Menu from './MenuAd';
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
