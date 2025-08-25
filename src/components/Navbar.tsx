"use client"
import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  alpha,
} from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { menuItems } from "../config/navigation"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled
          ? theme.palette.background.default
          : "transparent",
        transition: "all 0.3s ease-in-out",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo/Brand - Left */}
        <Box sx={{ flex: "0 0 auto" }}>
          <img
            src="/assets/images/dexie-logo.png"
            alt="Your Logo"
            style={{ height: 20 }}
          />
        </Box>

        {/* Navigation Menu - Center */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flex: "1 1 auto",
            justifyContent: "center",
          }}
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Button
                key={item.id}
                component={Link}
                href={item.href}
                sx={{
                  opacity: isActive ? 1 : 0.78,
                  color: theme.palette.text.primary,
                  fontSize: "16px",
                  textTransform: "none",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                  padding: "8px 16px",

                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {item.text}
              </Button>
            )
          })}
        </Box>

        {/* Sign In Button - Right */}
        <Box sx={{ flex: "0 0 auto" }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              padding: "8px 20px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
