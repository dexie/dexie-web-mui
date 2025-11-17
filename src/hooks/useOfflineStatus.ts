'use client'

import { useLiveQuery } from 'dexie-react-hooks'
import { offlineDB, type OfflineStatus } from '@/db/offlineDB'

export type { OfflineStatus } from '@/db/offlineDB'

export function useOfflineStatus(): OfflineStatus | undefined {
  return useLiveQuery(() => offlineDB.status.get('cache'));
}

// Helper to manually trigger cache warming
export function triggerCacheWarming() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'PREFETCH_ALL' })
  }
}

// Helper to clear cache
export function clearOfflineCache() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    // Simply send clear message - SW will handle Dexie status reset
    navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' })
  }
}