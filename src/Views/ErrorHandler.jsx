import React, { useState, useEffect } from 'react';

const ErrorHandler = ({ children }) => {
  useEffect(() => {
    // Manejar errores de red utilizando el evento 'offline'
    const handleOffline = () => {
      alert('Error 500: No hay respuesta del servidor. Por favor, verifica tu conexión.');
    };

    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default ErrorHandler;
