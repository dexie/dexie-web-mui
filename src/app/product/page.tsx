"use client"
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Divider,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import StorageIcon from "@mui/icons-material/Storage"
import CloudIcon from "@mui/icons-material/Cloud"
import SpeedIcon from "@mui/icons-material/Speed"
import SecurityIcon from "@mui/icons-material/Security"
import GroupIcon from "@mui/icons-material/Group"
import SyncIcon from "@mui/icons-material/Sync"
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt"
import LaunchIcon from "@mui/icons-material/Launch"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import DevicesIcon from "@mui/icons-material/Devices"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"

const HeroSection = styled(Box)(({ theme }) => ({
  color: "white",
  padding: theme.spacing(12, 0),
  marginTop: theme.spacing(8),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/assets/images/hero-pattern.svg") center/cover',
    opacity: 0.1,
  },
}))

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[12],
    borderColor: theme.palette.primary.main,
  },
  backgroundColor: "rgba(255,255,255,0.02)",
}))

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
}))

const LayerVisualization = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: 600,
  margin: "0 auto",
  padding: theme.spacing(4),
}))

const BaseLayer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: "center",
  color: "white",
  marginBottom: theme.spacing(2),
  position: "relative",
  "&::after": {
    content: '"Foundation"',
    position: "absolute",
    top: -10,
    right: 16,
    background: theme.palette.success.dark,
    color: "white",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
}))

const CloudLayer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: "center",
  color: "white",
  position: "relative",
  "&::after": {
    content: '"Superpower Extension"',
    position: "absolute",
    top: -10,
    right: 16,
    background: theme.palette.primary.dark,
    color: "white",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
}))

