"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  useTheme,
  alpha,
} from "@mui/material"
import { LocationOn, ArrowUpward } from "@mui/icons-material"

const Footer = () => {
  const theme = useTheme()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Main Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "#0a0a0a",
          color: "#dee2e6",
          pt: 8,
          pb: 4,
          borderTop: `1px solid ${alpha("#dee2e6", 0.1)}`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr ",
              },
              gap: 6,
            }}
          >
            {/* Contact Us Section */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "#ffffff",
                }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "#dee2e6",
                  fontSize: "1.1rem",
                }}
              >
                Let&apos;s start the productive work.
              </Typography>

              {/* Questions & Support */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  mb: 2,
                  color: "#ffffff",
                }}
              >
                Questions & Support
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Link
                  href="https://stackoverflow.com/questions/ask?tags=dexie"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#dee2e6",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  → Ask on Stack Overflow
                </Link>
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#dee2e6", 0.7), mb: 2, ml: 2 }}
                >
                  Fastest response for technical questions
                </Typography>

                <Link
                  href="https://github.com/dexie/Dexie.js/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#dee2e6",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  → File an issue on GitHub
                </Link>
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#dee2e6", 0.7), mb: 2, ml: 2 }}
                >
                  Bug reports and feature requests
                </Typography>

                <Link
                  href="https://discord.com/channels/1328303736363421747/1339957860657926204"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#dee2e6",
                    textDecoration: "none",
                    mb: 1,
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                >
                  → Chat on Discord
                </Link>
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#dee2e6", 0.7), ml: 2 }}
                >
                  Community discussions
                </Typography>
              </Box>

              {/* Location */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  mb: 2,
                  color: "#ffffff",
                }}
              >
                Location
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                <LocationOn sx={{ mr: 1, mt: 0.5, fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: "#dee2e6" }}>
                    Störtloppsvägen 14, Hägersten
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#dee2e6" }}>
                    Oxtorget 4, Växjö
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Map Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  mb: 3,
                  color: "#ffffff",
                }}
              >
                Our Locations
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: "300px",
                    md: "-webkit-fill-available",
                  },
                  overflow: "hidden",
                  pb: 5,
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed/v1/search?key=AIzaSyDmOtclVWnqNu30_6OQ_NFVOhdOa6NFOA4&q=Störtloppsvägen+14+Hägersten+Sweden|Oxtorget+4+Växjö+Sweden&center=57.5,16&zoom=5&maptype=satellite"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "8px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bottom Footer */}
      <Box
        sx={{
          bgcolor: "#000000",
          color: "#dee2e6",
          py: 3,
          borderTop: `1px solid ${alpha("#dee2e6", 0.1)}`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              textTransform: "uppercase",
            }}
          >
            {/* Copyright */}
            <Typography
              variant="body2"
              sx={{
                color: alpha("#dee2e6", 0.8),
                order: { xs: 3, lg: 1 },
                width: { xs: "100%", lg: "auto" },
                textAlign: { xs: "center", lg: "left" },
              }}
            >
              © 2014-2025 Awarica AB
            </Typography>

            {/* Social Links */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexWrap: "wrap",
                order: { xs: 1, lg: 2 },
              }}
            >
              <Link
                href="https://github.com/dexie/Dexie.js"
                target="_blank"
                rel="nofollow noopener"
                sx={{
                  color: "#dee2e6",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                GitHub
              </Link>
              <Link
                href="https://medium.com/dexie-js"
                target="_blank"
                rel="nofollow noopener"
                sx={{
                  color: "#dee2e6",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Blog
              </Link>
              <Link
                href="https://stackoverflow.com/questions/tagged/dexie"
                target="_blank"
                rel="nofollow noopener"
                sx={{
                  color: "#dee2e6",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Stack Overflow
              </Link>
              <Link
                href="https://twitter.com/dexiejs"
                target="_blank"
                rel="nofollow noopener"
                sx={{
                  color: "#dee2e6",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffffff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Twitter
              </Link>
            </Box>

            {/* Back to Top */}
            <Box
              sx={{
                order: { xs: 2, lg: 3 },
                width: { xs: "100%", lg: "auto" },
                display: "flex",
                justifyContent: { xs: "center", lg: "flex-end" },
              }}
            >
              <Button
                onClick={scrollToTop}
                sx={{
                  color: "#dee2e6",
                  textTransform: "uppercase",
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "transparent",
                  },
                }}
                endIcon={<ArrowUpward />}
              >
                Back to top
              </Button>
            </Box>
          </Box>

          {/* Footer Text */}
          <Box sx={{ textAlign: "center", mt: 4, pt: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: alpha("#dee2e6", 0.8),
                mb: 1,
              }}
            >
              Made with love for great people.
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha("#dee2e6", 0.6),
              }}
            >
              Read{" "}
              <Link
                href="/cloud/terms"
                sx={{ color: theme.palette.primary.main }}
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/cloud/privacy"
                sx={{ color: theme.palette.primary.main }}
              >
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Footer
