// src/Views/Inicio.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import lup from '../IMG/SigaLogo.png';
import SIGATEXT from '../IMG/SIGATEXT.png';
import SIGA from '../IMG/SIGA.png';

import IM1 from '../IMGCAR/IMG4.png';
import IM2 from '../IMGCAR/IMG2.png';
import IM3 from '../IMGCAR/IMG3.png';

import calendarioImage from '../IMG/calendario.png';
import bitacoraImage from '../IMG/bitacora.png';
import boletinImage from '../IMG/boletin.png';

import Breadcrumbs from './Breadcrumbs';
import './css/Inicio.css'; // Importamos el CSS personalizado

const Inicio = () => {
  const botones = [
    {
      titulo: 'Calendario',
      imagen: calendarioImage,
      descripcion: 'Calendario de todos los meses de actividad en la institución',
      link: '/Calendario',
    },
    {
      titulo: 'Bitácora',
      imagen: bitacoraImage,
      descripcion: 'Actividades que se realizan al día en la institución',
      link: '/Bitacoras',
    },
    {
      titulo: 'Boletín',
      imagen: boletinImage,
      descripcion: 'Festividades de la institución, actividades escolares',
      link: '/Boletin',
    },
  ];

  const handleMouseEnter = (index) => {
    const element = document.getElementById(`overlay-${index}`);
    const image = document.getElementById(`image-${index}`);
    if (element && image) {
      element.style.opacity = 1;
      image.style.transform = 'scale(1.1)';
    }
  };

  const handleMouseLeave = (index) => {
    const element = document.getElementById(`overlay-${index}`);
    const image = document.getElementById(`image-${index}`);
    if (element && image) {
      element.style.opacity = 0;
      image.style.transform = 'scale(1)';
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="Inicio">
      <Header />
      <Breadcrumbs />
      <main className="App-main">
        <img src={lup} alt="Lup" className="logo-lup" />
        <div className="sigatext-container">
          <img src={SIGATEXT} alt="SIGATEXT" className="sigatext" />
          <img src={SIGA} alt="SIGA" className="siga" />
        </div>
      </main>

      <Slider {...settings} className="slider-container">
        <div>
          <img src={IM1} alt="IM1" className="slider-img" />
        </div>
        <div>
          <img src={IM2} alt="IM2" className="slider-img" />
        </div>
        <div>
          <img src={IM3} alt="IM3" className="slider-img" />
        </div>
      </Slider>

      <main className="App-main">
        {botones.map((boton, index) => (
          <Link to={boton.link} key={index} className="noticia-link">
            <div
              className="noticia"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <img id={`image-${index}`} src={boton.imagen} alt={boton.titulo} className="noticia-img" />
              <div className="overlay" id={`overlay-${index}`}>
                <h2>{boton.titulo}</h2>
                <p>{boton.descripcion}</p>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Inicio;
