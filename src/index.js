import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJLJPTXJuQj9IVAPIa5jzAZ75FJ7QO8Bw",
  authDomain: "push-siga.firebaseapp.com",
  projectId: "push-siga",
  storageBucket: "push-siga.appspot.com",
  messagingSenderId: "812030668721",
  appId: "1:812030668721:web:a4afd1d212d5fae8f25790",
  measurementId: "G-F4L287MBG5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// URL de tu servicio web para registrar el token
const webServiceURL = 'https://sigaemail.host8b.me/suscribirNotificaciones.php';

// Función para suscribirse a notificaciones y registrar el token en la base de datos
const subscribeToNotifications = async () => {
  try {
    const token = await getToken(messaging); // Obtener token de suscripción
    if (token) {
      console.log('Token de suscripción:', token);
      localStorage.setItem('fcmToken', token); // Guarda el token en localStorage

      // Enviar el token al servidor para su registro
      const response = await fetch(webServiceURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token }) // Enviar token en el cuerpo de la solicitud
      });

      const result = await response.json();
      if (result.success) {
        console.log('Token registrado exitosamente en la base de datos.');
      } else {
        console.log('Error al registrar el token:', result.message);
      }
    } else {
      console.log('No se pudo obtener el token de suscripción.');
    }
  } catch (error) {
    console.error('Error al obtener o registrar el token:', error);
  }
};

// Registrar el Service Worker y llamar a la función de suscripción
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
      subscribeToNotifications(); // Llama a la suscripción después del registro del Service Worker
    })
    .catch((registrationError) => {
      console.error('Error al registrar el Service Worker:', registrationError);
    });
} else {
  console.log('Service Workers no están soportados en este navegador.');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Medir el rendimiento de la app
reportWebVitals();
