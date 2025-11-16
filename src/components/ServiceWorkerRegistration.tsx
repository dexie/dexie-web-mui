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
        if (event.data.type === 'CONTENT_UPDATED') {
          const updatedUrl = event.data.url
          const currentUrl = window.location.href
          
          // Remove hash from both URLs since service worker doesn't receive hash
          const normalizeUrl = (url: string) => {
            try {
              const urlObj = new URL(url)
              return `${urlObj.origin}${urlObj.pathname}`
            } catch {
              return url
            }
          }
          
          const normalizedUpdatedUrl = normalizeUrl(updatedUrl)
          const normalizedCurrentUrl = normalizeUrl(currentUrl)
          
          console.log('Content updated:', { updatedUrl: normalizedUpdatedUrl, currentUrl: normalizedCurrentUrl })
          
          // If the updated URL matches the current page, reload
          if (normalizedUpdatedUrl === normalizedCurrentUrl) {
            console.log('Current page content updated, reloading...')
            window.location.reload()
          }
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