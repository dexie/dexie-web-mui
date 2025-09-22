"use client"

import React, { useState } from "react"
import { Box, Typography, Button, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeIcon from "@mui/icons-material/Code"
import GitHubIcon from "@mui/icons-material/GitHub"
import Image from "next/image"
import TypeWriter from "@/components/content/shared/TypeWriter"
import CodeBlock from "@/components/content/shared/CodeBlock"

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
    zoom: 0.85,
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
    zoom: 0.9,
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
  {
    id: "sync",
    name: "Cloud",
    logo: "/assets/favicon/favicon-white.svg",
    zoom: 0.9,
    code: `import Dexie from "dexie";
import dexieCloud from "dexie-cloud-addon";

const db = new Dexie('SyncedTasks', {addons: [dexieCloud]});

db.version(1).stores({
  tasks: '@id, title, created' // '@' = auto-generated global ID
});

// Connect your dexie-cloud database:
db.cloud.configure({
  databaseUrl: "https://<yourdatabase>.dexie.cloud",
  requireAuth: true // optional
});

// Now your tasks sync automatically!
await db.tasks.add({
  title: "Synced task",
  created: new Date()
});`,
    description:
      "Real-time sync and collaboration - start local, add sync when ready",
  },
]

// Styled components for the new hero
const CustomHeroSection = styled(Box)(({ theme }) => ({
  background: 'url("/assets/images/dexie-bg.jpg") center/cover no-repeat',
  color: "white",
  padding: theme.spacing(12, 0),
  position: "relative",
  overflow: "hidden",
  height: "100vh",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    opacity: 0.95,
    zIndex: 1,
  },
  "> *": {
    position: "relative",
    zIndex: 2,
  },
}))

const FrameworkCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.3s ease",
  minWidth: 80,
  textAlign: "center",
  "&:hover, &.active": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: theme.palette.primary.light,
    boxShadow: `0 8px 24px rgba(0, 0, 0, 0.3)`,
  },
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
          py: 18,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        {/* Left side - Hero text */}
        <Box sx={{ flex: 1, maxWidth: { md: "50%" } }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 500,
              fontSize: { xs: "2.5rem", md: "60px" },
              lineHeight: "72px",
              mb: 3,
            }}
          >
            The natural way to use
            <br />
            <TypeWriter
              colorClass=""
              strings={[
                "IndexedDB",
                "Browser Storage",
                "Local Databases",
                "Offline Data",
                "Sync & Collaboration",
                "Authentication",
              ]}
              breakRows={false}
            />
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

          <br />
          <br />

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

            <Box sx={{ zoom: currentExample?.zoom ? currentExample?.zoom : 1 }}>
              <CodeBlock
                language="javascript"
                showLineNumbers={true}
                code={currentExample?.code || frameworkExamples[0].code}
              />
            </Box>

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
