const CACHE_NAME = 'nyhetsida-chas-news-v2';
const DYNAMIC_CACHE_NAME = 'nyhetsida-dynamic-v2';

function shouldCache(response) {
  return response.ok && (response.type === 'basic' || response.type === 'cors');
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        'index.html',
      ]);
    })
  );
  self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            return caches.delete(cacheName); 
          }
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  event.respondWith(
    fetch(event.request).then(fetchResponse => {
      return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        if (shouldCache(fetchResponse)) {
          cache.put(event.request, fetchResponse.clone());
        }
        return fetchResponse;
      });
    }).catch(() => {
      return caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});
