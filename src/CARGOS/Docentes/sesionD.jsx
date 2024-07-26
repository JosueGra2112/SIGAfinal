import React, { useEffect, useState } from 'react';
import '../index.css'; // Importa tu archivo de estilos

import Header from './HeaderD';
import Menu from './MenuD';

import lup from '../IMG/pclup.png';
import SIGATEXT from '../IMG/SIGATEXT.png';
import SIGA from '../IMG/SIGA.png';
import BIEN from '../IMG/BIEN.png';

const Inicio = () => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setFullName(storedUser);
    }
  }, []);

  return (
    <div className="Inicio">
      <Header />
      <Menu />
      <center><h1>DOCENTES</h1></center>
      <center><h3>Bienvenido Prof. {fullName}</h3></center>
      <main className="App-main" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={lup} alt="Lup" style={{ alignItems: 'center', maxWidth: '30%', marginLeft: '50px', marginRight: '50px' }} />
        <div>
          <center><img src={BIEN} alt="BIEN" style={{ maxWidth: '30%' }} /></center>
          <br />
          <img src={SIGATEXT} alt="SIGATEXT" style={{ maxWidth: '90%', marginLeft: '50px', marginRight: '50px' }} />
          <br />
          <br />
          <center><img src={SIGA} alt="SIGA" style={{ maxWidth: '10%' }} /></center>
        </div>
      </main>
    </div>
  );
};

export default Inicio;
