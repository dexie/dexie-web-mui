'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    console.log('ServiceWorker check:', {
      hasNavigator: 'serviceWorker' in navigator,
      nodeEnv: process.env.NODE_ENV,
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'undefined'
    })
    
    // Listen for service worker messages (including CONTENT_UPDATED)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log("Content Message received:", event);
        if (event.data.type === 'CONTENT_UPDATED') {
          // Service worker only sends this for navigation requests (documents)
          // so we can safely reload the page
          console.log('Document content updated, reloading...', event.data.url)
          window.location.reload()
        }
      })
    }
    
    // Only register service worker in production
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      console.log('Attempting to register service worker...')
      // Register service worker as ES module
      navigator.serviceWorker
        .register('/sw.js', { type: 'module' })
        .then((registration) => {
          console.log('Service Worker (ESM) registered:', registration.scope)
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // New version available
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
    }
  }, [])

  return null // This component renders nothing
}