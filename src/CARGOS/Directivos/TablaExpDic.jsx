// src/Views/TablaExp.jsx
import React from 'react';
import Expedientes from './expedientesDir';
import Header from './HeaderDic';
import Menu from './MenuDic';



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
