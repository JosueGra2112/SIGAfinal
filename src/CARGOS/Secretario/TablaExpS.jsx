// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './expedientesS';
import Header from './HeaderS';
import Menu from './MenuS';



const TablaExp = () => {
  return (

<div>
<Header />
<Menu />

      <center><h1>Expedientes</h1></center>
      <Expedientes />
    </div>
  );
};

export default TablaExp;
