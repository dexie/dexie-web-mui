'use client'

import { useState, useEffect, ReactNode } from 'react'
import CookieBanner from './CookieBanner'
import GoogleAnalytics from './GoogleAnalytics'
import { 
  isEUUser, 
  getCookiePreferences, 
  setCookiePreferences, 
  clearAnalyticsCookies,
  CookiePreferences 
} from '../utils/cookieUtils'

interface CookieConsentManagerProps {
  children: ReactNode
  gaId: string
}

const CookieConsentManager = ({ children, gaId }: CookieConsentManagerProps) => {
  const [showBanner, setShowBanner] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Check if user is from EU
    const userIsFromEU = isEUUser()
    
    if (!userIsFromEU) {
      // Non-EU user - enable analytics directly
      setAnalyticsEnabled(true)
      return
    }

    // EU user - check existing consent
    const existingPreferences = getCookiePreferences()
    
    if (existingPreferences) {
      // User has already made a choice
      setAnalyticsEnabled(existingPreferences.analytics)
      if (!existingPreferences.analytics) {
        clearAnalyticsCookies()
      }
    } else {
      // Show cookie banner for EU users without previous choice
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setCookiePreferences(preferences)
    setAnalyticsEnabled(true)
    setShowBanner(false)
  }

  const handleAcceptSelected = (preferences: Omit<CookiePreferences, 'timestamp'>) => {
    setCookiePreferences(preferences)
    setAnalyticsEnabled(preferences.analytics)
    
    if (!preferences.analytics) {
      clearAnalyticsCookies()
    }
    
    setShowBanner(false)
  }

  const handleReject = () => {
    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    setCookiePreferences(preferences)
    setAnalyticsEnabled(false)
    clearAnalyticsCookies()
    setShowBanner(false)
  }

  if (!isClient) {
    // Prevent hydration mismatch
    return <>{children}</>
  }

  return (
    <>
      {children}
      
      {/* Load Google Analytics only if allowed */}
      {analyticsEnabled && <GoogleAnalytics measurementId={gaId} />}
      
      {/* Show cookie banner for EU users */}
      {showBanner && (
        <CookieBanner
          onAcceptAll={handleAcceptAll}
          onAcceptSelected={handleAcceptSelected}
          onReject={handleReject}
        />
      )}
    </>
  )
}

export default CookieConsentManager