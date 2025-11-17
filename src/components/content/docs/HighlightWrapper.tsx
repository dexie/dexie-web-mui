"use client"

import React, { useEffect, useRef, useCallback } from 'react'
import { Box } from '@mui/material'

interface HighlightWrapperProps {
  children: React.ReactNode
  searchText: string
}

const HighlightWrapper: React.FC<HighlightWrapperProps> = ({ children, searchText }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Function to remove existing highlights
  const removeHighlights = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const existingHighlights = container.querySelectorAll('[data-highlight]')
    existingHighlights.forEach(highlight => {
      const parent = highlight.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight)
        parent.normalize() // Merge adjacent text nodes
      }
    })
  }, [])

  // Function to perform the actual highlighting
  const performHighlighting = useCallback((searchTerm: string) => {
    const container = containerRef.current
    if (!container || !searchTerm.trim()) {
      removeHighlights()
      return
    }

    // First remove existing highlights
    removeHighlights()

    // Function to highlight text in a text node
    const highlightTextInNode = (node: Text) => {
      const text = node.textContent || ''
      
      if (!searchTerm || !text.toLowerCase().includes(searchTerm.toLowerCase())) {
        return
      }

      const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      const parts = text.split(regex)
      
      if (parts.length <= 1) return

      const fragment = document.createDocumentFragment()
      
      parts.forEach((part) => {
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
          const highlight = document.createElement('mark')
          highlight.setAttribute('data-highlight', 'true')
          
          // Check if we're in a code block for different styling
          const isInCode = node.parentElement?.closest('code, pre')
          
          if (isInCode) {
            // Special styling for code blocks
            highlight.style.backgroundColor = 'rgba(255, 140, 0, 0.6)' // Orange for code
            highlight.style.color = '#fff'
            highlight.style.padding = '1px 3px'
            highlight.style.borderRadius = '3px'
            highlight.style.fontWeight = 'bold'
            highlight.style.border = '1px solid rgba(255, 140, 0, 0.8)'
          } else {
            // Regular styling for normal text
            highlight.style.backgroundColor = 'rgba(255, 215, 0, 0.4)' // Yellow for text
            highlight.style.color = 'inherit'
            highlight.style.padding = '0 2px'
            highlight.style.borderRadius = '2px'
            highlight.style.fontWeight = 'bold'
          }
          
          highlight.textContent = part
          fragment.appendChild(highlight)
        } else if (part) {
          fragment.appendChild(document.createTextNode(part))
        }
      })

      node.parentNode?.replaceChild(fragment, node)
    }

    // Walk through all text nodes and highlight matches
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip only input elements, but allow code blocks
          const parent = node.parentElement
          if (parent && (
            parent.tagName === 'INPUT' ||
            parent.tagName === 'TEXTAREA' ||
            parent.closest('input, textarea')
          )) {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        }
      }
    )

    const textNodes: Text[] = []
    let node: Node | null
    
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }

    // Highlight in reverse order to avoid issues with DOM changes
    textNodes.reverse().forEach(highlightTextInNode)
  }, [removeHighlights])

  // Debounced effect for highlighting
  useEffect(() => {
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // If search text is empty, remove highlights immediately
    if (!searchText.trim()) {
      removeHighlights()
      return
    }

    // Set up debounced highlighting
    debounceTimeoutRef.current = setTimeout(() => {
      performHighlighting(searchText.trim())
    }, 500) // 500ms debounce

    // Cleanup function
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [searchText, performHighlighting, removeHighlights])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Box ref={containerRef}>
      {children}
    </Box>
  )
}

export default HighlightWrapper