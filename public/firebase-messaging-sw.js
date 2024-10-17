// Importar las bibliotecas necesarias de Firebase
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

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

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Manejar mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("Mensaje en segundo plano recibido:", payload);

  const notificationTitle = payload.notification?.title || "Notificación";
  const notificationOptions = {
    body: payload.notification?.body || "Tienes una nueva notificación.",
    icon: "./SigaLogo.png", // Asegúrate de que la ruta sea válida
    data: {
      url: payload.data?.url || '/' // URL de redirección al hacer clic
    },
    actions: [
      { action: "view", title: "Ver", icon: "./view-icon.png" }
    ],
    badge: "./badge-icon.png", // Icono opcional que aparece en la notificación en dispositivos móviles
    vibrate: [200, 100, 200], // Vibración opcional para dispositivos móviles
  };

  // Mostrar la notificación en segundo plano
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejar el clic en la notificación
self.addEventListener('notificationclick', function(event) {
  console.log("Notificación clickeada:", event);
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const client = clientList.find(c => c.url === event.notification.data.url && 'focus' in c);
      if (client) {
        client.focus();
      } else {
        clients.openWindow(event.notification.data.url);
      }
    })
  );
});
