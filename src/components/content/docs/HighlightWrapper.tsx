"use client"

import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

interface HighlightWrapperProps {
  children: React.ReactNode
  searchText: string
}

const HighlightWrapper: React.FC<HighlightWrapperProps> = ({ children, searchText }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !searchText.trim()) {
      return
    }

    // Remove existing highlights
    const existingHighlights = container.querySelectorAll('[data-highlight]')
    existingHighlights.forEach(highlight => {
      const parent = highlight.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight)
        parent.normalize() // Merge adjacent text nodes
      }
    })

    // Function to highlight text in a text node
    const highlightTextInNode = (node: Text) => {
      const text = node.textContent || ''
      const searchTerm = searchText.trim()
      
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
          highlight.style.backgroundColor = 'rgba(255, 215, 0, 0.4)'
          highlight.style.color = 'inherit'
          highlight.style.padding = '0 2px'
          highlight.style.borderRadius = '2px'
          highlight.style.fontWeight = 'bold'
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
          // Skip code blocks and input elements
          const parent = node.parentElement
          if (parent && (
            parent.tagName === 'CODE' ||
            parent.tagName === 'PRE' ||
            parent.tagName === 'INPUT' ||
            parent.tagName === 'TEXTAREA' ||
            parent.closest('code, pre, input, textarea')
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

  }, [searchText])

  // Remove highlights when component unmounts or searchText becomes empty
  useEffect(() => {
    const container = containerRef.current
    if (!searchText.trim() && container) {
      const existingHighlights = container.querySelectorAll('[data-highlight]')
      existingHighlights.forEach(highlight => {
        const parent = highlight.parentNode
        if (parent) {
          parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight)
          parent.normalize()
        }
      })
    }
  }, [searchText])

  return (
    <Box ref={containerRef}>
      {children}
    </Box>
  )
}

export default HighlightWrapper