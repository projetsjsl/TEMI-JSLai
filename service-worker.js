
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('temi-cache').then(function(cache) {
      return cache.addAll([
        './simulateur_temi_ultra_plus_plus.html',
        './manifest.json',
        './icon-192x192.png',
        './icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
