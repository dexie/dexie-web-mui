'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, trackEvent } from '../components/GoogleAnalytics'

/**
 * Hook for automatically tracking page views
 */
export const usePageTracking = () => {
  const pathname = usePathname()

  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])
}

/**
 * Hook for easily tracking events
 */
export const useAnalytics = () => {
  return {
    trackEvent,
    trackPageView,
  }
}