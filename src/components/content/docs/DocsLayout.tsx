import React from "react"
import Link from "next/link"
import Sidebar from "./Sidebar"
import { generateNavigation } from "@/utils/mdx"
import {
  Box,
  Container,
  Breadcrumbs,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material"

interface DocsLayoutProps {
  children: React.ReactNode
  currentSlug?: string
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children, currentSlug }) => {
  const navigation = generateNavigation()

  return (
    <Container maxWidth={false} sx={{ padding: 0, pt: "100px" }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar navigation={navigation} currentSlug={currentSlug} />

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
              <MuiLink component={Link} href="/docs" color="inherit">
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
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default DocsLayout
