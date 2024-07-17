import React from "react";
import { Link } from "react-router-dom";
import esgharImage from '../IMG/ESGHAR.png';
import esgharNAME from '../IMG/ESGHARNAME.png';
import './css/Header.css';


const Header = () => {


  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={esgharImage} alt="Esghar" className="logo" />
          <img src={esgharNAME} alt="esgharNAME" style={{ maxWidth: '20%' }} />
        </div>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/AcercaDe" className="nav-link">Acerca De</Link>
          <Link to="/Login" className="nav-link">Iniciar Sesión</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
