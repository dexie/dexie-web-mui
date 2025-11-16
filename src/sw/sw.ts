// Offline-first service worker with warm-cache of all site pages
// Caches Next.js static assets, public assets and a compiled list of routes from /public/offline-manifest.json
// ES modules supported in Chrome 91+, Safari 15+, Firefox 114+ (June 2023)

/// <reference lib="webworker" />

import { offlineDB, type OfflineStatus } from '../db/offlineStatus'

const VERSION = 'v1';
const PRECACHE_NAME = `dexie-web-precache-${VERSION}`;
const RUNTIME_NAME = `dexie-web-runtime-${VERSION}`;
const MANIFEST_URL = '/offline-manifest.json';
const ORIGIN = self.location.origin;

// Utility: Save offline cache status to Dexie for GUI consumption
async function saveOfflineStatus(status: Partial<OfflineStatus>) {
  try {
    await offlineDB.status.put({
      id: 'cache',
      isWarming: false,
      isReady: false,
      ...status,
      updatedAt: new Date().toISOString()
    })
  } catch {
    // Fallback to message if Dexie access fails
    self.clients.matchAll({ includeUncontrolled: true }).then((clients: readonly Client[]) => {
      clients.forEach((client: Client) => client.postMessage({ type: 'OFFLINE_STATUS', ...status }));
    });
  }
}

// Utility: limit concurrent fetches when warming the cache
async function warmCacheFromManifest() {
  try {
    // Set initial status
    await saveOfflineStatus({
      isWarming: true,
      isReady: false,
      cached: 0,
      total: 0,
      startedAt: new Date().toISOString()
    });

    const res = await fetch(MANIFEST_URL, { cache: 'no-cache' });
    if (!res.ok) return;
    const manifest = await res.json();
    const urls = Array.from(new Set([...(manifest.routes || []), ...(manifest.assets || [])]))
      .filter((u) => typeof u === 'string')
      .map((u) => u.startsWith('http') ? u : new URL(u, ORIGIN).toString());

    const cache = await caches.open(RUNTIME_NAME);
    const concurrency = 8;
    let index = 0;
    let cached = 0;
    let alreadyCached = 0;
    const total = urls.length;
    
    // Update total count
    await saveOfflineStatus({
      isWarming: true,
      isReady: false,
      cached: 0,
      total,
      startedAt: new Date().toISOString()
    });
    
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
              cached++;
            }
          } else {
            alreadyCached++;
          }
          
          const totalProcessed = cached + alreadyCached;
          
          // Update progress every 10 processed items
          if (totalProcessed % 10 === 0) {
            await saveOfflineStatus({
              isWarming: true,
              isReady: false,
              cached: totalProcessed, // Total resources available, not just newly cached
              total,
              progress: Math.round((totalProcessed / total) * 100)
            });
          }
        } catch {
          // Swallow errors to avoid blocking other fetches
        }
      }
    }
    
    await Promise.all(Array.from({ length: concurrency }, () => worker()));
    
    const totalCached = cached + alreadyCached;
    
    // Set final completion status
    await saveOfflineStatus({
      isWarming: false,
      isReady: true,
      cached: totalCached, // Total resources available offline
      total,
      progress: 100,
      completedAt: new Date().toISOString()
    });
  } catch (e) {
    // Error status
    await saveOfflineStatus({
      isWarming: false,
      isReady: false,
      error: (e as Error).message,
      failedAt: new Date().toISOString()
    });
  }
}

