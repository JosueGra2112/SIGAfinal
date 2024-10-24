module.exports = {
    globDirectory: 'build/', // Directorio de build donde se encuentran los archivos generados
    globPatterns: [
      '**/*.{js,css,html,png,jpg,svg}', // Almacena archivos generados de scripts, estilos, html, imágenes
    ],
    swSrc: 'public/firebase-messaging-sw.js', // Archivo fuente del service worker (ruta correcta)
    swDest: 'build/service-worker.js', // Genera el service worker en la carpeta build
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // Máximo 4MB por archivo
  };
  