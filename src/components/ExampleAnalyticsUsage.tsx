// Example of how to use analytics in components

'use client'

import { useEffect } from 'react'
import { Button, Box, Typography } from '@mui/material'
import { useAnalytics, usePageTracking } from '../hooks/useAnalytics'

const ExampleAnalyticsUsage = () => {
  const { trackEvent } = useAnalytics()
  
  // Automatic page tracking
  usePageTracking()

  // Track when component loads
  useEffect(() => {
    trackEvent('page_view', {
      page_title: 'Example Analytics Usage',
      page_location: window.location.href
    })
  }, [trackEvent])

  // Track button clicks
  const handleButtonClick = () => {
    trackEvent('button_click', {
      button_name: 'example_button',
      section: 'analytics_demo'
    })
    
    // Your regular logic here...
    console.log('Button clicked!')
  }

  // Track downloads
  const handleDownload = () => {
    trackEvent('file_download', {
      file_name: 'example-file.pdf',
      file_type: 'pdf'
    })
  }

  // Track external links
  const handleExternalLink = () => {
    trackEvent('click', {
      link_url: 'https://external-site.com',
      link_text: 'External Link'
    })
  }

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Analytics Demo
      </Typography>
      
      <Box display="flex" gap={2} flexWrap="wrap">
        <Button 
          variant="contained" 
          onClick={handleButtonClick}
        >
          Track Button Click
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={handleDownload}
        >
          Track Download
        </Button>
        
        <Button 
          variant="text" 
          onClick={handleExternalLink}
        >
          Track External Link
        </Button>
      </Box>
      
      <Typography variant="body2" color="text.secondary" mt={2}>
        These buttons send events to Google Analytics (if the user has accepted analytics cookies).
      </Typography>
    </Box>
  )
}

export default ExampleAnalyticsUsage