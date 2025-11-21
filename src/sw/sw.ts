// Offline-first service worker with smart background updates
// Detects updates on hard page loads, caches requested page first, then updates rest in background
// ES modules supported in Chrome 91+, Safari 15+, Firefox 114+ (June 2023)

// Background update service worker
// Check for updates on hard page loads, cache current page first, then update everything else

/// <reference lib="webworker" />

import { MDFullTextMeta } from "@/types/MDFullTextMeta"
import {
  offlineDB,
  type OfflineStatus,
  type CacheMetadata,
} from "../db/offlineDB"
import type { OfflineManifest } from "@/types/OfflineManifest"

const VERSION = "v3" // Bumped for simplified approach
const PRECACHE_NAME = `dexie-web-precache-${VERSION}`
const RUNTIME_NAME = `dexie-web-runtime-${VERSION}`
const MANIFEST_URL = "/offline-manifest.json"
const ORIGIN = self.location.origin

// Utility: Check if we need to update cache based on manifest changes
async function checkForUpdates(notifyClients = false) {
  console.log("🔍 Checking for updates...", { notifyClients })

    const res = await fetch(MANIFEST_URL, { cache: "no-cache" })
    if (!res.ok) {
      console.log("❌ Failed to fetch manifest:", res.status)
      return false
    }

    const manifest: OfflineManifest = await res.json()
    console.log("📄 Fetched manifest:", { generatedAt: manifest.generatedAt })

    // Check if manifest is newer than what we have cached
    const manifestMeta = await offlineDB.cacheMetadata.get("manifest")
    console.log("💾 Cached manifest meta:", manifestMeta)

    const isManifestNewer =
      !manifestMeta || manifestMeta.lastUpdated !== manifest.generatedAt
    console.log("🆕 Is manifest newer?", isManifestNewer, {
      cached: manifestMeta?.lastUpdated,
      new: manifest.generatedAt,
    })

    if (isManifestNewer) {
      console.log("🔄 New manifest detected, updating all routes and assets...")
      isUpdating = true
      try {
        await updateCacheFromManifest(manifest)

        // Update manifest metadata
        await offlineDB.cacheMetadata.put({
          id: "manifest",
          hash: null, // Not applicable for manifest
          lastUpdated: manifest.generatedAt,
        })
      } finally {
        isUpdating = false
      }

      // Notify clients about content updates if requested
      if (notifyClients) {
        console.log("📢 Notifying clients of new version...")
        const clients = await self.clients.matchAll({
          includeUncontrolled: true,
          type: "window",
        })
        console.log(`👥 Found ${clients.length} clients`)

        for (const client of clients) {
          client.postMessage({
            type: "VERSION_AVAILABLE",
            message: "New version available",
          })
        }
      }

      return true
    }

    console.log("✅ No updates needed")
    return false
}

// Track last update check to avoid excessive checking
let lastUpdateCheck = 0
let isUpdating = false
const UPDATE_CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes

// Check for updates and cache the current request first, then continue in background
async function checkForUpdatesAndCacheInBackground(request: Request) {
  // Only check on navigation requests and avoid excessive checking
  if (request.mode !== "navigate" || isUpdating) {
    return
  }

  // Check if this is likely a hard page load vs SPA navigation
  const referrer = request.referrer
  const isHardLoad =
    !referrer ||
    new URL(referrer).origin !== ORIGIN ||
    request.cache === "reload"

  if (!isHardLoad) {
    return
  }

  const now = Date.now()
  const timeSinceLastCheck = now - lastUpdateCheck

  if (timeSinceLastCheck < UPDATE_CHECK_INTERVAL) {
    return
  }

  lastUpdateCheck = now

  // Don't await this - let it run in background
  updateInBackground().catch((error) => {
    console.warn("❌ Background update failed:", error)
  })
}

