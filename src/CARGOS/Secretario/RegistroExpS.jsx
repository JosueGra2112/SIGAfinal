import React, { useState } from 'react';
import Modal from './modal'; // Asegúrate de importar el componente Modal desde el archivo correcto
import expedienteImg from '../IMG/expediente.png';
import '../css/button.css';
import '../css/modalAct.css';

const RegistroExpediente = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="register-button">
        <img src={expedienteImg} alt="expediente" className="icon" />
        <span className="button-text">Nuevo Registro</span>
      </button>

      {/* Componente Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={onSubmit} />
    </div>
  );
};

export default RegistroExpediente;
