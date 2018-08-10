var cacheName = 'GIT-PWA';
const filesToCache = [
    './',
    '/index.html',
    'css/style.css',
    '/js/app.js',
    '/images/background.png',
    '/images/demo.png',
    '/images/logo.png'
];

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then(function(keyList) {        
          return Promise.all(keyList.map(function(key) {   
            if (key !== cacheName) {                         
              console.log('[ServiceWorker] Successfully removed old cache', key);
              return caches.delete(key);                           
            }
          }));
        })
      );
      return self.clients.claim();
    });


self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });