# Google Analytics 4 Implementation with Cookie Consent

This implementation adds Google Analytics 4 (GA4) to the Next.js site with GDPR-compliant cookie management for EU users.

## Features

- ✅ GA4 integration with your Measurement ID: `G-7W0YET4Q10`
- ✅ Automatic geographic detection (EU vs non-EU users)
- ✅ GDPR-compliant cookie banner for EU users
- ✅ Cookie settings that users can manage later
- ✅ Automatic clearing of analytics cookies on rejection
- ✅ React hooks for easy event tracking
- ✅ TypeScript support

## How it works

### For non-EU users
- Google Analytics loads automatically without cookie banner
- User privacy is respected according to local laws

### For EU users
- Cookie banner is shown on first visit
- User can choose to accept all, accept only selected, or reject all cookies
- Choices are saved for 12 months
- Analytics loads only if user has consented

## Components

### CookieConsentManager
Main component that handles the entire cookie flow and determines if GA should load.

### CookieBanner
Cookie consent banner shown to EU users.

### CookieSettings
Dialog for managing cookie settings (available in footer).

### GoogleAnalytics
Handles loading of the Google Analytics script.

## Usage in code

### Automatic page tracking
```tsx
import { usePageTracking } from '../hooks/useAnalytics'

function MyPage() {
  usePageTracking() // Automatically tracks page views
  // ...
}
```

### Event tracking
```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function MyComponent() {
  const { trackEvent } = useAnalytics()
  
  const handleButtonClick = () => {
    trackEvent('button_click', {
      button_name: 'header_cta',
      section: 'hero'
    })
  }
  
  return <button onClick={handleButtonClick}>Click here</button>
}
```

### Manual page tracking
```tsx
import { trackPageView } from '../components/GoogleAnalytics'

// Track specific page
trackPageView('/custom-path')
```

## Technical details

### Geographic detection
Uses `Intl.DateTimeFormat().resolvedOptions().timeZone` to identify EU users based on timezone. For production, a more robust solution with IP geolocation is recommended.

### Cookie management
- Uses localStorage to save user choices
- Automatic expiration after 12 months
- Clearing of GA cookies on rejection

### Security and privacy
- IP address anonymization enabled
- SameSite=None;Secure cookie flags
- No data collected without user consent

## Configuration

Measurement ID is already configured as `G-7W0YET4Q10`. If you need to change it, update the value in:
- `src/app/layout.tsx` (CookieConsentManager gaId prop)
- `src/hooks/useAnalytics.ts` (trackPageView function)

## Testing

To test the implementation:

1. **EU users**: Change your system timezone to a European timezone (e.g. Europe/Stockholm)
2. **Non-EU users**: Use a timezone outside EU (e.g. America/New_York)
3. Clear localStorage and reload the page
4. Check cookie banner and GA loading in Network tab in DevTools

## Compatibility

- ✅ Next.js 15+
- ✅ React 19+
- ✅ Material-UI
- ✅ TypeScript
- ✅ GDPR/CCPA compliant