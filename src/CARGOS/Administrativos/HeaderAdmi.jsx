import React from 'react';
import { Link } from 'react-router-dom';
import esgharNAME from '../IMG/SIGA.png'; // Cambia por el logo que necesites

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={esgharNAME} alt="Logo" style={{ width: '150px' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <center><Link to="/Login" className="nav-link text-white d-none d-lg-block">Cerrar Sesión</Link></center>
            </li>
            <li className="nav-item">
              <center>
                <Link to="/Login" className="nav-link text-white d-lg-none">
                  Cerrar Sesión
                </Link>
              </center>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
