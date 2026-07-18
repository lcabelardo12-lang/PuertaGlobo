const CACHE_NAME = 'duava-puente-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierta correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones de red y servir desde la caché si es posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Sirve desde caché
        }
        return fetch(event.request); // Si no está, lo baja de internet
      })
  );
});