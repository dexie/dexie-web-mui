"use client"

import { useEffect, useState } from "react"
import { extractFullTextTokens } from '../../../db/extractFullTextTokens'
import { useSessionStorage } from "@/utils/useSessionStorage"

interface ClientSearchHighlighterProps {
  containerId: string
}

export default function ClientSearchHighlighter({ containerId }: ClientSearchHighlighterProps) {
  const [sessionStorageSearch] = useSessionStorage("search", "___initial_value___");
  const [, setSearchText] = useState("")

  useEffect(() => {
    const currentSearchText = sessionStorageSearch || ""
    if (currentSearchText === "___initial_value___") {return;} // Ignore initial placeholder value
    setSearchText(currentSearchText)    
    // Apply highlighting after component mounts
    const container = document.getElementById(containerId)
    if (container) {
      highlightSearchText(container, currentSearchText)
    }
  }, [sessionStorageSearch, containerId])

  const highlightSearchText = (container: HTMLElement, searchText: string) => {
    if (!searchText.trim()) {
      // Remove existing highlights when no search text
      const existingHighlights = container.querySelectorAll('mark[data-search-highlight]')
      existingHighlights.forEach(mark => {
        const parent = mark.parentNode
        if (parent) {
          parent.replaceChild(document.createTextNode(mark.textContent || ''), mark)
          parent.normalize()
        }
      })
      return
    }
    const tokens = extractFullTextTokens(searchText);

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

    // Create regex patterns for each token to match whole words containing the token
    const tokenArray = Array.from(tokens.keys()) // Convert Map keys to array
    const tokenRegexes = tokenArray.map((token: string) => {
      const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      // Match whole words that contain the token (case insensitive)
      return new RegExp(`\\b\\w*${escapedToken}\\w*\\b`, 'gi')
    })
    
    textNodes.forEach(textNode => {
      const text = textNode.textContent || ''
      let hasMatches = false
      
      // Check if any token matches and collect all matching words
      const wordsToHighlight = new Set<string>()
      
      tokenRegexes.forEach((regex: RegExp) => {
        const matches = text.match(regex)
        if (matches) {
          hasMatches = true
          matches.forEach(match => wordsToHighlight.add(match))
        }
      })
      
      if (hasMatches) {
        const parent = textNode.parentNode as HTMLElement
        if (parent) {
          // Determine if we're inside a code block
          const isInCodeBlock = parent.closest('pre, code, .hljs') !== null
          const backgroundColor = isInCodeBlock 
            ? 'rgba(255, 140, 0, 0.6)' // Orange for code
            : 'rgba(255, 215, 0, 0.4)' // Yellow for text
          
          // Create regex to match any of the words to highlight
          const wordsArray = Array.from(wordsToHighlight)
          const wordRegex = new RegExp(`\\b(${wordsArray.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi')
          
          const highlightedHTML = text.replace(wordRegex, `<mark data-search-highlight style="background-color: ${backgroundColor}; color: white; font-weight: bold; padding: 1px 2px; border-radius: 2px;">$1</mark>`)
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