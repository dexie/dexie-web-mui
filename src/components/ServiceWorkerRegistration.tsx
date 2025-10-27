'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration.scope)
          
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

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_CLEARED') {
          console.log('Cache cleared by service worker')
        }
      })

      // Function to manually clear cache
      window.clearCache = () => {
        if (navigator.serviceWorker.controller) {
          const messageChannel = new MessageChannel()
          
          messageChannel.port1.onmessage = (event) => {
            if (event.data.success) {
              console.log('Cache manually cleared')
              // Reload page to get latest version
              window.location.reload()
            }
          }
          
          navigator.serviceWorker.controller.postMessage(
            { type: 'CLEAR_CACHE' },
            [messageChannel.port2]
          )
        }
      }
    }
  }, [])

  return null // This component renders nothing
}

// TypeScript declaration for window.clearCache
declare global {
  interface Window {
    clearCache: () => void
  }
}