export default function ProductPage() {
  return (
    <Box>
      {/* Revolutionary Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Box textAlign="center" position="relative" zIndex={1}>
            <Chip
              label="🚀 The Future of Web Development"
              sx={{
                mb: 3,
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontSize: "1.1rem",
                padding: "8px 16px",
              }}
            />
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "4rem" },
                lineHeight: 1.1,
                mb: 3,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Build the Impossible.
              <br />
              <Box component="span" sx={{ color: "secondary.light" }}>
                Ship the Incredible.
              </Box>
            </Typography>
            <Typography
              variant="h4"
              component="p"
              sx={{
                maxWidth: 800,
                mx: "auto",
                mb: 4,
                fontWeight: 300,
                opacity: 0.95,
                lineHeight: 1.4,
              }}
            >
              Transform any web app into an offline-first, real-time
              collaborative powerhouse. Start with the world&apos;s most loved
              IndexedDB wrapper, then add cloud superpowers.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "grey.100" },
                }}
                startIcon={<RocketLaunchIcon />}
              >
                Start Building Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
                endIcon={<LaunchIcon />}
                href="https://github.com/dexie/Dexie.js"
                target="_blank"
              >
                View on GitHub
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* Foundation + Extension Visual */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 2, fontWeight: 700 }}
        >
          One Foundation. Infinite Possibilities.
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: "auto" }}
        >
          Dexie.js gives you the foundation. Dexie Cloud gives you superpowers.
          Together, they&apos;re unstoppable.
        </Typography>

        <LayerVisualization>
          <CloudLayer>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <CloudIcon sx={{ fontSize: 32, mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Dexie Cloud
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Authentication • Real-time Sync • Collaboration • Hosting
            </Typography>
          </CloudLayer>
          <BaseLayer>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <StorageIcon sx={{ fontSize: 32, mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Dexie.js
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Offline Database • Reactive Queries • TypeScript • 29kb
            </Typography>
          </BaseLayer>
        </LayerVisualization>

        <Box textAlign="center" mt={4}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            " &quot;Dexie Cloud transforms your Dexie.js app into a
            full-featured, collaborative platform without building a
            backend.&quot;
          </Typography>
        </Box>
      </Container>

      <Divider />

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Trusted by Developers Worldwide
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          <StatsCard>
            <TrendingUpIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h3" fontWeight="bold" color="primary.main">
              13K+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              GitHub Stars
            </Typography>
          </StatsCard>
          <StatsCard>
            <DevicesIcon sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
            <Typography variant="h3" fontWeight="bold" color="success.main">
              1M+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Downloads/Month
            </Typography>
          </StatsCard>
          <StatsCard>
            <GroupIcon sx={{ fontSize: 48, color: "warning.main", mb: 2 }} />
            <Typography variant="h3" fontWeight="bold" color="warning.main">
              10K+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Active Developers
            </Typography>
          </StatsCard>
          <StatsCard>
            <AutoAwesomeIcon
              sx={{ fontSize: 48, color: "secondary.main", mb: 2 }}
            />
            <Typography variant="h3" fontWeight="bold" color="secondary.main">
              100%
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Developer Love
            </Typography>
          </StatsCard>
        </Box>
      </Container>

      <Divider />

      {/* Before/After Journey */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 700 }}
        >
          From Good to Extraordinary
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 2fr 5fr" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* Before - Only Dexie.js */}
          <FeatureCard>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                <StorageIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                With Dexie.js Only
              </Typography>
              <Typography variant="h6" color="success.main" gutterBottom>
                Already Amazing
              </Typography>
              <Box component="ul" sx={{ pl: 2, "& li": { mb: 1 } }}>
                <li>✅ Your app works offline</li>
                <li>✅ Lightning-fast local database</li>
                <li>✅ Reactive queries with live updates</li>
                <li>✅ TypeScript support</li>
                <li>✅ Only 29kb bundle size</li>
                <li>✅ Perfect for single-user apps</li>
              </Box>
              <Chip
                label="Great for local-first apps"
                color="success"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </FeatureCard>

          {/* Arrow */}
          <Box sx={{ textAlign: "center" }}>
            <AutoAwesomeIcon
              sx={{
                fontSize: 64,
                color: "primary.main",
                animation: "pulse 2s infinite",
              }}
            />
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ fontWeight: 600, mt: 1 }}
            >
              Add Cloud
            </Typography>
          </Box>

          {/* After - With Dexie Cloud */}
          <FeatureCard
            sx={{ border: "2px solid", borderColor: "primary.main" }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                <CloudIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                With Dexie Cloud
              </Typography>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Absolutely Revolutionary
              </Typography>
              <Box component="ul" sx={{ pl: 2, "& li": { mb: 1 } }}>
                <li>🚀 Everything from Dexie.js PLUS:</li>
                <li>🔐 Passwordless authentication</li>
                <li>⚡ Real-time sync across devices</li>
                <li>👥 Multi-user collaboration</li>
                <li>🛡️ Per-object access control</li>
                <li>☁️ Secure cloud hosting</li>
                <li>🔄 Offline-first with sync</li>
              </Box>
              <Chip
                label="Perfect for collaborative apps"
                color="primary"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </FeatureCard>
        </Box>
      </Container>

      <Divider />

      {/* Technical Features */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Built for Developers, Loved by Users
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 800, mx: "auto" }}
        >
          Every feature designed to make your development experience delightful
          and your users&apos; experience magical.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          <FeatureCard>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <OfflineBoltIcon sx={{ fontSize: 48, color: "#c77dff", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Offline-First Architecture
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your app works instantly, even with no internet. Sync happens
                automatically when connection returns.
              </Typography>
            </CardContent>
          </FeatureCard>

          <FeatureCard>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <SpeedIcon sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Zero Config Setup
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Add 3 lines of code to get authentication, sync, and
                collaboration. No backend required.
              </Typography>
            </CardContent>
          </FeatureCard>

          <FeatureCard>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <SecurityIcon
                sx={{ fontSize: 48, color: "warning.main", mb: 2 }}
              />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Enterprise Security
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Per-object permissions, encryption at rest, and SOC 2 compliant
                infrastructure.
              </Typography>
            </CardContent>
          </FeatureCard>

          <FeatureCard>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <SyncIcon sx={{ fontSize: 48, color: "info.main", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Consistent Sync
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Bidirectional sync that guarantees data consistency across all
                devices and users.
              </Typography>
            </CardContent>
          </FeatureCard>

          <FeatureCard>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <GroupIcon
                sx={{ fontSize: 48, color: "secondary.main", mb: 2 }}
              />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Real-time Collaboration
              </Typography>
              <Typography variant="body1" color="text.secondary">
                See changes from other users instantly. Perfect for
                collaborative documents and apps.
              </Typography>
            </CardContent>
          </FeatureCard>

          <FeatureCard>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <LaunchIcon sx={{ fontSize: 48, color: "error.main", mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Framework Agnostic
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Works with React, Vue, Svelte, Angular, or vanilla JavaScript.
                Your choice, your way.
              </Typography>
            </CardContent>
          </FeatureCard>
        </Box>
      </Container>

      <Divider />

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Build Something Amazing?
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
          >
            Join thousands of developers who&apos;ve already discovered the
            magic of offline-first development.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
              startIcon={<StorageIcon />}
            >
              Start with Dexie.js
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: "1.2rem",
              }}
              startIcon={<CloudIcon />}
            >
              Add Cloud Superpowers
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 3, fontStyle: "italic" }}
          >
            Always free to start • Scale as you grow • Cancel anytime
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