// Background update process
async function updateInBackground() {
  // Don't try to update if we're offline
  console.log("updateInBackground: Checking online status...");
  if (!isLikelyOnline()) {
    console.log("Offline: skipping background update check")
    return
  }

  try {
    // Check if manifest has changed
    const res = await fetch(MANIFEST_URL, { cache: "no-cache" })
    if (!res.ok) return

    const manifest: OfflineManifest = await res.json()
    const manifestMeta = await offlineDB.cacheMetadata.get("manifest")

    const isManifestNewer =
      !manifestMeta || manifestMeta.lastUpdated !== manifest.generatedAt

    if (isManifestNewer) {
      console.log("🔄 New version detected, updating cache in background...")
      isUpdating = true

      try {
        await updateCacheFromManifest(manifest)

        // Update manifest metadata
        await offlineDB.cacheMetadata.put({
          id: "manifest",
          hash: null,
          lastUpdated: manifest.generatedAt,
        })

        console.log("✅ Background cache update completed")
      } finally {
        isUpdating = false
      }
    } else {
      console.log("✅ No background updates needed")
    }
  } catch (error) {
    console.warn("❌ Background update failed:", error)
    isUpdating = false
  }
}

// Utility: Clean up cache entries that are no longer in the manifest
async function cleanupRemovedEntries(manifest: OfflineManifest) {
  const cache = await caches.open(RUNTIME_NAME)
  const allManifestUrls = new Set([
    ...manifest.routes,
    ...Object.keys(manifest.assets),
  ])

  // Get all cached metadata entries
  const allCachedEntries = await offlineDB.cacheMetadata.toArray()
  const entriesToRemove = allCachedEntries.filter((entry) => {
    // Don't remove the manifest entry itself
    if (entry.id === "manifest") return false

    // Only remove if not in current manifest
    return !allManifestUrls.has(entry.id)
  })

  if (entriesToRemove.length > 0) {
    console.log(
      `Cleaning up ${entriesToRemove.length} removed entries from cache`
    )

    // Add a small delay to ensure any ongoing requests have completed
    await new Promise((resolve) => setTimeout(resolve, 1000))

    for (const entry of entriesToRemove) {
      try {
        // Remove from cache
        const req = new Request(new URL(entry.id, ORIGIN).toString())
        await cache.delete(req)

        // Remove from metadata
        await offlineDB.cacheMetadata.delete(entry.id)

        // Remove from full-text search if it's a docs route
        if (entry.id.startsWith("/docs/")) {
          await offlineDB.deleteFullTextDoc(entry.id)
        }

        console.log(`Removed cached entry: ${entry.id}`)
      } catch (error) {
        console.warn(`Failed to remove cached entry ${entry.id}:`, error)
      }
    }
  }
}

let ftsUpdated: number = 0;

