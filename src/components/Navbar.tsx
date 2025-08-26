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
import LockIcon from "@mui/icons-material/Lock"
import GitHubIcon from "@mui/icons-material/GitHub"
import { formatNumber } from "../utils/formatNumber"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [stars, setStars] = useState(13000)
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

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/dexie/Dexie.js"
        )
        const data = await response.json()
        setStars(data.stargazers_count)
      } catch (error) {
        console.error("Error fetching stars:", error)
      }
    }
    fetchStars()
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
                  fontSize: "17px !important",
                  textTransform: "none",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                  padding: "0px 18px !important",

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

        {/* GitHub Stars Counter */}
        <Box sx={{ flex: "0 0 auto", marginRight: 2, zoom: 0.8 }}>
          <Button
            component="a"
            href="https://github.com/dexie/Dexie.js"
            target="_blank"
            sx={{
              fontSize: "14px !important",
              textTransform: "none",
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              padding: "0px !important",
              minWidth: "auto",
              opacity: 1,
              transition: "opacity 0.3s ease-in-out",

              "&:hover": {
                opacity: 1,
              },
            }}
            startIcon={<GitHubIcon sx={{ fontSize: "18px" }} />}
          >
            {formatNumber(stars)}
          </Button>
        </Box>

        {/* Sign In Button - Right */}
        <Box sx={{ flex: "0 0 auto" }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              textTransform: "uppercase",
              fontWeight: 400,
              fontSize: "13px",
              letterSpacing: "0.65px",
              padding: "6px 15px !important",
              height: "33.5px",
              minWidth: "104.922px",
              borderRadius: "30px",
              border: `1px solid ${theme.palette.secondary.main}`,
              color: theme.palette.secondary.main,
              backgroundColor: "transparent",
              boxSizing: "border-box",
              cursor: "pointer",
              display: "flex",
              textAlign: "center",
              verticalAlign: "middle",
              userSelect: "none",
              lineHeight: "19.5px",
              transition:
                "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",

              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.background.default,
                borderColor: theme.palette.secondary.main,
              },
            }}
            startIcon={
              <LockIcon
                sx={{
                  height: "16px",
                  mt: "2px",
                }}
              />
            }
          >
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
