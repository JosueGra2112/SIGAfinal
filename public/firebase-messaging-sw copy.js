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
if (typeof workbox !== 'undefined') {
  console.log('Workbox cargado correctamente.');

  // Precaching de los archivos generados en build (como index.html, main.js, main.css)
  if (self.__WB_MANIFEST && Array.isArray(self.__WB_MANIFEST)) {
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
  } else {
    console.error('Error: __WB_MANIFEST no está disponible o no es un array.');
  }

  // Forzar la instalación y activación del Service Worker
  self.addEventListener('install', (event) => {
    console.log('Service Worker instalando y forzando cacheado...');
    self.skipWaiting(); // Fuerza que el nuevo Service Worker se active de inmediato
  });

  self.addEventListener('activate', (event) => {
    console.log('Service Worker activado.');
    event.waitUntil(self.clients.claim()); // Forzar a que el nuevo SW controle todas las páginas inmediatamente
  });

  // Cache de rutas específicas (Login, Inicio, AcercaDe)
  workbox.routing.registerRoute(
    ({ url }) => ['/Login', '/', '/AcercaDe'].includes(url.pathname),
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  // Estrategia para el caché de archivos JavaScript y CSS
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  // Estrategia para el caché de imágenes
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  // Estrategia para el caché de los archivos JSON de datos
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document' && request.url.endsWith('.json'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'json-data-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    })
  );

  // Detectar si faltan archivos en el caché y recachear
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response; // Retorna del caché si está disponible
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            caches.open('pages-cache').then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      }).catch(() => {
        return caches.match('/offline.html'); // Página offline como fallback
      })
    );
  });

} else {
  console.error('Workbox no pudo cargarse.');
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
