'use client'

import { Button, Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CacheClearButton() {
  const [clearing, setClearing] = useState(false)
  const router = useRouter()

  const handleClearCache = async () => {
    setClearing(true)
    
    try {
      if (typeof window !== 'undefined' && 'clearCache' in window) {
        (window as Window & { clearCache: () => void }).clearCache()
      } else {
        // Fallback: clear cache directly
        if (typeof window !== 'undefined' && 'caches' in window) {
          const cacheNames = await caches.keys()
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          )
          console.log('Cache cleared via fallback method')
          // Reload page to get latest version
          router.refresh()
        }
      }
    } catch (error) {
      console.error('Could not clear cache:', error)
      setClearing(false)
    }
  }

  // Only show in development mode or if user explicitly wants to see it
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearCache}
        disabled={clearing}
        size="small"
      >
        {clearing ? 'Clearing...' : 'Clear Cache'}
      </Button>
      <Typography variant="caption" display="block" sx={{ mt: 1, maxWidth: 120 }}>
        Dev: Clear cache and reload
      </Typography>
    </Box>
  )
}