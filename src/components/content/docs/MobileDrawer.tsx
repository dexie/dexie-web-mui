"use client"

import React, { useState, Suspense } from "react"
import { Box, Drawer } from "@mui/material"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import Sidebar from "./Sidebar"

interface NavItem {
  title: string
  slug: string
  layout?: string
}

interface NavStructure {
  [key: string]: NavItem | NavStructure
}

interface MobileDrawerProps {
  navigation: NavStructure
  currentSlug?: string
  drawerWidth: number
}

export default function MobileDrawer({ navigation, currentSlug, drawerWidth }: MobileDrawerProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
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
          <Suspense fallback={<div />}>
            <Sidebar
              navigation={navigation}
              currentSlug={currentSlug}
              basePath="/docs"
              onNavigate={() => setMobileOpen(false)}
            />
          </Suspense>
        </Box>
      </Drawer>
    </>
  )
}