"use client"
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Avatar,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Link from "next/link"
import CloudIcon from "@mui/icons-material/Cloud"
import SecurityIcon from "@mui/icons-material/Security"
import SyncIcon from "@mui/icons-material/Sync"
import LaunchIcon from "@mui/icons-material/Launch"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import QuoteIcon from "@mui/icons-material/FormatQuote"

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(8),
}))

const FeatureCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}))

const CodeBlock = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(3),
  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
  fontSize: "0.875rem",
  overflow: "auto",
}))

const TestimonialCard = styled(Card)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(3),
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  },
}))

const StepCard = styled(Card)(({ theme }) => ({
  height: "100%",
  border: `2px solid ${theme.palette.divider}`,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    transform: "translateY(-4px)",
  },
}))

export default function DexieCloudProductPage() {
  const testimonials = [
    {
      quote:
        "After exploring several options, including major players like Firebase, I felt constrained by their complexity and locking structures. I sought a platform that not only fostered creativity but also expanded our possibilities. That's when I discovered Dexie Cloud.",
      author: "Bennie Forss",
      role: "Founder of Zenta AB",
      avatar: "/assets/images/testimonials/bennie.jpg",
    },
    {
      quote:
        "I started using Dexie for my project, and I was worried about integrating user authentication and synchronization into it. However, when I discovered Dexie Cloud, I was amazed at how seamlessly I could integrate it into my app.",
      author: "Alba Rincon",
      role: "Founder of Routickr",
      avatar: "/assets/images/testimonials/albarin.jpg",
    },
    {
      quote:
        "Offline-first web apps are no longer difficult. Dexie Cloud gave Fablehenge a truly backendless experience and has been essential for our tiny dev team to ship big features like it already happened.",
      author: "Dusty Phillips",
      role: "Founder of Fablehenge",
      avatar: "/assets/images/testimonials/dusty2.jpeg",
    },
  ]

  return (
    <>
      <HeroSection>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={3}
            >
              <CloudIcon sx={{ fontSize: 60, mr: 2 }} />
              <Typography
                variant="h1"
                component="h1"
                fontWeight="bold"
                sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
              >
                Dexie Cloud
              </Typography>
            </Box>
            <Typography variant="h4" component="h2" gutterBottom>
              A Sync Service for Dexie.js
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ maxWidth: 800, mx: "auto", mb: 4, opacity: 0.9 }}
            >
              Build completely offline-first apps using Dexie.js as your sole
              storage model. Then let Dexie Cloud sync your data with the cloud.
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mb={3}>
              <Chip label="Almost Zero Config" color="success" size="medium" />
              <Chip label="Free Tier Available" color="info" size="medium" />
              <Chip label="Production Ready" color="secondary" size="medium" />
            </Box>
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
              <Button
                component={Link}
                href="/pricing"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                Get Started Free
              </Button>
              <Button
                href="#get-started"
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                See How It Works
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        {/* Key Features */}
        <Box mb={8}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
          >
            Why Choose Dexie Cloud?
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Everything you need to build modern, collaborative, offline-first
            applications
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              gap: 4,
              mt: 4,
            }}
          >
            <FeatureCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <SyncIcon sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Almost Zero Config
                </Typography>
                <Typography variant="body2">
                  Create your database in the cloud by just running a simple npx
                  command! Use the new dexie-cloud-addon to connect your Dexie
                  database with the cloud.
                </Typography>
              </CardContent>
            </FeatureCard>

            <FeatureCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <SecurityIcon
                  sx={{ fontSize: 50, color: "primary.main", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Authentication
                </Typography>
                <Typography variant="body2">
                  Passwordless email OTP is part of the service so you
                  don&apos;t have to deal with setting up auth. Have auth
                  already? Skip our default auth and use your own instead!
                </Typography>
              </CardContent>
            </FeatureCard>

            <FeatureCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <CheckCircleIcon
                  sx={{ fontSize: 50, color: "primary.main", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Access Control
                </Typography>
                <Typography variant="body2">
                  A per-object access model lets your users keep their synced
                  private data for themselves or shared with their teams or
                  friends.
                </Typography>
              </CardContent>
            </FeatureCard>

            <FeatureCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <CloudIcon
                  sx={{ fontSize: 50, color: "primary.main", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Consistent Sync
                </Typography>
                <Typography variant="body2">
                  Dexie Cloud doesn&apos;t just sync individual CRUD operations
                  - it syncs the where-expressions along with the operations,
                  making it possible to keep related data consistent.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Box>
        </Box>

        {/* Getting Started */}
        <Box mb={8} id="get-started">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
          >
            Get Started in Minutes
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            paragraph
          >
            Add cloud synchronization to your Dexie.js app with just a few
            commands
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(5, 1fr)" },
              gap: 3,
              mt: 4,
            }}
          >
            <StepCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  1
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Create Database
                </Typography>
                <CodeBlock sx={{ textAlign: "left", fontSize: "0.75rem" }}>
                  <pre>{`npx dexie-cloud create`}</pre>
                </CodeBlock>
              </CardContent>
            </StepCard>

            <StepCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  2
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Whitelist Origin
                </Typography>
                <CodeBlock sx={{ textAlign: "left", fontSize: "0.75rem" }}>
                  <pre>{`npx dexie-cloud whitelist 
http://localhost:3000`}</pre>
                </CodeBlock>
              </CardContent>
            </StepCard>

            <StepCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  3
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Install Addon
                </Typography>
                <CodeBlock sx={{ textAlign: "left", fontSize: "0.75rem" }}>
                  <pre>{`npm install dexie@latest
npm install dexie-cloud-addon`}</pre>
                </CodeBlock>
              </CardContent>
            </StepCard>

            <StepCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  4
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Update DB Code
                </Typography>
                <CodeBlock sx={{ textAlign: "left", fontSize: "0.75rem" }}>
                  <pre>{`import dexieCloud from 
"dexie-cloud-addon";

const db = new Dexie('SyncedDB', {
  addons: [dexieCloud]
});`}</pre>
                </CodeBlock>
              </CardContent>
            </StepCard>

            <StepCard>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "success.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  ✓
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Done!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your app now syncs with the cloud automatically. Users will be
                  prompted to login the first time.
                </Typography>
              </CardContent>
            </StepCard>
          </Box>
        </Box>

        {/* Pricing Overview */}
        <Box mb={8}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
          >
            Simple, Transparent Pricing
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              mt: 4,
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                border: 2,
                borderColor: "success.main",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  color="success.main"
                  fontWeight="bold"
                >
                  Free Edition
                </Typography>
                <Typography variant="h3" component="div" gutterBottom>
                  $0
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Perfect for getting started
                </Typography>
                <Box sx={{ my: 3, textAlign: "left" }}>
                  <Typography variant="body2" component="div">
                    ✓ 3 production users
                    <br />
                    ✓ 100 MB storage
                    <br />
                    ✓ Infinite evaluation users
                    <br />
                    ✓ 10 connections
                    <br />✓ All features included
                  </Typography>
                </Box>
                <Button variant="contained" color="success" fullWidth>
                  Start Free
                </Button>
              </CardContent>
            </Card>

            <Card
              sx={{
                textAlign: "center",
                border: 2,
                borderColor: "primary.main",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  color="primary.main"
                  fontWeight="bold"
                >
                  Production
                </Typography>
                <Typography variant="h3" component="div" gutterBottom>
                  $0.12
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  per user / month
                </Typography>
                <Box sx={{ my: 3, textAlign: "left" }}>
                  <Typography variant="body2" component="div">
                    ✓ 25+ production users
                    <br />
                    ✓ 21+ GB storage
                    <br />
                    ✓ 50+ connections
                    <br />
                    ✓ Infinite evaluation users
                    <br />✓ Increased rate-limits
                  </Typography>
                </Box>
                <Button variant="contained" fullWidth>
                  Choose Production
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ textAlign: "center" }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  On-Premise
                </Typography>
                <Typography variant="h3" component="div" gutterBottom>
                  $3,495
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  one-time license
                </Typography>
                <Box sx={{ my: 3, textAlign: "left" }}>
                  <Typography variant="body2" component="div">
                    ✓ Install on your servers
                    <br />
                    ✓ No limits or recurring costs
                    <br />
                    ✓ 5 years software updates
                    <br />
                    ✓ 1 year Silver Support
                    <br />✓ Full data control
                  </Typography>
                </Box>
                <Button variant="outlined" fullWidth>
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Box textAlign="center" mt={4}>
            <Button
              component={Link}
              href="/pricing"
              variant="outlined"
              size="large"
            >
              View Detailed Pricing
            </Button>
          </Box>
        </Box>

        {/* Testimonials */}
        <Box mb={8}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
          >
            What Developers Are Saying
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              mt: 4,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <CardContent sx={{ p: 3 }}>
                  <QuoteIcon sx={{ color: "primary.main", mb: 2 }} />
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{ fontStyle: "italic" }}
                  >
                    &quot;{testimonial.quote}&quot;
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      sx={{ mr: 2, width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {testimonial.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </TestimonialCard>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Build Something Amazing?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Join thousands of developers already building with Dexie Cloud
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            gap={3}
            flexWrap="wrap"
            mt={4}
          >
            <Button
              component={Link}
              href="/pricing"
              variant="contained"
              size="large"
            >
              Start Free Today
            </Button>
            <Button
              component={Link}
              href="/cloud/docs"
              variant="outlined"
              size="large"
            >
              Read Documentation
            </Button>
            <Button
              href="https://manager.dexie.cloud/"
              variant="outlined"
              size="large"
              startIcon={<LaunchIcon />}
              target="_blank"
            >
              Cloud Manager
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
