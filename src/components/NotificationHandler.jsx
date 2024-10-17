import React, { useEffect } from 'react';
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './NotificationHandler.css';

function NotificationHandler() {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Mensaje en primer plano:", payload);
      
      toast(
        <div className="notification-content">
          <strong className="notification-title">{payload.notification.title}</strong>
          <p className="notification-body">{payload.notification.body}</p>
          {payload.data?.url && (
            <a href={payload.data.url} target="_blank" rel="noopener noreferrer" className="notification-link">
              Ver más
            </a>
          )}
        </div>, 
        {
          icon: "🔔", // Ícono de notificación
          className: "custom-toast", // Clase CSS personalizada
        }
      );
    });
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right" // Cambiado para mostrar en la parte superior derecha
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true} // Opcional: muestra las notificaciones nuevas en la parte superior
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default NotificationHandler;
