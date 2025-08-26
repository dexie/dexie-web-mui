"use client"
import { Button, SxProps } from "@mui/material"
import Link from "next/link"
import { ReactNode } from "react"

export interface ButtonWidgetProps {
  text: string | ReactNode
  link: {
    url: string
    querystring: string
    title: string
    target: string
  }
  color:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "inherit"
  size: "small" | "medium" | "large"
  variant: "outlined" | "text" | "contained"
  icon?: ReactNode
  sx?: SxProps
}

export default function ButtonWidget({
  text,
  link: linkProps,
  color,
  size,
  variant,
  icon,
  sx,
}: ButtonWidgetProps) {
  return (
    <Link href={linkProps.url} target={linkProps.target}>
      <Button
        color={color}
        size={size}
        variant={variant}
        sx={sx}
        startIcon={icon}
      >
        {text}
      </Button>
    </Link>
  )
}
