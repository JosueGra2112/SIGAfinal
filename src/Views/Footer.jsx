import React from "react";
import hidalgo from '../IMG/loghidalgo.png';
import facebookImage from '../IMG/facebook.png';
import emailImage from '../IMG/email.png';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section contact-info">
        <h3>Contacto</h3>
        <p>Calle Toribio Reyes No 4</p>
        <p>Colonia Juárez, Huejutla de Reyes Hidalgo</p>
        <p>C.P: 43000</p>
        <p>Entre Avenida Juárez y Leandro Valle</p>
      </div>

      <div className="footer-section image-container">
        <img src={hidalgo} alt="Escudo de Hidalgo" className="hidalgo-image" />
      </div>

      <div className="footer-section policies">
        <h3>Políticas</h3>
        <p>Políticas de Seguridad</p>
      </div>

      <div className="footer-section social-media">
        <h3>Redes Sociales</h3>
        <img src={facebookImage} alt="Facebook" className="social-media-icon" />
        <img src={emailImage} alt="Email" className="social-media-icon" />
      </div>
    </footer>
  );
};

export default Footer;
