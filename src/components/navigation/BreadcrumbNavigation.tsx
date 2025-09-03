"use client"

import React from "react"
import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material"
import { Home, NavigateNext } from "@mui/icons-material"
import Link from "next/link"
import { BreadcrumbItem } from "../../utils/mdx"

interface BreadcrumbNavigationProps {
  breadcrumbs: BreadcrumbItem[]
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  breadcrumbs,
}) => {
  return (
    <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        const isHome = breadcrumb.label === "Home"

        if (isLast) {
          return (
            <Typography
              key={breadcrumb.href}
              color="text.primary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {isHome && <Home sx={{ mr: 0.5, fontSize: 16 }} />}
              {breadcrumb.label}
            </Typography>
          )
        }

        return (
          <MuiLink
            key={breadcrumb.href}
            component={Link}
            href={breadcrumb.href}
            underline="hover"
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": { color: "primary.main" },
            }}
          >
            {isHome && <Home sx={{ mr: 0.5, fontSize: 16 }} />}
            {breadcrumb.label}
          </MuiLink>
        )
      })}
    </Breadcrumbs>
  )
}
