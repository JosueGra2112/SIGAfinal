module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{js,css,html,png,jpg,svg}',
  ],
  swSrc: 'public/firebase-messaging-sw.js',
  swDest: 'build/firebase-messaging-sw.js',
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
};
