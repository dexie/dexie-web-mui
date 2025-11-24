"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

interface ClientSearchHighlighterProps {
  containerId: string
}

export default function ClientSearchHighlighter({ containerId }: ClientSearchHighlighterProps) {
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const currentSearchText = searchParams.get("search") || ""
    setSearchText(currentSearchText)
    
    if (currentSearchText) {
      // Apply highlighting after component mounts
      const container = document.getElementById(containerId)
      if (container) {
        highlightSearchText(container, currentSearchText)
      }
    }
  }, [searchParams, containerId])

  const highlightSearchText = (container: HTMLElement, searchText: string) => {
    if (!searchText.trim()) return

    // Remove existing highlights
    const existingHighlights = container.querySelectorAll('mark[data-search-highlight]')
    existingHighlights.forEach(mark => {
      const parent = mark.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ''), mark)
        parent.normalize()
      }
    })

    // Apply new highlights
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip text nodes inside script, style, or existing mark tags
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          const tagName = parent.tagName.toLowerCase()
          if (['script', 'style', 'mark'].includes(tagName)) {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        }
      }
    )

    const textNodes: Text[] = []
    let node
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }

    const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    
    textNodes.forEach(textNode => {
      const text = textNode.textContent || ''
      if (regex.test(text)) {
        const parent = textNode.parentNode as HTMLElement
        if (parent) {
          // Determine if we're inside a code block
          const isInCodeBlock = parent.closest('pre, code, .hljs') !== null
          const backgroundColor = isInCodeBlock 
            ? 'rgba(255, 140, 0, 0.6)' // Orange for code
            : 'rgba(255, 215, 0, 0.4)' // Yellow for text
          
          const highlightedHTML = text.replace(regex, `<mark data-search-highlight style="background-color: ${backgroundColor}; color: white; font-weight: bold; padding: 1px 2px; border-radius: 2px;">$1</mark>`)
          const wrapper = document.createElement('span')
          wrapper.innerHTML = highlightedHTML
          
          // Replace the text node with highlighted content
          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, textNode)
          }
          parent.removeChild(textNode)
        }
      }
    })
  }

  return null // This component doesn't render anything visible
}