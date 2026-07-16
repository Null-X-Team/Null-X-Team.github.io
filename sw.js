const CACHE_NAME = 'nxos-cache-v1';

// We don't need to manually pre-cache everything; we just intercept fetches
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Intercept fetch requests to serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

// Listen for a message from main.js to clear the cache and reload
self.addEventListener('message', (event) => {
  if (event.data === 'FORCE_CLEAR_CACHE') {
    caches.keys().then((names) => {
      for (let name of names) {
        caches.delete(name);
      }
    }).then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.navigate(client.url);
        });
      });
    });
  }
});
