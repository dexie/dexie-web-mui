"use client"

import React, { useState } from "react"
import Link from "next/link"
import Sidebar from "./Sidebar"
import EditOnGitHubButton from "./EditOnGitHubButton"
import MDXContent from "./MDXContent"
import {
  Box,
  Container,
  Breadcrumbs,
  Typography,
  Divider,
  Link as MuiLink,
  Drawer,
} from "@mui/material"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
interface NavItem {
  title: string
  slug: string
  layout?: string
}

interface NavStructure {
  [key: string]: NavItem | NavStructure
}

interface DocsLayoutProps {
  children: React.ReactNode
  currentSlug?: string
  pageTitle?: string
  navigation?: NavStructure
  mdxSource?: string // Add MDX source
}

const DocsLayout: React.FC<DocsLayoutProps> = ({
  children,
  currentSlug,
  pageTitle,
  navigation = {},
  mdxSource,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchText, setSearchText] = useState("")

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerWidth = 300

  return (
    <Container maxWidth={false} sx={{ padding: 0, pt: "100px" }}>
      {/* Mobile AppBar with hamburger menu */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          width: "auto",
          right: 40,
          top: "14px", // Below main navigation
          zIndex: 1200,
        }}
      >
        <MenuOpenIcon onClick={handleDrawerToggle} sx={{ mr: 2 }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              top: "0px", // Below both navbars
              backgroundColor: "black",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Sidebar
              navigation={navigation}
              currentSlug={currentSlug}
              basePath="/docs"
              onNavigate={() => setMobileOpen(false)}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </Box>
        </Drawer>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            p: 2,
          }}
        >
          <Sidebar
            navigation={navigation}
            currentSlug={currentSlug}
            basePath="/docs"
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </Box>

        <Box
          component="main"
          sx={{
            paddingTop: {
              sx: 8,
              md: 3, // Extra space for mobile toolbar
            },
            paddingBottom: 2,
            marginBottom: 3,
            flex: 1,
            paddingLeft: { xs: 2, md: 4 },
            paddingRight: { xs: 2, md: 4 },
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
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
                  {pageTitle || currentSlug.split("/").pop()}
                </Typography>
              )}
            </Breadcrumbs>
            
            {currentSlug && (
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <EditOnGitHubButton slug={currentSlug} />
              </Box>
            )}
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
            {mdxSource ? (
              <MDXContent source={mdxSource} searchText={searchText} />
            ) : (
              children
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default DocsLayout
