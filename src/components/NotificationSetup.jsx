// NotificationSetup.jsx
import React, { useEffect } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

function NotificationSetup() {
  useEffect(() => {
    // Autenticación anónima automática
    const loguearse = () => {
      signInAnonymously(getAuth())
        .then(usuario => console.log("Usuario autenticado:", usuario))
        .catch(error => console.log("Error al autenticarse:", error));
    };

    // Solicitud de permisos y generación de token automática
    const activarMensajes = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: "BNsQxrH68uIyW9IRgcQIiCouNyyQGo3g16TxIEh92O7nZYm7jlhj7-LIsEuLLZrpEmj50qQjI4WDKkaphee2vVA"
          });
          if (token) {
            console.log("Token generado con éxito:", token);
          } else {
            console.log("No se pudo generar el token.");
          }
        } else {
          console.log("Permiso de notificación denegado.");
        }
      } catch (error) {
        console.error("Error al generar el token:", error.message, error.stack);
      }
    };

    loguearse();
    activarMensajes();
  }, []);

  return null; // No se renderiza ningún elemento visual
}

export default NotificationSetup;
