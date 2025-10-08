"use client"
import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { menuItems } from "../config/navigation"
import LockIcon from "@mui/icons-material/Lock"
import GitHubIcon from "@mui/icons-material/GitHub"
import LaunchIcon from "@mui/icons-material/Launch"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { formatNumber } from "../utils/formatNumber"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [stars, setStars] = useState(13000)
  const [supportMenuAnchor, setSupportMenuAnchor] =
    useState<null | HTMLElement>(null)
  const [productMenuAnchor, setProductMenuAnchor] =
    useState<null | HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const theme = useTheme()
  const pathname = usePathname()

  const supportMenuOpen = Boolean(supportMenuAnchor)
  const productMenuOpen = Boolean(productMenuAnchor)

  const handleSupportMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSupportMenuAnchor(event.currentTarget)
  }

  const handleSupportMenuClose = () => {
    setSupportMenuAnchor(null)
  }

  const handleProductMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setProductMenuAnchor(event.currentTarget)
  }

  const handleProductMenuClose = () => {
    setProductMenuAnchor(null)
  }

  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    // Check scroll position on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

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
  }, [mounted])

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor:
          mounted && scrolled
            ? theme.palette.background.default
            : "transparent",
        transition: "all 0.3s ease-in-out",
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
        <Link
          href="/"
          style={{
            textDecoration: "none",
            opacity: 1,
          }}
        >
          <Box sx={{ flex: "0 0 auto" }}>
            <Image
              src="/assets/images/dexie-logo.png"
              alt="Dexie Logo"
              width={80}
              height={20}
            />
          </Box>
        </Link>

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
            const isActive =
              pathname === item.href ||
              (item.text === "Product" && pathname.startsWith("/product"))
            const isExternal = item.external
            const isSupport = item.text === "Support"
            const isProduct = item.text === "Product"

            if (isProduct && item.children) {
              return (
                <Box key={item.id}>
                  <Button
                    onClick={handleProductMenuClick}
                    sx={{
                      opacity: isActive ? 1 : 0.78,
                      color: theme.palette.text.primary,
                      fontSize: "17px !important",
                      textTransform: "none",
                      fontWeight: isActive ? 600 : 400,
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      padding: "0px 18px !important",
                      display: "flex",
                      alignItems: "center",

                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.08
                        ),
                      },
                    }}
                    endIcon={<ExpandMoreIcon sx={{ fontSize: "16px" }} />}
                  >
                    {item.text}
                  </Button>
                  <Menu
                    anchorEl={productMenuAnchor}
                    open={productMenuOpen}
                    onClose={handleProductMenuClose}
                    MenuListProps={{
                      "aria-labelledby": "product-button",
                    }}
                    sx={{
                      padding: "0px !important",
                      mt: 2,
                      "& .MuiPaper-root": {
                        minWidth: "280px",
                        backgroundColor: "#000000",
                      },
                      "& .MuiList-root": {
                        padding: "0px !important",
                      },
                      "& .MuiList-root .MuiButtonBase-root:first-child": {
                        paddingTop: "10px !important",
                      },
                      "& .MuiList-root .MuiButtonBase-root:last-child": {
                        paddingBottom: "15px !important",
                      },
                    }}
                  >
                    {item.children.map((menuItem, index) => (
                      <MenuItem
                        key={index}
                        component={menuItem.external ? "a" : Link}
                        href={menuItem.href}
                        target={menuItem.external ? "_blank" : undefined}
                        rel={
                          menuItem.external ? "noopener noreferrer" : undefined
                        }
                        onClick={handleProductMenuClose}
                        sx={{
                          fontSize: "14px",
                          py: 1,
                          px: 2,
                          marginBottom: "0px !important",

                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.08
                            ),
                          },
                        }}
                      >
                        {menuItem.text}
                        {menuItem.external && (
                          <LaunchIcon
                            sx={{ fontSize: "12px", ml: 1, opacity: 0.7 }}
                          />
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )
            }

            if (isSupport && item.children) {
              return (
                <Box key={item.id}>
                  <Button
                    onClick={handleSupportMenuClick}
                    sx={{
                      opacity: isActive ? 1 : 0.78,
                      color: theme.palette.text.primary,
                      fontSize: "17px !important",
                      textTransform: "none",
                      fontWeight: isActive ? 600 : 400,
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      padding: "0px 18px !important",
                      display: "flex",
                      alignItems: "center",

                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.08
                        ),
                      },
                    }}
                    endIcon={<ExpandMoreIcon sx={{ fontSize: "16px" }} />}
                  >
                    {item.text}
                  </Button>
                  <Menu
                    anchorEl={supportMenuAnchor}
                    open={supportMenuOpen}
                    onClose={handleSupportMenuClose}
                    MenuListProps={{
                      "aria-labelledby": "support-button",
                    }}
                    sx={{
                      padding: "0px !important",
                      mt: 2,
                      "& .MuiPaper-root": {
                        minWidth: "280px",
                        backgroundColor: "#000000",
                      },
                      "& .MuiList-root": {
                        padding: "0px !important",
                      },
                      "& .MuiList-root .MuiButtonBase-root:first-child": {
                        paddingTop: "10px !important",
                      },
                      "& .MuiList-root .MuiButtonBase-root:last-child": {
                        paddingBottom: "15px !important",
                      },
                    }}
                  >
                    {item.children.map((menuItem, index) => {
                      if ("divider" in menuItem && menuItem.divider) {
                        return (
                          <Divider
                            sx={{
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                            }}
                            key={`divider-${index}`}
                          />
                        )
                      }
                      return (
                        <MenuItem
                          key={index}
                          component={menuItem.external ? "a" : Link}
                          href={menuItem.href}
                          target={
                            menuItem.external
                              ? menuItem.target || "_blank"
                              : undefined
                          }
                          rel={
                            menuItem.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          onClick={handleSupportMenuClose}
                          sx={{
                            fontSize: "14px",
                            py: 1,
                            px: 2,
                            marginBottom: "0px !important",

                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.08
                              ),
                            },
                          }}
                        >
                          {menuItem.text}
                          {menuItem.external && (
                            <LaunchIcon
                              sx={{ fontSize: "12px", ml: 1, opacity: 0.7 }}
                            />
                          )}
                        </MenuItem>
                      )
                    })}
                  </Menu>
                </Box>
              )
            }

            return (
              <Button
                key={item.id}
                component={isExternal ? "a" : Link}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                sx={{
                  opacity: isActive ? 1 : 0.78,
                  color: theme.palette.text.primary,
                  fontSize: "17px !important",
                  textTransform: "none",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                  padding: "0px 18px !important",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",

                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {item.text}
                {isExternal && (
                  <LaunchIcon sx={{ fontSize: "14px", opacity: 0.7 }} />
                )}
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
            component="a"
            href="https://manager.dexie.cloud"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            sx={{
              textTransform: "uppercase",
              textDecoration: "none !important",
              fontWeight: 400,
              fontSize: "13px",
              letterSpacing: "0.65px",
              padding: "6px 15px !important",
              height: "33.5px",
              minWidth: "104.922px",
              borderRadius: "30px",
              border: `1px solid ${theme.palette.secondary.main}`,
              color: `${theme.palette.secondary.main} !important`,
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
                color: `${theme.palette.background.default} !important`,
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
