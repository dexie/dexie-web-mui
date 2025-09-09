"use client"
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Link from "next/link"
import CloudIcon from "@mui/icons-material/Cloud"
import StorageIcon from "@mui/icons-material/Storage"
import LaunchIcon from "@mui/icons-material/Launch"

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(8),
}))

const ProductCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}))

export default function ProductPage() {
  return (
    <>
      <HeroSection>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Dexie Products
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Powerful tools for building modern web applications with IndexedDB
              and cloud synchronization
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
          }}
        >
          {/* Dexie.js Card */}
          <ProductCard>
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <StorageIcon
                  sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
                />
                <Typography variant="h4" component="h2" fontWeight="bold">
                  Dexie.js
                </Typography>
              </Box>

              <Typography variant="h6" color="text.secondary" gutterBottom>
                A Minimalistic Wrapper for IndexedDB
              </Typography>

              <Box mb={2}>
                <Chip label="Free & Open Source" color="success" size="small" />
                <Chip
                  label="29k minified"
                  color="info"
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>

              <Typography variant="body1" paragraph>
                Dexie.js is a wrapper library for indexedDB - the standard
                database in the browser. It provides a clean, simple API that is
                much easier to work with than native IndexedDB.
              </Typography>

              <Typography variant="body2" component="div" sx={{ mb: 3 }}>
                <strong>Key Features:</strong>
                <ul>
                  <li>Reactive queries with live updates</li>
                  <li>Promise-based API</li>
                  <li>Easy to learn and use</li>
                  <li>TypeScript support</li>
                  <li>Framework integrations (React, Vue, Svelte, Angular)</li>
                  <li>Only ~29k minified and gzipped</li>
                </ul>
              </Typography>

              <Box display="flex" gap={2} mt="auto">
                <Button
                  component={Link}
                  href="/product/dexie"
                  variant="contained"
                  size="large"
                >
                  Learn More
                </Button>
                <Button
                  href="https://github.com/dexie/Dexie.js"
                  variant="outlined"
                  size="large"
                  startIcon={<LaunchIcon />}
                  target="_blank"
                >
                  GitHub
                </Button>
              </Box>
            </CardContent>
          </ProductCard>

          {/* Dexie Cloud Card */}
          <ProductCard>
            <CardContent sx={{ flexGrow: 1, p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <CloudIcon
                  sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
                />
                <Typography variant="h4" component="h2" fontWeight="bold">
                  Dexie Cloud
                </Typography>
              </Box>

              <Typography variant="h6" color="text.secondary" gutterBottom>
                A Sync Service for Dexie.js
              </Typography>

              <Box mb={2}>
                <Chip
                  label="Free Tier Available"
                  color="success"
                  size="small"
                />
                <Chip
                  label="Production Ready"
                  color="primary"
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>

              <Typography variant="body1" paragraph>
                Build completely offline-first apps with Dexie.js and add cloud
                synchronization with just a few lines of code. Authentication
                and access control included.
              </Typography>

              <Typography variant="body2" component="div" sx={{ mb: 3 }}>
                <strong>Key Features:</strong>
                <ul>
                  <li>Almost zero configuration</li>
                  <li>Passwordless email OTP authentication</li>
                  <li>Per-object access control</li>
                  <li>Consistent bidirectional sync</li>
                  <li>Offline-first architecture</li>
                  <li>Real-time collaboration</li>
                </ul>
              </Typography>

              <Box display="flex" gap={2} mt="auto">
                <Button
                  component={Link}
                  href="/product/cloud"
                  variant="contained"
                  size="large"
                >
                  Learn More
                </Button>
                <Button
                  component={Link}
                  href="/pricing"
                  variant="outlined"
                  size="large"
                >
                  Pricing
                </Button>
              </Box>
            </CardContent>
          </ProductCard>
        </Box>

        {/* Call to Action Section */}
        <Box textAlign="center" mt={8} mb={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Choose the right solution for your project needs
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button
              component={Link}
              href="/product/dexie"
              variant="contained"
              size="large"
            >
              Start with Dexie.js
            </Button>
            <Button
              component={Link}
              href="/product/cloud"
              variant="outlined"
              size="large"
            >
              Add Cloud Sync
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
