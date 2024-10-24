import React, { useEffect, useState, useRef } from 'react';

const SessionTimeoutHandler = ({ timeoutDuration }) => {
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const timeoutIdRef = useRef(null);

  // Función para resetear el contador de inactividad
  const resetTimeout = () => {
    setLastActivityTime(Date.now());
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    startTimeout();
  };

  // Función que se ejecuta cuando el tiempo de inactividad ha superado el límite
  const handleTimeout = () => {
    console.log('Tiempo de inactividad alcanzado. Cerrando sesión...');
    // Aquí puedes poner la lógica para cerrar la sesión o redirigir a la pantalla de inicio de sesión
    window.localStorage.removeItem('user'); // Eliminar el usuario del localStorage
    window.location.href = 'https://sigapwa.host8b.me/#/Login'; // Redirigir a la página de inicio de sesión
  };

  // Inicia el temporizador de inactividad
  const startTimeout = () => {
    timeoutIdRef.current = setTimeout(() => {
      const timeSinceLastActivity = Date.now() - lastActivityTime;
      if (timeSinceLastActivity >= timeoutDuration) {
        handleTimeout();
      }
    }, timeoutDuration);
  };

  // Agregar detectores de eventos para detectar actividad del usuario
  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart', 'touchmove'];
    const resetTimeoutListener = () => resetTimeout();

    events.forEach(event => window.addEventListener(event, resetTimeoutListener));

    startTimeout();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimeoutListener));
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [lastActivityTime]);

  return null; // Este componente no renderiza nada, solo maneja la lógica de tiempo de espera
};

export default SessionTimeoutHandler;
