// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './tblacceso';
import Header from './HeaderSe';
import Menu from './MenuAd';


const TablaExp = () => {
  return (

<div>
<Header />
<Menu />
      <center><h1>Control de Acceso</h1></center>
      <Expedientes />
    </div>
  );
};

export default TablaExp;
