// Simple service worker for cache clearing
// Purpose is to clear old caches from previous site version

const CACHE_NAME = 'dexie-web-v2';

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing cache cleaner...');
  
  // Activate immediately without waiting
  self.skipWaiting();
  
  event.waitUntil(
    // Clear all old caches
    caches.keys().then((cacheNames) => {
      console.log('Service Worker: Found caches:', cacheNames);
      
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Service Worker: Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('Service Worker: All caches cleared');
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  
  // Take control of all open tabs immediately
  event.waitUntil(self.clients.claim());
  
  // Clear caches again on activation for safety
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // No caching - let all requests go directly to network
  // This ensures users always get the latest version
  event.respondWith(
    fetch(event.request).catch(() => {
      // If network fails, return a simple error message
      if (event.request.destination === 'document') {
        return new Response(
          '<!DOCTYPE html><html><body><h1>Offline</h1><p>Site is not available offline.</p></body></html>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
      // For other resources, return network error
      return Response.error();
    })
  );
});

// Message handler for manual cache clearing
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('Service Worker: Manually clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        // Send back confirmation
        event.ports[0].postMessage({ success: true });
      })
    );
  }
});