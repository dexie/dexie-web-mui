"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-bash"
import "prismjs/plugins/command-line/prism-command-line"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  strikethroughLines?: number[]
  commandLine?: boolean
  commandUser?: string
  commandHost?: string
  commandPrompt?: string
  commandOutput?: string | number[]
}

export default function CodeBlock({
  code,
  language = "javascript",
  className = "",
  showLineNumbers = false,
  highlightLines = [],
  strikethroughLines = [],
  commandLine = false,
  commandUser = "",
  commandHost = "",
  commandPrompt = "$",
  commandOutput = "",
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const formatCodeWithLineNumbers = useCallback(
    (highlightedCode: string) => {
      const lines = highlightedCode.split("\n")
      // Ta bort sista tomma raden om den finns
      if (lines[lines.length - 1] === "") {
        lines.pop()
      }
      return lines
        .map((line, index) => {
          const lineNumber = index + 1
          const isHighlighted = highlightLines.includes(lineNumber)
          const isStrikethrough = strikethroughLines.includes(lineNumber)

          let processedLine = line

          // Om det är en strikethrough-linje, wrap bara texten (inte mellanslag) i ett span
          if (isStrikethrough) {
            const leadingWhitespace = line.match(/^\s*/)?.[0] || ""
            const trailingWhitespace = line.match(/\s*$/)?.[0] || ""
            const textContent = line.slice(
              leadingWhitespace.length,
              line.length - trailingWhitespace.length
            )

            if (textContent.length > 0) {
              processedLine =
                leadingWhitespace +
                `<span class="strikethrough-content">${textContent}</span>` +
                trailingWhitespace
            }
          }

          const lineClasses = [
            "code-line",
            showLineNumbers ? "line-number" : "",
            isHighlighted ? "highlight-line" : "",
            isStrikethrough ? "strikethrough-line" : "",
          ]
            .filter(Boolean)
            .join(" ")

          return `<span class="${lineClasses}" line="${lineNumber}">${processedLine}\n</span>`
        })
        .join("")
    },
    [showLineNumbers, highlightLines, strikethroughLines]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && codeRef.current) {
      // Sätt innehållet och highlighta med Prism
      codeRef.current.textContent = code
      Prism.highlightElement(codeRef.current)

      // Handle command line user and host attributes
      if (commandLine && commandUser && commandHost) {
        const promptSpans = codeRef.current.parentElement?.querySelectorAll(
          ".command-line-prompt > span"
        )
        promptSpans?.forEach((span) => {
          span.setAttribute("data-user", commandUser)
          span.setAttribute("data-host", commandHost)
        })
      } // Lägg till line wrapping om det behövs
      if (
        showLineNumbers ||
        highlightLines.length > 0 ||
        strikethroughLines.length > 0
      ) {
        const highlightedContent = codeRef.current.innerHTML
        const formattedContent = formatCodeWithLineNumbers(highlightedContent)
        codeRef.current.innerHTML = formattedContent
      }
    }
  }, [
    mounted,
    code,
    language,
    showLineNumbers,
    highlightLines,
    strikethroughLines,
    formatCodeWithLineNumbers,
    commandLine,
    commandUser,
    commandHost,
  ])

  if (!mounted) {
    // Return unstyled code block during SSR
    return (
      <pre className={className}>
        <code>{code}</code>
      </pre>
    )
  }

  const codeClasses = [`language-${language}`, "code-highlight"].join(" ")

  // Build command line data attributes
  const commandLineProps: Record<string, string> = {}

  if (commandLine) {
    if (commandUser) commandLineProps["data-user"] = commandUser
    if (commandHost) commandLineProps["data-host"] = commandHost
    if (commandPrompt) commandLineProps["data-prompt"] = commandPrompt
    if (commandOutput) {
      if (typeof commandOutput === "string") {
        commandLineProps["data-output"] = commandOutput
      } else if (Array.isArray(commandOutput)) {
        commandLineProps["data-output"] = commandOutput.join(",")
      }
    }
  }

  const preClasses = [
    `language-${language}`,
    className,
    commandLine ? "command-line" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Box className="codeblock-container" style={{ position: "relative" }}>
      <Button
        onClick={copyToClipboard}
        size="small"
        sx={{
          position: "absolute",
          top: "10px",
          right: "0px",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "4px",
          padding: "4px 10px !important",
          cursor: "pointer",
          color: "#fff",
          fontSize: "12px !important",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          zIndex: 10,
          transition: "all 0.2s ease",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: 0.5,
          zoom: 0.9,
          minWidth: "auto",
          textTransform: "none",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.2)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            transform: "translateY(-1px)",
            opacity: 1,
          },
          "&:active": {
            transform: "translateY(0)",
          },
        }}
        startIcon={<ContentCopyIcon sx={{ fontSize: "14px !important" }} />}
      >
        <>{copied ? "Copied!" : "Copy"}</>
      </Button>
      <pre className={preClasses} {...commandLineProps}>
        <code ref={codeRef} className={codeClasses}>
          {code}
        </code>
      </pre>
    </Box>
  )
}
