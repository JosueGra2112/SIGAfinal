// src/Components/Modal.jsx
import React from 'react';
import './modalAct.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
