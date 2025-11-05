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
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

export default function ButtonWidget({
  text,
  link: linkProps,
  color,
  size,
  variant,
  icon,
  sx,
  onClick,
}: ButtonWidgetProps) {
  return (
    <Link href={linkProps.url} target={linkProps.target} passHref>
      <Button
        color={color}
        size={size}
        variant={variant}
        sx={sx}
        startIcon={icon}
        onClick={onClick}
      >
        {text}
      </Button>
    </Link>
  )
}
