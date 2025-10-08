"use client"

import React, { useMemo, useState, useEffect } from "react"
import {
  Typography,
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material"
import dynamic from "next/dynamic"
import parse, { domToReact, Element, DOMNode } from "html-react-parser"

const CodeBlock = dynamic(() => import("../shared/CodeBlock"), { ssr: false })

interface MDXContentProps {
  source: string
}

// Convert HTML attributes to MUI props
function convertProps(props: Record<string, any>) {
  const { style, className, class: classAttr, ...rest } = props
  const converted: Record<string, any> = { ...rest }

  // Handle both className and class attributes (class gets converted to className)
  const finalClassName = className || classAttr
  if (finalClassName) {
    converted.className = finalClassName
  }

  if (style) {
    converted.sx = parseStyleString(style)
  }

  return converted
}

// Parse inline style string to MUI sx object
function parseStyleString(
  styleString: string | undefined
): Record<string, string> {
  if (!styleString) return {}

  const styles: Record<string, string> = {}
  const declarations = styleString.split(";").filter((s) => s.trim())

  declarations.forEach((declaration) => {
    const [property, value] = declaration.split(":").map((s) => s.trim())
    if (property && value) {
      // Convert CSS property names to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      )
      styles[camelProperty] = value
    }
  })

  return styles
}

// Custom HTML parser that converts HTML to MUI components
function parseHTMLToComponents(html: string): React.ReactNode {
  let keyCounter = 0
  const getKey = () => `mdx-${++keyCounter}`

  const options = {
    replace: (domNode: Element | { type: string; data: string }) => {
      if (domNode instanceof Element) {
        const { name, attribs, children } = domNode

        switch (name) {
          case "h1":
            return (
              <Typography
                key={getKey()}
                variant="h1"
                component="h1"
                gutterBottom
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </Typography>
            )
          case "h2":
            return (
              <Typography
                key={getKey()}
                variant="h2"
                component="h2"
                gutterBottom
                sx={{ mt: 4 }}
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </Typography>
            )
          case "h3":
            return (
              <Typography
                key={getKey()}
                variant="h3"
                component="h3"
                gutterBottom
                sx={{ mt: 3 }}
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </Typography>
            )
          case "h4":
            return (
              <Typography
                key={getKey()}
                variant="h4"
                component="h4"
                gutterBottom
                sx={{ mt: 3 }}
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </Typography>
            )
          case "p":
            return (
              <Typography
                key={getKey()}
                variant="body1"
                component="div"
                paragraph
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </Typography>
            )
          case "a":
            const href = attribs?.href
            const isExternal =
              href &&
              (href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("//") ||
                (!href.startsWith("/") &&
                  !href.startsWith("#") &&
                  !href.startsWith("?")))

            const linkProps = isExternal
              ? {
                  target: "_blank",
                  rel: "noopener noreferrer",
                  ...convertProps(attribs || {}),
                }
              : convertProps(attribs || {})

            return (
              <Link
                key={getKey()}
                href={href}
                color="primary"
                sx={{ fontWeight: 600 }}
                underline="hover"
                {...linkProps}
              >
                {domToReact(children as DOMNode[], options)}
              </Link>
            )
          case "ul":
            return (
              <List
                key={getKey()}
                sx={{
                  mb: 3,
                  listStyleType: "disc",
                  pl: 2,
                  "& .MuiListItem-root": {
                    display: "list-item",
                    pl: 0,
                  },
                }}
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </List>
            )
          case "ol":
            return (
              <List
                key={getKey()}
                component="ol"
                sx={{
                  mb: 3,
                  pl: 2,
                  listStyleType: "decimal",
                  "& .MuiListItem-root": {
                    display: "list-item",
                    pl: 0,
                  },
                }}
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </List>
            )
          case "li":
            return (
              <ListItem
                key={getKey()}
                sx={{
                  py: 0.25,
                  display: "list-item",
                  pl: 0,
                }}
                {...convertProps(attribs || {})}
              >
                <ListItemText
                  primary={
                    <Typography component="span" variant="body1">
                      {domToReact(children as DOMNode[], options)}
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              </ListItem>
            )
          case "pre":
            // For code blocks, let the code component handle it
            return <>{domToReact(children as DOMNode[], options)}</>
          case "code":
            const className = attribs?.class
            // Check if this is inside a pre element
            const isInPre =
              domNode.parent && (domNode.parent as Element).name === "pre"

            if (isInPre) {
              // This is a code block from markdown (```language)
              const match = /language-(\w+)/.exec(className || "")
              const language = match ? match[1] : "javascript"
              const codeString =
                domToReact(children as DOMNode[], options)?.toString() || ""

              return (
                <Box
                  key={getKey()}
                  sx={{
                    mb: 3,
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    pr: 2,
                    mt: 2,
                  }}
                >
                  <CodeBlock
                    language={language}
                    code={codeString}
                    showLineNumbers={true}
                  />
                </Box>
              )
            } else {
              // Inline code
              return (
                <Box
                  key={getKey()}
                  component="code"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                  {...convertProps(attribs || {})}
                >
                  {domToReact(children as DOMNode[], options)}
                </Box>
              )
            }
          case "blockquote":
            return (
              <Paper
                key={getKey()}
                component="blockquote"
                elevation={0}
                sx={{
                  borderLeft: 4,
                  borderColor: "primary.main",
                  pl: 3,
                  mb: 3,
                  py: 1,
                  backgroundColor: "grey.50",
                  color: "text.secondary",
                }}
                {...convertProps(attribs || {})}
              >
                <Typography component="div">
                  {domToReact(children as DOMNode[], options)}
                </Typography>
              </Paper>
            )
          case "table":
            return (
              <div
                style={{
                  marginBottom: "24px",
                  width: "fit-content",
                  maxWidth: "100%",
                  overflow: "auto",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "4px",
                }}
                {...convertProps(attribs || {})}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  {domToReact(children as DOMNode[], options)}
                </table>
              </div>
            )
          case "thead":
            return (
              <thead {...convertProps(attribs || {})}>
                {domToReact(children as DOMNode[], options)}
              </thead>
            )
          case "tbody":
            return (
              <tbody {...convertProps(attribs || {})}>
                {domToReact(children as DOMNode[], options)}
              </tbody>
            )
          case "tr":
            return (
              <tr
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.12)" }}
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </tr>
            )
          case "th":
            return (
              <th
                style={{
                  padding: "16px",
                  textAlign: "left",
                  fontWeight: "bold",
                  borderBottom: "2px solid rgba(255, 255, 255, 0.12)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
                {...convertProps(attribs || {})}
              >
                <Typography variant="subtitle2" component="span">
                  {domToReact(children as DOMNode[], options)}
                </Typography>
              </th>
            )
          case "td":
            return (
              <td
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                }}
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </td>
            )
          case "img":
            return (
              <Box
                key={getKey()}
                component="img"
                src={attribs?.src}
                alt={attribs?.alt || ""}
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 1,
                  mb: 3,
                }}
                {...convertProps(attribs || {})}
              />
            )
          case "div":
            return (
              <Box
                key={getKey()}
                component="div"
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </Box>
            )
          case "span":
            return (
              <Box
                key={getKey()}
                component="span"
                {...convertProps(attribs || {})}
              >
                {domToReact(children as DOMNode[], options)}
              </Box>
            )
          case "hr":
            return (
              <Divider
                key={getKey()}
                sx={{ my: 3 }}
                {...convertProps(attribs || {})}
              />
            )
          case "br":
            return <br key={getKey()} {...convertProps(attribs || {})} />
          default:
            // Check if it's a void element that should not have children
            const voidElements = [
              "area",
              "base",
              "col",
              "embed",
              "input",
              "link",
              "meta",
              "param",
              "source",
              "track",
              "wbr",
            ]

            if (voidElements.includes(name)) {
              return React.createElement(name, {
                key: getKey(),
                ...convertProps(attribs || {}),
              })
            }

            return React.createElement(
              name,
              {
                key: getKey(),
                ...convertProps(attribs || {}),
              },
              domToReact(children as DOMNode[], options)
            )
        }
      }
    },
  }

  return parse(html, options)
}

export default function MDXContent({ source }: MDXContentProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const content = useMemo(() => {
    if (!isClient) return null
    return parseHTMLToComponents(source)
  }, [source, isClient])

  if (!isClient) {
    return <Box className="mdx-content" sx={{ maxWidth: "none" }} />
  }

  return (
    <Box className="mdx-content" sx={{ maxWidth: "none" }}>
      {content}
    </Box>
  )
}
