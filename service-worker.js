
// service-worker.js

const CACHE_NAME = 'reer-temi-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/simulateur.js',
  '/graphique.js',
  '/tableau.js',
  '/tauxMarginauxCQFF.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
