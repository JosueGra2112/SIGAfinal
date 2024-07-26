// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './Historial';
import Header from './HeaderSe';
import Menu from './MenuAd';
const TablaExp = () => {
  return (

<div>
<Header />
<Menu />
      <center><h1>Solicitudes</h1></center>
      <Expedientes />
    </div>
  );
};

export default TablaExp;
