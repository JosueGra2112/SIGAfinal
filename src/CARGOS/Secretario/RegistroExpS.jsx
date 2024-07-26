import React, { useState } from 'react';
import Modal from './modal'; // Asegúrate de importar el componente Modal desde el archivo correcto
import expedienteImg from './expediente.png';
import './button.css'
import './modalAct.css'

const RegistroExpediente = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="register-button">
        <img src={expedienteImg} alt="expediente" className="icon" />
        Nuevo Registro
      </button>

      {/* Agregar el componente Modal aquí */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={onSubmit} />
    </div>
  );
};

export default RegistroExpediente;
