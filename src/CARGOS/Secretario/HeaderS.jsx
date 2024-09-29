import React from "react";
import { Link } from "react-router-dom";
import esgharNAME from '../IMG/SIGA.png';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <center><img src={esgharNAME} alt="esgharNAME" className="logo" /></center>
      </div>
      <div>
        <center><Link to="/Login" className="nav-link">Cerrar Sesión</Link></center>
      </div>
    </header>
  );
};

export default Header;
