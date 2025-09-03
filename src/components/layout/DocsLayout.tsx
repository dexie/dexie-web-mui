import React from "react"
import { Box, Container, Typography } from "@mui/material"
import { Sidebar } from "../navigation/Sidebar"
import { BreadcrumbNavigation } from "../navigation/BreadcrumbNavigation"
import { DocCategory, BreadcrumbItem } from "../../utils/mdx"

interface DocsLayoutProps {
  children: React.ReactNode
  navigation: DocCategory[]
  basePath: string
  title: string
  breadcrumbs?: BreadcrumbItem[]
  pageTitle?: string
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  children,
  navigation,
  basePath,
  title,
  breadcrumbs = [],
  pageTitle,
}) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar navigation={navigation} basePath={basePath} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - 280px)` },
          ml: { md: 0 },
          mt: { xs: 8, md: 0 }, // Margin for mobile menu button
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {breadcrumbs.length > 0 && (
            <BreadcrumbNavigation breadcrumbs={breadcrumbs} />
          )}

          {pageTitle && (
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 600,
                mb: 4,
              }}
            >
              {pageTitle}
            </Typography>
          )}

          <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>{children}</Box>
        </Container>
      </Box>
    </Box>
  )
}
