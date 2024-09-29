import React, { useEffect, useState } from 'react';

import Header from './HeaderS';
import Menu from './MenuS';
import lup from '../IMG/pclup.png';
import SIGATEXT from '../IMG/SIGATEXT.png';
import SIGA from '../IMG/SIGA.png';
import BIEN from '../IMG/BIEN.png';

const SesionAdmin = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setNombreCompleto(storedUser);
    }
  }, []);

  return (
    <div className="Inicio">
      <Header />
      <Menu />
      <div className="container mt-5">
        <center>
          <h1>SECRETARIOS</h1>
          <h3>Bienvenido Secr. {nombreCompleto}</h3>
        </center>
        
        <div className="row justify-content-center align-items-center mt-4">
          <div className="col-md-4 text-center">
            <img src={lup} alt="Lup" className="img-fluid" />
          </div>
          <div className="col-md-8 text-center">
            <img src={BIEN} alt="BIEN" className="img-fluid mb-3" />
            <img src={SIGATEXT} alt="SIGATEXT" className="img-fluid mb-3" />
            <img src={SIGA} alt="SIGA" className="img-fluid" style={{ maxWidth: '80px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SesionAdmin;
