// Utility functions for cookie management and geographic detection

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

/**
 * Check if the user is from EU based on timezone
 * This is a simple heuristic - for production use, you should use a more robust solution
 */
export const isEUUser = (): boolean => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const euTimezones = [
    'Europe/Stockholm', 'Europe/London', 'Europe/Paris', 'Europe/Berlin',
    'Europe/Madrid', 'Europe/Rome', 'Europe/Amsterdam', 'Europe/Brussels',
    'Europe/Vienna', 'Europe/Copenhagen', 'Europe/Helsinki', 'Europe/Dublin',
    'Europe/Luxembourg', 'Europe/Prague', 'Europe/Warsaw', 'Europe/Budapest',
    'Europe/Bucharest', 'Europe/Sofia', 'Europe/Athens', 'Europe/Zagreb',
    'Europe/Ljubljana', 'Europe/Bratislava', 'Europe/Vilnius', 'Europe/Riga',
    'Europe/Tallinn', 'Europe/Malta', 'Europe/Nicosia'
  ]
  
  return euTimezones.includes(timezone)
}

/**
 * Get stored cookie preferences
 */
export const getCookiePreferences = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem('cookie-consent')
    if (!stored) return null
    
    const preferences = JSON.parse(stored)
    
    // Check if preferences are older than 12 months
    const twelveMonthsAgo = Date.now() - (12 * 30 * 24 * 60 * 60 * 1000)
    if (preferences.timestamp && preferences.timestamp < twelveMonthsAgo) {
      localStorage.removeItem('cookie-consent')
      return null
    }
    
    return preferences
  } catch {
    return null
  }
}

/**
 * Save cookie preferences
 */
export const setCookiePreferences = (preferences: Omit<CookiePreferences, 'timestamp'>) => {
  if (typeof window === 'undefined') return
  
  const preferencesWithTimestamp: CookiePreferences = {
    ...preferences,
    timestamp: Date.now()
  }
  
  localStorage.setItem('cookie-consent', JSON.stringify(preferencesWithTimestamp))
}

/**
 * Check if analytics cookies are allowed
 */
export const isAnalyticsAllowed = (): boolean => {
  const preferences = getCookiePreferences()
  if (!preferences) return false
  return preferences.analytics
}

/**
 * Clear all analytics cookies
 */
export const clearAnalyticsCookies = () => {
  if (typeof window === 'undefined') return
  
  // Clear Google Analytics cookies
  const gaCookies = document.cookie.split(';').filter(cookie => 
    cookie.trim().startsWith('_ga') || 
    cookie.trim().startsWith('_gid') ||
    cookie.trim().startsWith('_gat')
  )
  
  gaCookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim()
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`
  })
}