self.addEventListener('install', (event: ExtendableEvent) => {
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

self.addEventListener('activate', (event: ExtendableEvent) => {
  // Take control immediately
  event.waitUntil(self.clients.claim());

  // Warm the runtime cache with all known pages & assets
  event.waitUntil(warmCacheFromManifest());
});

// Cache strategies
function isSameOrigin(req: Request) {
  try {
    const url = new URL(req.url);
    return url.origin === ORIGIN;
  } catch {
    return false;
  }
}

async function cacheFirst(event: FetchEvent) {
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

async function staleWhileRevalidate(event: FetchEvent): Promise<Response> {
  console.log("SW Fetch (SWR):", event.request.url);
  const cache = await caches.open(RUNTIME_NAME);
  const cachedPromise = cache.match(event.request);
  const networkPromise = fetch(event.request)
    .then(async (resp) => {
      console.log("SW Network response for:", event.request.url);
      if (resp && resp.ok && event.request.method === 'GET') {
        // Check if we have a cached version to compare with
        const cached = await cachedPromise;
        if (cached) {
          console.log("SW: Comparing content for", event.request.url);
          // Clone both responses early to avoid "already used" errors
          try {
            const cachedText = await cached.clone().text();
            const networkText = await resp.clone().text();
            
            // If content has changed, notify clients about the update
            // But only for navigation requests (documents/pages)
            if (cachedText !== networkText && event.request.mode === 'navigate') {
              console.log("SW: Document content updated for", event.request.url);
              self.clients.matchAll({ includeUncontrolled: true }).then((clients: readonly Client[]) => {
                clients.forEach((client: Client) => {
                  client.postMessage({ 
                    type: 'CONTENT_UPDATED',
                    url: event.request.url,
                    timestamp: new Date().toISOString()
                  });
                });
              });
            } else if (cachedText !== networkText) {
              console.log("SW: Content updated (non-document) for", event.request.url);
            } else {
              console.log("SW: Content unchanged for", event.request.url);
            }
          } catch (cloneError) {
            console.warn("SW: Could not compare content (response already used):", cloneError);
          }
        } else {
          console.log("SW: No cached version for", event.request.url);
        }
        
        // Clone again for cache storage
        cache.put(event.request, resp.clone());
      }
      return resp;
    })
    .catch(async (err) => {
      console.error("SW Network error for:", event.request.url, err);
      const cached = await cachedPromise;
      if (cached) return cached.clone(); // Clone to avoid "already used" error
      throw new Error('Network failed and no cache available');
    });

  const cached = await cachedPromise;
  return cached ? cached.clone() : await networkPromise; // Clone to avoid "already used" error
}

self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || !isSameOrigin(request)) {
    return; // allow default network
  }

  // Next.js static assets - immutable, cache forever
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(event));
    return;
  }

  // Public assets - images, icons etc - can change occasionally
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/favicon')) {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // All pages/documents - want fresh content but offline fallback
  if (request.mode === 'navigate' || 
      url.pathname.startsWith('/docs') || 
      url.pathname === '/' ||
      url.pathname.startsWith('/product') ||
      url.pathname.startsWith('/pricing') ||
      url.pathname.startsWith('/contact') ||
      url.pathname.startsWith('/privacy') ||
      url.pathname.startsWith('/terms')) {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // API routes and other dynamic content - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request).catch(() => 
      new Response('{"error":"API unavailable offline"}', {
        headers: { 'Content-Type': 'application/json' }
      })
    ));
    return;
  }

  // GitHub API for repo stats - network first with cache fallback
  if (url.hostname === 'api.github.com' && 
      (url.pathname.includes('/repos/dexie/Dexie.js') || 
       url.pathname.includes('/repos/dexie/'))) {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // Medium CDN images - stale while revalidate for offline blog content
  if (url.hostname === 'cdn-images-1.medium.com') {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // Google Fonts and static resources - cache first (rarely change)
  if (url.hostname === 'fonts.gstatic.com' || 
      url.hostname === 'ssl.gstatic.com' || 
      url.hostname === 'www.gstatic.com') {
    event.respondWith(cacheFirst(event));
    return;
  }

  // Google profile/avatar images - stale while revalidate
  if (url.hostname === 'lh3.googleusercontent.com') {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // Google Open Graph images - stale while revalidate
  if (url.hostname === 'ogs.google.com') {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  // Fallback: cache-first for anything else (rare edge cases)
  event.respondWith(cacheFirst(event));
});

// Message handler: clear cache or trigger warmup
// Clients can listen for CONTENT_UPDATED messages to detect when pages have been updated
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const type = event.data && event.data.type;
  if (type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n)))).then(async () => {
        // Reset offline status in Dexie - this is the authoritative source
        await saveOfflineStatus({
          isWarming: false,
          isReady: false,
          cached: 0,
          total: 0
        });
        
        // Optional: Notify clients that cache was cleared (for logging/UI feedback)
        self.clients.matchAll({ includeUncontrolled: true }).then((clients: readonly Client[]) => {
          clients.forEach((client: Client) => client.postMessage({ type: 'CACHE_CLEARED' }));
        });
      })
    );
  } else if (type === 'PREFETCH_ALL') {
    event.waitUntil(warmCacheFromManifest());
  }
});

// TypeScript globals for service worker
declare const self: ServiceWorkerGlobalScope & typeof globalThis;
export {};