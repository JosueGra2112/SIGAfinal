import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';

const SessionTimeoutHandler = ({ timeoutDuration }) => {
  const [lastActiveTime, setLastActiveTime] = useLocalStorage('lastActiveTime', null);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId; 

    // Función para manejar la actividad del usuario
    const handleActivity = () => {
      setLastActiveTime(new Date().getTime()); // Actualizar el tiempo de última actividad
    };

    // Función para manejar la inactividad del usuario
    const handleInactive = () => {
      const currentTime = new Date().getTime();
      // Verificar si el tiempo transcurrido supera el límite de inactividad
      if (lastActiveTime && currentTime - lastActiveTime > timeoutDuration) {
        localStorage.removeItem('user'); // Eliminar la información del usuario del LocalStorage
        clearInterval(intervalId); // Detener el temporizador
        navigate('/Login'); // Redirigir al usuario a la página de inicio de sesión
      }
    };

    // Verificar si hay un usuario almacenado al cargar el componente
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const intervalId = setInterval(handleInactive, 1000); // Verificar la inactividad cada segundo
      // Registrar eventos de actividad para reiniciar el temporizador
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);

      // Limpiar los event listeners y el intervalo al desmontar el componente
      return () => {
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keydown', handleActivity);
        clearInterval(intervalId);
      };
    }
  }, [lastActiveTime, setLastActiveTime, timeoutDuration, navigate]);

  return null; // Este componente no renderiza nada
};

export default SessionTimeoutHandler;