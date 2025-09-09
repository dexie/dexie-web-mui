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
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Link from "next/link"
import StorageIcon from "@mui/icons-material/Storage"
import CodeIcon from "@mui/icons-material/Code"
import SpeedIcon from "@mui/icons-material/Speed"
import LaunchIcon from "@mui/icons-material/Launch"
import GitHubIcon from "@mui/icons-material/GitHub"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

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
  "& .comment": {
    color: theme.palette.grey[400],
  },
  "& .keyword": {
    color: theme.palette.info.light,
  },
  "& .string": {
    color: theme.palette.success.light,
  },
}))

export default function DexieProductPage() {
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
              <StorageIcon sx={{ fontSize: 60, mr: 2 }} />
              <Typography
                variant="h1"
                component="h1"
                fontWeight="bold"
                sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
              >
                Dexie.js
              </Typography>
            </Box>
            <Typography variant="h4" component="h2" gutterBottom>
              A Minimalistic Wrapper for IndexedDB
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ maxWidth: 800, mx: "auto", mb: 4, opacity: 0.9 }}
            >
              Dexie.js is a wrapper library for IndexedDB - the standard
              database in the browser. It provides a clean, simple API that
              makes working with client-side databases effortless.
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mb={3}>
              <Chip label="Free & Open Source" color="success" size="medium" />
              <Chip label="Only 29k minified" color="info" size="medium" />
              <Chip label="Promise-based" color="secondary" size="medium" />
            </Box>
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
              <Button
                href="https://github.com/dexie/Dexie.js"
                variant="contained"
                size="large"
                startIcon={<GitHubIcon />}
                target="_blank"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                View on GitHub
              </Button>
              <Button
                href="https://jsfiddle.net/dfahlander/3tf5r0cu"
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
                target="_blank"
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Try in JSFiddle
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
            Why Choose Dexie.js?
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Dexie makes IndexedDB development straightforward and enjoyable
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              mt: 4,
            }}
          >
            <FeatureCard>
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <SpeedIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Reactive
                </Typography>
                <Typography variant="body1">
                  Dexie 3.2 integrates better with front-end frameworks. Query
                  the database without boilerplate and let your components
                  mirror the database in real time.
                </Typography>
              </CardContent>
            </FeatureCard>

            <FeatureCard>
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <CodeIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Easy to Learn
                </Typography>
                <Typography variant="body1">
                  Dexie was written to be straightforward and easy to learn. If
                  you&apos;ve ever had to work with native IndexedDB then
                  you&apos;ll certainly appreciate Dexie&apos;s concise API.
                </Typography>
              </CardContent>
            </FeatureCard>

            <FeatureCard>
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <StorageIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Easy to Sync
                </Typography>
                <Typography variant="body1">
                  With only a few lines of extra code, you can build a
                  consistent, authenticated and access controlled local-first
                  app using Dexie Cloud.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Box>
        </Box>

        {/* Code Examples */}
        <Box mb={8}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
          >
            Basic Examples
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 4,
              mt: 4,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                color="text.secondary"
              >
                Declare your database
              </Typography>
              <CodeBlock>
                <pre>{`/*
|----------------------------|
| Declare your database      |
|----------------------------|
*/

const db = new Dexie('MyDatabase');

// Declare tables, IDs and indexes
db.version(1).stores({
  friends: '++id, name, age'
});`}</pre>
              </CodeBlock>
            </Box>

            <Box>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                color="text.secondary"
              >
                Then run some queries
              </Typography>
              <CodeBlock>
                <pre>{`/*
|-----------------------|
| Then run some queries |
|-----------------------|
*/

// Find some old friends
const oldFriends = await db.friends
  .where('age').above(75)
  .toArray();

// or make a new one
await db.friends.add({
  name: 'Camilla',
  age: 25,
  street: 'East 13:th Street',
  picture: await getBlob('camilla.png')
});`}</pre>
              </CodeBlock>
            </Box>
          </Box>
        </Box>

        {/* Framework Integration */}
        <Box mb={8}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
          >
            Framework Integration
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            paragraph
          >
            Live Queries work seamlessly with your favorite framework
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 4,
              mt: 4,
            }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  color="primary"
                >
                  React
                </Typography>
                <CodeBlock sx={{ mb: 2 }}>
                  <pre>{`import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

export function FriendList () {
  const friends = useLiveQuery(async () => {
    return await db.friends
      .where("age")
      .between(18, 65)
      .toArray();
  });

  return <>
    <h2>Friends</h2>
    <ul>
      {
        friends?.map(friend =>
          <li key={friend.id}>
            {friend.name}, {friend.age}
          </li>
        )
      }
    </ul>
  </>;
}`}</pre>
                </CodeBlock>
                <Button
                  href="https://stackblitz.com/edit/dexie-todo-list?file=components%2FTodoListView.tsx"
                  variant="outlined"
                  startIcon={<LaunchIcon />}
                  target="_blank"
                >
                  Try on Stackblitz
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  color="primary"
                >
                  Vue
                </Typography>
                <CodeBlock sx={{ mb: 2 }}>
                  <pre>{`<template>
  <h2>Friends</h2>
  <ul>
    <li v-for="friend in friends" :key="friend.id">
      {{ friend.name }}, {{ friend.age }}
    </li>
  </ul>  
</template>

<script>
  import { liveQuery } from "dexie";
  import { db } from "../db";
  import { useObservable } from "@vueuse/rxjs";
  
  export default {
    name: "FriendList",
    setup() {
      return {
        friends: useObservable(
          liveQuery(async () => {
            return await db.friends
              .where("age")
              .between(18, 65)
              .toArray();      
          })
        )
      };
    }
  };
</script>`}</pre>
                </CodeBlock>
                <Button
                  href="https://codesandbox.io/s/vue-dexie-livequery-87exj?file=/src/components/DBItems.vue"
                  variant="outlined"
                  startIcon={<LaunchIcon />}
                  target="_blank"
                >
                  Try on CodeSandbox
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Next Steps */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Choose your path to building amazing offline-first applications
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            gap={3}
            flexWrap="wrap"
            mt={4}
          >
            <Button
              href="/docs"
              variant="contained"
              size="large"
              component={Link}
            >
              Read Documentation
            </Button>
            <Button
              href="/product/cloud"
              variant="outlined"
              size="large"
              component={Link}
            >
              Add Cloud Sync
            </Button>
            <Button
              href="https://github.com/dexie/Dexie.js"
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              target="_blank"
            >
              Star on GitHub
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
