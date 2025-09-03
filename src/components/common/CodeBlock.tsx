"use client"

import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Box } from "@mui/material"

interface CodeBlockProps {
  language: string
  code: string
  showLineNumbers?: boolean
  className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language,
  code,
  showLineNumbers = true,
  className,
}) => {
  return (
    <Box className={className} sx={{ mb: 2 }}>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          borderRadius: "6px",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  )
}

export default CodeBlock
