"use client"

import { useState } from "react"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

interface CopyButtonProps {
  code: string
}

export default function CopyButton({ code }: CopyButtonProps) {
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

  return (
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
  )
}
