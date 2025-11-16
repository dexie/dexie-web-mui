import React from "react"

/**
 * Generate an ID from heading text content
 * Converts text to lowercase and replaces non-alphanumeric characters with dashes
 * 
 * @param children - React children (text content of heading)
 * @returns Generated ID string
 * 
 * @example
 * generateHeadingId("Example: Integrate Custom Authentication") 
 * // returns "example-integrate-custom-authentication"
 */
export function generateHeadingId(children: React.ReactNode): string {
  // Extract text content from React children
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") {
      return node
    }
    if (typeof node === "number") {
      return String(node)
    }
    if (React.isValidElement(node)) {
      return extractText((node as React.ReactElement<any>).props.children)
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join("")
    }
    return ""
  }

  const text = extractText(children)
  
  // Convert to lowercase and replace non-alphanumeric characters with dashes
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
}

/**
 * Extract text content from DOM nodes (for HTML parser)
 * 
 * @param domNodes - Array of DOM nodes
 * @returns Extracted text content
 */
export function extractTextFromDOMNodes(domNodes: any[]): string {
  return domNodes
    .map((node) => {
      if (node.type === "text") {
        return node.data || ""
      }
      if (node.children && Array.isArray(node.children)) {
        return extractTextFromDOMNodes(node.children)
      }
      return ""
    })
    .join("")
}

/**
 * Generate heading ID from DOM nodes
 * 
 * @param domNodes - Array of DOM nodes from HTML parser
 * @returns Generated ID string
 */
export function generateHeadingIdFromDOM(domNodes: any[]): string {
  const text = extractTextFromDOMNodes(domNodes)
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
}