'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useOfflineStatus, triggerCacheWarming, clearOfflineCache } from '@/hooks/useOfflineStatus'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import { CloudOff, CloudDone, Clear, Refresh } from '@mui/icons-material'

function OfflineStatusContent() {
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const status = useOfflineStatus()

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  // Only show if 'indicator' is in the query parameters
  if (!searchParams.has('indicator')) {
    return null
  }

  // Determine status - if no status exists, we're online-only
  const isWarming = status?.isWarming || false
  const isReady = status?.isReady || false
  const cached = status?.cached || 0
  const total = status?.total || 0
  const progress = status?.progress || 0
  const isOnlineOnly = !status

  return (
    <Box sx={{ 
      position: 'fixed',
      bottom: 16,
      right: 16,
      bgcolor: 'rgba(255, 255, 255, 0.95)',
      border: 1,
      borderColor: 'grey.300',
      borderRadius: 2,
      p: 2,
      minWidth: 200,
      boxShadow: 2,
      zIndex: 1000
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        {isWarming ? (
          <CloudOff color="action" />
        ) : isReady ? (
          <CloudDone color="success" />
        ) : (
          <CloudOff color="disabled" />
        )}
        
        <Typography variant="body2" fontWeight="medium">
          Offline Status
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Refresh offline cache">
          <IconButton size="small" onClick={triggerCacheWarming} disabled={isWarming}>
            <Refresh fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Clear offline cache">
          <IconButton size="small" onClick={clearOfflineCache} disabled={isWarming}>
            <Clear fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {isWarming && (
        <Box sx={{ mb: 1 }}>
          <Box 
            sx={{ 
              width: '100%', 
              height: 4, 
              bgcolor: 'grey.200', 
              borderRadius: 2, 
              mb: 1 
            }}
          >
            <Box 
              sx={{ 
                width: `${progress}%`, 
                height: '100%', 
                bgcolor: 'primary.main', 
                borderRadius: 2,
                transition: 'width 0.3s ease'
              }} 
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {cached} of {total} resources cached ({progress}%)
          </Typography>
        </Box>
      )}

      {isReady && (
        <Typography variant="caption" color="success.main">
          ✅ {total} resources available offline
        </Typography>
      )}

      {isOnlineOnly && (
        <Typography variant="caption" color="warning.main">
          🌐 Online only - Click refresh to enable offline access
        </Typography>
      )}

      {!isWarming && !isReady && !isOnlineOnly && (
        <Typography variant="caption" color="text.secondary">
          📱 Click refresh to cache for offline use
        </Typography>
      )}
    </Box>
  )
}

export default function OfflineStatusIndicator() {
  return (
    <Suspense fallback={null}>
      <OfflineStatusContent />
    </Suspense>
  )
}