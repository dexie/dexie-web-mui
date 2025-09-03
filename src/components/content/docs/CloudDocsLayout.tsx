import React from "react"
import Link from "next/link"
import Sidebar from "./Sidebar"
import { generateCloudNavigation } from "@/utils/mdx"
import {
  Box,
  Container,
  Breadcrumbs,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material"

interface CloudDocsLayoutProps {
  children: React.ReactNode
  currentSlug?: string
}

const CloudDocsLayout: React.FC<CloudDocsLayoutProps> = ({
  children,
  currentSlug,
}) => {
  const navigation = generateCloudNavigation()

  // Remove docs/ prefix from currentSlug for navigation matching
  const navSlug = currentSlug?.startsWith("docs/")
    ? currentSlug.replace("docs/", "")
    : currentSlug

  return (
    <Container maxWidth={false} sx={{ padding: 0, pt: "100px" }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar
          navigation={navigation}
          currentSlug={navSlug}
          basePath="/cloud/docs"
        />

        <Box
          component="main"
          sx={{
            paddingTop: 3,
            paddingBottom: 2,
            marginBottom: 3,
            flex: 1,
            paddingLeft: { md: 4 },
            paddingRight: { md: 4 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <MuiLink component={Link} href="/" color="inherit">
                Home
              </MuiLink>
              <MuiLink component={Link} href="/cloud" color="inherit">
                Cloud
              </MuiLink>
              <MuiLink component={Link} href="/cloud/docs" color="inherit">
                Documentation
              </MuiLink>
              {currentSlug && (
                <Typography
                  color="text.primary"
                  aria-current="page"
                  sx={{
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {currentSlug.split("/").pop()}
                </Typography>
              )}
            </Breadcrumbs>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              "& a": {
                color: "#c77dff !important",
                textDecoration: "none",
                "&:hover": { color: "white !important" },
              },
              "& li:hover": {
                background: "transparent",
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default CloudDocsLayout
