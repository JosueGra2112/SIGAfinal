// src/Views/SesionAdmin.jsx
import React, { useEffect, useState } from 'react';
import '../index.css'; // Importa tu archivo de estilos
import Header from './HeaderSe';
import lup from '../IMG/pclup.png';
import SIGATEXT from '../IMG/SIGATEXT.png';
import SIGA from '../IMG/SIGA.png';
import BIEN from '../IMG/BIEN.png';
import Menu from './MenuAd';

const SesionAdmin = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <div className="Inicio">
      <Header />
      <Menu />
      <center>
        <h1>Administrador</h1>
        <h3>Bienvenido {username}</h3>
      </center>
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

export default SesionAdmin;
