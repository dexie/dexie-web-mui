# Service Worker for Cache Clearing

## Purpose

This service worker is specifically designed to clear old caches from the previous version of the Dexie.org site. The previous site had a service worker with a network-first strategy based on timeout, which could cause problems with mixed results when the new site (built in Next.js) is launched.

## Functionality

### Primary functions:
1. **Cache clearing on installation**: Clears all existing caches when the service worker is installed
2. **Cache clearing on activation**: Ensures old caches are cleared even during activation
3. **Network-first strategy**: All requests go directly to the network (no caching)
4. **Manual cache clearing**: Ability to clear cache via messages

### What the service worker does NOT do:
- Does not cache any content
- Provides no offline functionality (except basic error message)
- Does not implement any advanced strategies

## Files

### `/public/sw.js`
The actual service worker file that:
- Installs and activates automatically
- Clears all caches on installation and activation
- Handles fetch requests without caching
- Listens for messages for manual cache clearing

### `/src/components/ServiceWorkerRegistration.tsx`
React component that:
- Registers the service worker automatically when the app loads
- Listens for service worker updates
- Provides a global `window.clearCache()` function

### `/src/components/CacheClearButton.tsx`
Development helper that:
- Shows a button for manual cache clearing (development only)
- Uses either service worker or direct cache API for clearing

## Usage

The service worker registers automatically when the site loads. No additional actions are required.

### Manual cache clearing
In development you can use:
```javascript
window.clearCache()
```

Or by using the visible button in development mode.

## Deployment

When the site deploys, the service worker will:
1. Automatically install on users' devices
2. Clear all existing caches from the old site
3. Ensure users get the new site without conflicts

## Future Updates

If you later want to implement proper caching, you can:
1. Update `/public/sw.js` with a cache strategy
2. Change the `CACHE_NAME` constant to avoid conflicts
3. Implement selective cache clearing instead of total clearing

## Browser Compatibility

Service workers are supported in all modern browsers. For older browsers that don't support service workers, the site will work normally without cache functionality.