// Utility: Update all routes and assets from manifest (simplified approach)
async function updateCacheFromManifest(manifest: OfflineManifest) {
  const cache = await caches.open(RUNTIME_NAME)

  // Get all routes and assets to process
  const allRoutes = manifest.routes
  const allAssets = Object.keys(manifest.assets)
  const allEntries = [...allRoutes, ...allAssets]
  const total = allEntries.length
  let processed = 0
  let updated = 0
  let index = 0
  let ftsIndex = 0
  const concurrency = 4

  // Set initial status
  await saveOfflineStatus({
    isWarming: true,
    isReady: false,
    cached: 0,
    failed: 0,
    total,
    progress: 0,
    startedAt: new Date().toISOString(),
  })

    async function ftsWorker() {
    while (ftsIndex < allEntries.length) {
      const entry = allEntries[ftsIndex++]
      const isAsset = allAssets.includes(entry)

      if (!isAsset && entry.startsWith("/docs/")) {
        try {
          await putFullTextIndex(entry)
        } catch (error) {
          console.warn(
            `Failed to update full-text index for ${entry}:`,
            error
          )
        }
      }
    }
  }

  const abortController = new AbortController()
  fetchRequested.addEventListener("fetchRequested", ()=>{
    abortController.abort();
  }, { once: true });


  async function worker() {
    const signal = abortController.signal;
    await new Promise<void>(resolve => setTimeout(resolve, 10));
    while (index < allEntries.length) {
      const entry = allEntries[index++]
      const isAsset = allAssets.includes(entry)
      const expectedHash = isAsset ? manifest.assets[entry] : null

      try {
        // For assets, check if hash has changed
        // For routes, always update since we don't track route hashes anymore
        let shouldUpdate = true

        if (isAsset && expectedHash) {
          const currentMeta = await offlineDB.cacheMetadata.get(entry)
          shouldUpdate = !currentMeta || currentMeta.hash !== expectedHash
        }

        if (shouldUpdate) {
          console.log(
            `🔄 Updating ${entry}${isAsset ? " (asset)" : " (route)"}...`
          )

          const req = new Request(new URL(entry, ORIGIN).toString(), {
            credentials: "same-origin",
            cache: "no-cache",
          })

          const resp = await fetch(req, { signal });

          if (resp.ok) {
            await cache.put(req, resp.clone())
            await offlineDB.cacheMetadata.put({
              id: entry,
              hash: expectedHash,
              lastUpdated: new Date().toISOString(),
            })
            updated++
          }
        }

        processed++

        // Update progress every 5 processed items
        if (processed % 5 === 0 || processed === total) {
          await saveOfflineStatus({
            isWarming: processed < total,
            isReady: processed === total,
            cached: updated,
            failed: processed - updated,
            total,
            progress: Math.round((processed / total) * 100),
          })
        }
      } catch (error) {
        processed++
        if (signal.aborted) {
          throw new DOMException("Update aborted due to fetch event", "AbortError");
        } else {
          console.warn(`Failed to update ${entry}:`, error)
        }
      }
    }
  }

  try {
    // Process full-text index updates in parallel
    if (Date.now() - ftsUpdated > 10 * 60 * 1000) {
      await Promise.all(
        Array.from({ length: concurrency }, () => ftsWorker())
      )
      ftsUpdated = Date.now();
    } else {
      console.log("Skipping full-text index update; last update was recent.");
    }
    // Process all entries
    await Promise.all(Array.from({ length: concurrency }, () => worker()))

    // Clean up old entries
    await cleanupRemovedEntries(manifest)

    // Final success status
    await saveOfflineStatus({
      isWarming: false,
      isReady: true,
      cached: updated,
      failed: processed - updated,
      total,
      progress: 100,
      completedAt: new Date().toISOString(),
    })

    console.log(
      `Cache update complete: ${updated} updated, ${
        processed - updated
      } unchanged`
    )
  } catch (error) {
    // Error status
    await saveOfflineStatus({
      isWarming: false,
      isReady: false,
      error: (error as Error).message,
      failedAt: new Date().toISOString(),
    })
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log("Update aborted due to fetch event, will resume later.");
      setTimeout(()=>updateInBackground(), 5000);
    }
    throw error
  }
}

// Utility: Save offline cache status to Dexie for GUI consumption
async function saveOfflineStatus(status: Partial<OfflineStatus>) {
  try {
    await offlineDB.status.put({
      id: "cache",
      isWarming: false,
      isReady: false,
      ...status,
      updatedAt: new Date().toISOString(),
    })
  } catch {
    // Fallback to message if Dexie access fails
    self.clients
      .matchAll({ includeUncontrolled: true })
      .then((clients: readonly Client[]) => {
        clients.forEach((client: Client) =>
          client.postMessage({ type: "OFFLINE_STATUS", ...status })
        )
      })
  }
}

self.addEventListener("install", (event: ExtendableEvent) => {
  // Activate immediately
  self.skipWaiting()

  event.waitUntil(
    (async () => {
      // Clean old precaches
      const names = await caches.keys()
      await Promise.all(
        names
          .filter((n) => n !== PRECACHE_NAME && n !== RUNTIME_NAME)
          .map((n) => caches.delete(n))
      )

      // Pre-cache a minimal offline shell
      const precache = await caches.open(PRECACHE_NAME)
      await precache.addAll(
        [
          "/",
          "/docs",
          "/favicon.ico",
          "/assets/images/og-images/og-base.png",
        ].map((u) => new Request(u, { credentials: "same-origin" }))
      )
    })()
  )
})

