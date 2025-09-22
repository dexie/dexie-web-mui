"use client"

import React, { useState } from "react"
import { Box, Typography, Button, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeIcon from "@mui/icons-material/Code"
import GitHubIcon from "@mui/icons-material/GitHub"
import Image from "next/image"

// Framework examples showcasing Dexie.js support
const frameworkExamples = [
  {
    id: "react",
    name: "React",
    logo: "/assets/images/icons/react-svgrepo-com.svg",
    code: `import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

export function TaskList() {
  const tasks = useLiveQuery(
    () => db.tasks.orderBy("created").toArray()
  );

  return (
    <ul>
      {tasks?.map(task => 
        <li key={task.id}>{task.title}</li>
      )}
    </ul>
  );
}`,
    description: "Perfect integration with React hooks and state management",
  },
  {
    id: "vue",
    name: "Vue",
    logo: "/assets/images/icons/vue-svgrepo-com.svg",
    code: `<template>
  <div>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "./db";

export default {
  setup() {
    return {
      tasks: useObservable(
        liveQuery(() => db.tasks.orderBy("created").toArray())
      )
    };
  }
};
</script>`,
    description: "Reactive data binding with Vue's composition API",
  },
  {
    id: "svelte",
    name: "Svelte",
    logo: "/assets/images/icons/svelte-svgrepo-com.svg",
    code: `<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";
  
  let tasks = liveQuery(
    () => db.tasks.orderBy("created").toArray()
  );
</script>

<div>
  <h2>Tasks</h2>
  <ul>
    {#each ($tasks || []) as task (task.id)}
      <li>{task.title}</li>
    {/each}
  </ul>
</div>`,
    description: "Effortless reactivity with Svelte's reactive statements",
  },
  {
    id: "angular",
    name: "Angular",
    logo: "/assets/images/icons/angular-svgrepo-com.svg",
    code: `import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from './db';

@Component({
  selector: 'task-list',
  template: \`
    <h2>Tasks</h2>
    <ul>
      <li *ngFor="let task of tasks$ | async">
        {{ task.title }}
      </li>
    </ul>
  \`
})
export class TaskListComponent {
  tasks$ = liveQuery(() => listTasks());
}

async function listTasks() {
  return await db.tasks.orderBy("created").toArray();
}`,
    description:
      "Seamless integration with Angular's reactive forms and observables",
  },
  {
    id: "vanilla",
    name: "Vanilla JS",
    logo: "/assets/images/icons/javascript-svgrepo-com.svg",
    code: `import { liveQuery } from "dexie";
import { db } from "./db";

// Subscribe to live updates
const subscription = liveQuery(
  () => db.tasks.orderBy("created").toArray()
).subscribe(tasks => {
  // Update DOM when data changes
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = tasks
    .map(task => \`<li>\${task.title}</li>\`)
    .join('');
});

// Clean up when done
// subscription.unsubscribe();`,
    description:
      "Pure JavaScript with reactive queries - no framework required",
  },
]

// Styled components for the new hero
const CustomHeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)`,
  color: "white",
  padding: theme.spacing(12, 0),
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
    opacity: 0.05,
  },
}))

const FrameworkCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.3s ease",
  minWidth: 80,
  textAlign: "center",
  "&:hover, &.active": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: theme.palette.primary.light,
    transform: "translateY(-4px)",
    boxShadow: `0 8px 24px rgba(0, 0, 0, 0.3)`,
  },
}))

const CodeBlock = styled(Box)(({ theme }) => ({
  backgroundColor: "#1e1e1e",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  fontFamily: "Monaco, 'Cascadia Code', 'Roboto Mono', monospace",
  fontSize: "0.875rem",
  lineHeight: 1.6,
  overflow: "auto",
  maxHeight: "400px",
  "& .syntax-keyword": { color: "#569cd6" },
  "& .syntax-string": { color: "#ce9178" },
  "& .syntax-comment": { color: "#6a9955" },
}))

function CustomProductHero() {
  const [selectedFramework, setSelectedFramework] = useState("react")
  const currentExample = frameworkExamples.find(
    (f) => f.id === selectedFramework
  )

  return (
    <CustomHeroSection>
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          px: 3,
          py: 8,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {/* Left side - Hero text */}
        <Box sx={{ flex: 1, maxWidth: { md: "50%" } }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            The Natural Way to Use
            <Box
              component="span"
              sx={{ color: "primary.light", display: "block" }}
            >
              IndexedDB
            </Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              opacity: 0.9,
              mb: 4,
              lineHeight: 1.4,
            }}
          >
            Works with any JavaScript framework. Start local, add sync when
            ready. No complicated setup, no learning curve - just natural,
            intuitive code.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CodeIcon />}
              href="https://dexie.org/docs/Tutorial/Getting-started"
              target="_blank"
              sx={{ px: 4, py: 1.5 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              href="https://github.com/dexie/Dexie.js"
              target="_blank"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "rgba(255,255,255,0.3)",
                color: "white",
                "&:hover": {
                  borderColor: "primary.light",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              13k+ Stars
            </Button>
          </Box>

          {/* Framework logos */}
          <Typography variant="h6" sx={{ mb: 2, opacity: 0.8 }}>
            Works with your favorite framework:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {frameworkExamples.map((framework) => (
              <FrameworkCard
                key={framework.id}
                className={selectedFramework === framework.id ? "active" : ""}
                onClick={() => setSelectedFramework(framework.id)}
              >
                <Box sx={{ mb: 1 }}>
                  <Image
                    src={framework.logo}
                    alt={framework.name}
                    width={32}
                    height={32}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: "white", fontWeight: 500 }}
                >
                  {framework.name}
                </Typography>
              </FrameworkCard>
            ))}
          </Box>
        </Box>

        {/* Right side - Code example */}
        <Box sx={{ flex: 1, maxWidth: { md: "50%" } }}>
          <Box sx={{ position: "sticky", top: 20 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Image
                src={currentExample?.logo || frameworkExamples[0].logo}
                alt={currentExample?.name || frameworkExamples[0].name}
                width={24}
                height={24}
                style={{ marginRight: 8 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0 }}>
                {currentExample?.name} Example
              </Typography>
            </Box>

            <CodeBlock>
              <pre style={{ margin: 0, color: "#d4d4d4" }}>
                {currentExample?.code}
              </pre>
            </CodeBlock>

            <Typography
              variant="body2"
              sx={{ mt: 2, opacity: 0.8, fontStyle: "italic" }}
            >
              {currentExample?.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CustomHeroSection>
  )
}

export default function ProductPage() {
  return (
    <>
      {/* Custom Product Hero with Framework Examples */}
      <CustomProductHero />

      {/* Simple content sections */}
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 3, py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Why Dexie.js?
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          The natural way to use IndexedDB
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Simple. Fast. Reliable.
          </Typography>
          <Typography variant="body1" paragraph>
            Dexie.js is a wrapper library for IndexedDB that makes it easy to
            work with browser databases. It provides a simple API that feels
            natural and intuitive.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Add Cloud Sync When Ready
          </Typography>
          <Typography variant="body1" paragraph>
            Start with local storage and add Dexie Cloud sync when you&apos;re
            ready to scale. Real-time collaboration, authentication, and
            offline-first architecture.
          </Typography>
        </Box>
      </Box>
    </>
  )
}
