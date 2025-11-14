// Offline-first service worker with warm-cache of all site pages
// Caches Next.js static assets, public assets and a compiled list of routes from /public/offline-manifest.json

const VERSION = 'v1';
const PRECACHE_NAME = `dexie-web-precache-${VERSION}`;
const RUNTIME_NAME = `dexie-web-runtime-${VERSION}`;
const MANIFEST_URL = '/offline-manifest.json';
const ORIGIN = self.location.origin;

// Utility: limit concurrent fetches when warming the cache
async function warmCacheFromManifest() {
  try {
    const res = await fetch(MANIFEST_URL, { cache: 'no-cache' });
    if (!res.ok) return;
    const manifest = await res.json();
    const urls = Array.from(new Set([...(manifest.routes || []), ...(manifest.assets || [])]))
      .filter((u) => typeof u === 'string')
      .map((u) => u.startsWith('http') ? u : new URL(u, ORIGIN).toString());

    const cache = await caches.open(RUNTIME_NAME);
    const concurrency = 8;
    let index = 0;
    async function worker() {
      while (index < urls.length) {
        const url = urls[index++];
        try {
          const req = new Request(url, { credentials: 'same-origin' });
          const existing = await cache.match(req);
          if (!existing) {
            const resp = await fetch(req);
            if (resp.ok) {
              await cache.put(req, resp.clone());
            }
          }
        } catch (err) {
          // Swallow errors to avoid blocking other fetches
          // console.warn('Warm cache fetch failed', url, err);
        }
      }
    }
    await Promise.all(Array.from({ length: concurrency }, () => worker()));
  } catch (e) {
    // Ignore if manifest missing in dev or build
  }
}

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting();

  event.waitUntil(
    (async () => {
      // Clean old precaches
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((n) => n !== PRECACHE_NAME && n !== RUNTIME_NAME)
          .map((n) => caches.delete(n))
      );

      // Pre-cache a minimal offline shell
      const precache = await caches.open(PRECACHE_NAME);
      await precache.addAll([
        '/',
        '/docs',
        '/favicon.ico',
        '/assets/images/og-images/og-base.png'
      ].map((u) => new Request(u, { credentials: 'same-origin' })));
    })()
  );
});

self.addEventListener('activate', (event) => {
  // Take control immediately
  event.waitUntil(self.clients.claim());

  // Warm the runtime cache with all known pages & assets
  event.waitUntil(warmCacheFromManifest());
});

// Cache strategies
function isSameOrigin(req) {
  try {
    const url = new URL(req.url);
    return url.origin === ORIGIN;
  } catch {
    return false;
  }
}

async function cacheFirst(event) {
  const cache = await caches.open(RUNTIME_NAME);
  const cached = await cache.match(event.request);
  if (cached) return cached;
  try {
    const resp = await fetch(event.request);
    if (resp && resp.ok && event.request.method === 'GET') {
      await cache.put(event.request, resp.clone());
    }
    return resp;
  } catch (err) {
    // Fallback to offline shell for documents
    if (event.request.mode === 'navigate') {
      const shell = await caches.open(PRECACHE_NAME).then((c) => c.match('/'));
      if (shell) return shell;
    }
    throw err;
  }
}

async function staleWhileRevalidate(event) {
  const cache = await caches.open(RUNTIME_NAME);
  const cachedPromise = cache.match(event.request);
  const networkPromise = fetch(event.request)
    .then((resp) => {
      if (resp && resp.ok && event.request.method === 'GET') {
        cache.put(event.request, resp.clone());
      }
      return resp;
    })
    .catch(() => cachedPromise);

  const cached = await cachedPromise;
  return cached || networkPromise;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || !isSameOrigin(request)) {
    return; // allow default network
  }

  // Next.js static assets
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(event));
    return;
  }

  // Public assets
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/favicon')) {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // Documents / pages
  if (request.mode === 'navigate' || url.pathname.startsWith('/docs')) {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // Fallback: cache-first for other GET requests
  event.respondWith(cacheFirst(event));
});

// Message handler: clear cache or trigger warmup
self.addEventListener('message', (event) => {
  const type = event.data && event.data.type;
  if (type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n)))).then(() => {
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
        // Notify clients
        self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
          clients.forEach((client) => client.postMessage({ type: 'CACHE_CLEARED' }));
        });
      })
    );
  } else if (type === 'PREFETCH_ALL') {
    event.waitUntil(warmCacheFromManifest());
  }
});