self.addEventListener("activate", (event: ExtendableEvent) => {
  // Take control immediately
  event.waitUntil(self.clients.claim())

  // Initial setup only - check if we need to populate cache
  event.waitUntil(
    (async () => {
      try {
        // For regular activations, just check if we have any cached content
        const manifestMeta = await offlineDB.cacheMetadata.get("manifest")
        if (!manifestMeta) {
          console.log("First install detected, populating cache...")
          isUpdating = true
          await checkForUpdates(false)
          isUpdating = false
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') {
          console.log("Activate setup aborted due to fetch event, will resume later.");
          setTimeout(()=>updateInBackground(), 5000);
        } else {
          console.warn("Activate setup failed:", e)
        }
        await saveOfflineStatus({
          isWarming: false,
          isReady: false,
          error: (e as Error).message,
          failedAt: new Date().toISOString(),
        })
      }
    })()
  )
})

// Listen for online/offline events to optimize behavior
self.addEventListener("online", () => {
  console.log("📶 Back online - enabling background updates")
})

self.addEventListener("offline", () => {
  console.log("📵 Gone offline - disabling background updates")
})

// Cache strategies
function isSameOrigin(req: Request) {
  try {
    const url = new URL(req.url)
    return url.origin === ORIGIN
  } catch {
    return false
  }
}

// Utility: Check if we're likely online
function isLikelyOnline(): boolean {
  // Use navigator.onLine if available, but it's not always reliable
  return "onLine" in navigator ? navigator.onLine : true
}

async function cacheFirst(event: FetchEvent) {
  const cache = await caches.open(RUNTIME_NAME)
  const request = event.request

  // Log request details for debugging prefetch behavior
  if (request.url.includes("/docs/")) {
    /*console.log("SW Request:", {
      url: request.url.split("/").pop(),
      mode: request.mode,
      destination: request.destination,
      cache: request.cache,
      hasRSC: request.url.includes("_rsc="),
      referrer: request.referrer ? "has-referrer" : "no-referrer",
    })*/
  }

  // Only do network-first for actual user navigation (NOT prefetch/RSC)
  const isUserNavigation =
    request.mode === "navigate" &&
    request.destination === "document" &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_rsc=") && // Next.js React Server Components (prefetch)
    request.cache !== "force-cache" // Prefetch often uses force-cache

  if (isUserNavigation && !isUpdating && isLikelyOnline()) {
    const request = event.request.clone();
    setTimeout(()=>checkForUpdatesAndCacheInBackground(request), 100)
  }

  // For USER navigation requests only, try network-first
  if (isUserNavigation && isLikelyOnline()) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const resp = await fetch(request, {
        signal: controller.signal,
        cache: "no-cache",
      })

      clearTimeout(timeoutId)

      if (resp && resp.ok) {
        await cache.put(request, resp.clone())
        console.log("Network-first served:", request.url.split("/").pop())
        return resp
      }
    } catch (err) {
      console.log(
        "Network failed, falling back to cache for:",
        request.url.split("/").pop()
      )
    }
  }

  // For ALL other requests (prefetch, assets, etc.), use cache-first
  const cached = await cache.match(request)

  if (cached) {
    console.log("Cache-first served:", request.url.split("/").pop())
    return cached
  }

  // For RSC requests, use shorter timeout to avoid blocking scrolling
  const isRSCRequest = request.url.includes("_rsc=")

  if (isLikelyOnline()) {
    try {
      /*const controller = new AbortController();
      // Shorter timeout for RSC requests to avoid blocking scrolling
      const timeout = isRSCRequest ? 1000 : 5000; // 1s for RSC, 5s for others
      const timeoutId = setTimeout(() => controller.abort(), timeout);*/

      const resp = await fetch(request)
      //clearTimeout(timeoutId);

      if (resp && resp.ok && request.method === "GET") {
        await cache.put(request, resp.clone())
        console.log(
          isRSCRequest ? "RSC served:" : "Network fallback served:",
          request.url.split("/").pop()
        )
      }
      return resp
    } catch (err) {
      console.log(
        isRSCRequest ? "RSC timeout/failed:" : "Network failed for:",
        request.url.split("/").pop()
      )
      if (isRSCRequest) {
        // For RSC requests, return a minimal response to avoid breaking navigation
        return new Response("", { status: 204 }) // No Content
      }
    }
  }

  // Final fallback for navigation
  if (request.mode === "navigate") {
    const shell = await caches.open(PRECACHE_NAME).then((c) => c.match("/"))
    if (shell) {
      return shell
    }
  }

  throw new Error("Unable to serve request offline")
}

