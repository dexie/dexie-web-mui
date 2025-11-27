'use client'

import { offlineDB } from '@/db/offlineDB'
import { MDFullTextMeta } from '@/types/MDFullTextMeta'
import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    console.log('ServiceWorker check:', {
      hasNavigator: 'serviceWorker' in navigator,
      nodeEnv: process.env.NODE_ENV,
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'undefined'
    })
    
    // Only register service worker in production
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      console.log('Attempting to register service worker...')
      // Register service worker as ES module
      navigator.serviceWorker
        .register('/sw.js', { type: 'module' })
        .then((registration) => {
          console.log('Service Worker (ESM) registered:', registration.scope)
          // In safari, we need to wake up the SW to check for updates:
          setTimeout(async () => {
            const cachedManifest = await offlineDB.manifest.get('manifest');
            if (!cachedManifest || new Date(cachedManifest?.generatedAt).getTime() || 0 < Date.now() - 5 * 60 * 1000) {
              console.log('Manifest is old or missing, resuming caching...');
              registration.active?.postMessage({ type: "RESUME_CACHING" });
            }
          }, 10_000);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New version available - but we handle this automatically now
                    console.log('New service worker version available')
                  } else {
                    // First installation
                    console.log('Service worker installed for the first time')
                  }
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    } else {
      console.log('NOT using Service Worker. (DEVELOPMENT MODE or unsupported browser)');
      console.log('Need to download some heavy fulltext data for offline search...');
      // Make sure to index fulltext using the fulltext API route in this case
      fetch('/api/fulltext').then(async (response) => {
        if (response.ok) {
          const {docRoutes}: { docRoutes: MDFullTextMeta[] } = await response.json()
          console.log('Fulltext data fetched for indexing:', docRoutes.length, 'documents');

          //await offlineDB.transaction('rw', offlineDB.fullTextContent, offlineDB.fullTextIndex, async () => {
            for (const ftMeta of docRoutes) {
              // Store in IndexedDB via Dexie
              for (const section of ftMeta.sections) {
                const url = section.slug
                  ? `${ftMeta.route}#${section.slug}`
                  : ftMeta.route;
                const title = section.slug ? section.title : ftMeta.title || ftMeta.route;
                const parentTitle = section.slug ? ftMeta.title : undefined;
                await offlineDB.putFullTextDoc(url, title, section.content, parentTitle);
              }
            }
          //});

          console.log("Done indexintg fulltext data for offline search.");
        } else {
          console.error('Failed to fetch fulltext data:', response.statusText)
        }
      }).catch((error) => {
        console.error('Error fetching fulltext data:', error)
      })
      
    }
  }, [])

  // No UI - automatic background updates
  return null
}