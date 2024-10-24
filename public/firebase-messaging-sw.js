importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.2/workbox-sw.js');
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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Precaching de Workbox para los archivos generados en build
if (workbox) {
  console.log('Workbox cargado correctamente de Firebase');

  // Precaching de los archivos que fueron generados en build
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // Estrategia de caché para las rutas importantes de la app
  workbox.routing.registerRoute(
    ({ request, url }) => request.mode === 'navigate' && url.pathname.startsWith('/'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50, // Número máximo de rutas a almacenar en caché
          maxAgeSeconds: 30 * 24 * 60 * 60 // Almacena por 30 días
        }),
      ],
    })
  );
  // Estrategia de caché para imágenes
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días de caché para imágenes
        }),
      ],
    })
  );
} else {
  console.log('Workbox no pudo cargarse.');
}

// Manejar notificaciones en segundo plano de Firebase
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'Nueva notificación';
  const notificationOptions = {
    body: payload.notification?.body || 'Tienes una nueva notificación',
    icon: './SigaLogo.png',
    data: {
      url: payload.data?.url || '/'
    },
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manejar el clic en la notificación
self.addEventListener('notificationclick', (event) => {
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