const fetchRequested = new EventTarget();

self.addEventListener("fetch", (event: FetchEvent) => {
  fetchRequested.dispatchEvent(new CustomEvent("fetchRequested"));
  const { request } = event
  const url = new URL(request.url)

  // Only handle same-origin GET requests
  if (request.method !== "GET" || !isSameOrigin(request)) {
    return // allow default network
  }
  if (url.searchParams.get('_rsc')) {
    // Let RSC requests pass through unhandled to avoid caching
    // non-cachable responses
    return
  }

  // All same-origin requests use cache-first strategy
  // Our smart cache update system handles keeping content fresh
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/favicon") ||
    request.mode === "navigate" ||
    url.pathname.startsWith("/docs") ||
    url.pathname === "/" ||
    url.pathname.startsWith("/product") ||
    url.pathname.startsWith("/pricing") ||
    url.pathname.startsWith("/contact") ||
    url.pathname.startsWith("/privacy") ||
    url.pathname.startsWith("/terms")
  ) {
    event.respondWith(cacheFirst(event))
    return
  }

  // API routes and other dynamic content - network first
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request).catch(
        () =>
          new Response('{"error":"API unavailable offline"}', {
            headers: { "Content-Type": "application/json" },
          })
      )
    )
    return
  }

  // External resources - cache first for offline support
  if (
    url.hostname === "api.github.com" &&
    (url.pathname.includes("/repos/dexie/Dexie.js") ||
      url.pathname.includes("/repos/dexie/"))
  ) {
    event.respondWith(cacheFirst(event))
    return
  }

  if (url.hostname === "cdn-images-1.medium.com") {
    event.respondWith(cacheFirst(event))
    return
  }

  if (
    url.hostname === "fonts.gstatic.com" ||
    url.hostname === "ssl.gstatic.com" ||
    url.hostname === "www.gstatic.com"
  ) {
    event.respondWith(cacheFirst(event))
    return
  }

  if (url.hostname === "lh3.googleusercontent.com") {
    event.respondWith(cacheFirst(event))
    return
  }

  if (url.hostname === "ogs.google.com") {
    event.respondWith(cacheFirst(event))
    return
  }

  // Fallback: cache-first for anything else
  event.respondWith(cacheFirst(event))
})

// Message handler: clear cache
self.addEventListener("message", (event: ExtendableMessageEvent) => {
  const type = event.data && event.data.type
  if (type === "CLEAR_CACHE") {
    event.waitUntil(
      caches
        .keys()
        .then((names) => Promise.all(names.map((n) => caches.delete(n))))
        .then(async () => {
          // Reset offline status
          await saveOfflineStatus({
            isWarming: false,
            isReady: false,
            cached: 0,
            total: 0,
          })

          // Clear metadata
          await offlineDB.cacheMetadata.clear()

          // Notify clients that cache was cleared
          self.clients
            .matchAll({ includeUncontrolled: true })
            .then((clients: readonly Client[]) => {
              clients.forEach((client: Client) =>
                client.postMessage({ type: "CACHE_CLEARED" })
              )
            })
        })
    )
  } else if (type === "SKIP_WAITING") {
    // Allow clients to force service worker update
    self.skipWaiting()
  }
})

async function putFullTextIndex(route: string) {
  try {
    const req = new Request(`/full-text-search${route}.json`, {
      credentials: "same-origin",
    })
    const resp = await fetch(req)
    if (resp.ok) {
      const ftMeta = (await resp.json()) as MDFullTextMeta
      // Store in IndexedDB via Dexie
      for (const section of ftMeta.sections) {
        const url = section.slug ? `${route}#${section.slug}` : route
        const title = section.slug ? section.title : ftMeta.title || route
        const parentTitle = ftMeta.title || undefined
        await offlineDB.putFullTextDoc(url, title, section.content, parentTitle)
      }
    } else if (resp.status === 404) {
      // No full text index available for this route
      await offlineDB.deleteFullTextDoc(route)
    }
  } catch {}
}

// TypeScript globals for service worker
declare const self: ServiceWorkerGlobalScope & typeof globalThis
export {}
