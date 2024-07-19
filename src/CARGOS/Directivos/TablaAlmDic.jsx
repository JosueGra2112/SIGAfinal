// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './AlumnosDir';
import Header from './HeaderDic';
import Menu from './MenuDic';
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
