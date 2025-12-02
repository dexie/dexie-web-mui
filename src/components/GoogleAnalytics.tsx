'use client'

import { useEffect } from 'react'
import { isAnalyticsAllowed } from '../utils/cookieUtils'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

interface GoogleAnalyticsProps {
  measurementId: string
}

const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    // Disable in development mode
    if (process.env.NODE_ENV === 'development') {
      return
    }
    
    // Check if analytics is allowed
    if (!isAnalyticsAllowed()) {
      return
    }

    // Load Google Analytics only if consent exists
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure',
        page_title: document.title,
        page_location: window.location.href
      });
    `
    document.head.appendChild(script2)

    return () => {
      // Cleanup when component unmounts
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [measurementId])

  return null
}

export default GoogleAnalytics

// Helper functions for sending events to GA
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag && isAnalyticsAllowed()) {
    window.gtag('event', eventName, parameters)
  }
}

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag && isAnalyticsAllowed()) {
    window.gtag('config', 'G-7W0YET4Q10', {
      page_path: path,
    })
  }
}