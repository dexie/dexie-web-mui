"use client"

import React, { useState } from "react"
import { Box, Typography, Button, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeIcon from "@mui/icons-material/Code"
import GitHubIcon from "@mui/icons-material/GitHub"
import AddIcon from "@mui/icons-material/Add"
import CloudIcon from "@mui/icons-material/Cloud"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import Image from "next/image"
import TypeWriter from "@/components/content/shared/TypeWriter"
import CodeBlock from "@/components/content/shared/CodeBlock"
import Brands from "@/components/content/hero/Brands"
import Benefits, {
  BenefitItem,
} from "@/components/content/Benefits/BenefitsWidget"
import TestimonialsWidget, {
  TestimonialItem,
} from "@/components/content/TestimonialsWidget"
import CallToActionWidget from "@/components/content/CallToActionWidget"
import FeatureScreenshotWidget from "@/components/content/FeatureScreenshotWidget"
import BlogPostsWidget, {
  BlogPostItem,
} from "@/components/content/BlogPostsWidget"
import { blogPostsData } from "../page"

// Why Dexie.js? - Benefits data
const dexieJsBenefits: BenefitItem[] = [
  {
    id: 1,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "The Smarter IndexedDB",
    description:
      "Dexie is a lightweight API over IndexedDB that removes callback complexity and exposes a promise/async-friendly API.",
    keyPoints: [
      "Less code, better error handling",
      "Higher readability",
      "Promise-based operations",
    ],
    svgPath:
      "M12 0c-3.371 2.866-5.484 3-9 3v11.535c0 4.603 3.203 5.804 9 9.465 5.797-3.661 9-4.862 9-9.465v-11.535c-3.516 0-5.629-.134-9-3zm0 1.292c2.942 2.31 5.12 2.655 8 2.701v10.542c0 3.891-2.638 4.943-8 8.284-5.375-3.35-8-4.414-8-8.284v-10.542c2.88-.046 5.058-.391 8-2.701zm5 7.739l-5.992 6.623-3.672-3.931.701-.683 3.008 3.184 5.227-5.878.728.685z",
  },
  {
    id: 2,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Built-in Reactivity",
    description:
      "liveQuery() keeps UI in sync with DB in real-time – components update when relevant records change, even across multiple tabs.",
    keyPoints: [
      "Real-time UI updates",
      "Cross-tab synchronization",
      "Automatic re-rendering",
    ],
    svgPath:
      "M24 19h-1v-2.2c-1.853 4.237-6.083 7.2-11 7.2-6.623 0-12-5.377-12-12h1c0 6.071 4.929 11 11 11 4.66 0 8.647-2.904 10.249-7h-2.249v-1h4v4zm-10.772 0h-2.457c-.448-1.286-.489-1.599-.931-1.781-.468-.193-.77.044-1.922.598l-1.736-1.735c.587-1.217.786-1.473.6-1.922-.188-.451-.528-.495-1.782-.932v-2.457c1.285-.448 1.598-.488 1.782-.932.192-.465-.04-.758-.6-1.921l1.736-1.736c1.163.561 1.467.792 1.921.6.46-.191.505-.556.932-1.782h2.457c.449 1.287.49 1.599.932 1.781.466.194.776-.045 1.922-.599l1.735 1.736c-.581 1.208-.784 1.473-.599 1.921.191.46.556.505 1.782.932v2.457c-1.27.442-1.597.487-1.782.933-.187.452.022.722.599 1.921l-1.735 1.735c-1.096-.526-1.452-.798-1.916-.601-.465.193-.508.553-.938 1.784zm-.71-13h-1.036c-.243.722-.462 1.375-1.26 1.705-.744.31-1.383.032-2.098-.314l-.733.733c.363.74.644 1.303.315 2.098-.343.827-.969.991-1.706 1.259v1.046c.723.244 1.375.453 1.706 1.25.332.802.033 1.378-.315 2.1l.733.731c.711-.348 1.355-.622 2.098-.314.757.314 1.011.909 1.259 1.706h1.029c.244-.723.471-1.375 1.272-1.708.773-.32 1.4-.01 2.094.316l.731-.732c-.336-.724-.656-1.268-.313-2.098.344-.828.963-.985 1.706-1.26v-1.036c-.724-.243-1.375-.463-1.706-1.26-.33-.798-.044-1.367.315-2.098l-.732-.733c-.715.344-1.345.627-2.099.315-.789-.327-.994-.922-1.26-1.706zm-.539 8.5c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm-7.979-1.5h-4v-4h1v2.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12h-1c0-6.071-4.929-11-11-11-4.66 0-8.647 2.904-10.249 7h2.249v1z",
  },
  {
    id: 3,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Performance & Modeling",
    description:
      "Indexes, transactions, and clear schema definition make it fast to query and safe to write – without wrestling with IndexedDB's raw API.",
    keyPoints: [
      "Optimized querying with indexes",
      "Transaction safety",
      "Clear schema definition",
    ],
    svgPath:
      "M17.517 10.012c.151.23.087.541-.144.692l-2.2 1.444c-.085.056-.179.082-.274.082-.162 0-.322-.079-.418-.225-.152-.231-.087-.541.143-.692l2.201-1.445c.23-.151.541-.089.692.144m-6.242-2.595l1.111-2.385c.116-.252.414-.36.664-.243.25.117.36.413.242.664l-1.111 2.386c-.085.181-.265.288-.453.288l-.211-.047c-.25-.115-.359-.413-.242-.663m-2.624.613c1.377-2.652 1.484-5.104.318-7.286-.178-.333.066-.734.441-.734.177 0 .351.095.442.264 1.33 2.49 1.225 5.254-.314 8.217-.089.171-.263.269-.444.269-.078 0-.156-.018-.23-.056-.245-.127-.341-.429-.213-.674m15.349 5.526c0 .352-.351.588-.671.47-2.808-1.028-5.254-.821-7.271.611-.088.063-.189.093-.29.093-.155 0-.309-.073-.406-.21-.16-.224-.108-.537.117-.696 2.301-1.637 5.059-1.884 8.193-.737.203.074.328.266.328.469m-16.484-2.608l2.865 7.517-2.248.964-2.753-7.512.778-2.176 1.358 1.207zm3.785 7.124l-2.168-5.687 5.025 4.463-2.857 1.224zm-8.27.419l.989 2.699-2.307.989 1.318-3.688zm1.823-5.103l2.358 6.435-2.271.973-1.384-3.777 1.297-3.631zm-4.853 10.612l15.997-6.853-10.283-9.137-5.714 15.99zm20.46-15.629l.552-.694.281.841.831.309-.713.528-.038.886-.723-.516-.854.238.268-.846-.491-.739.887-.007zm-1.384.885l-.639 2.019 2.041-.568 1.724 1.23.089-2.115 1.704-1.258-1.985-.739-.672-2.008-1.315 1.658-2.118.017 1.171 1.764zm-2.167-4.194c.593-.044.924-.141 1.074-.315.176-.204.226-.647.165-1.433-.023-.276.183-.517.459-.539.277-.016.515.18.537.456.063.806.059 1.62-.402 2.156-.429.499-1.13.602-1.76.647-.702.052-.72.243-.774.878-.056.67-.152 1.744-1.84 1.933-1.017.115-1.433.33-1.377 1.956.008.275-.207.325-.484.325h-.016c-.269 0-.491-.022-.5-.291-.049-1.461.191-2.655 2.265-2.887.874-.099.9-.404.956-1.072.054-.635.145-1.7 1.697-1.814m5.264-3.048c.454 0 .823.37.823.824 0 .454-.369.823-.823.823-.454 0-.824-.369-.824-.823 0-.454.37-.824.824-.824m0 2.647c1.006 0 1.823-.817 1.823-1.823s-.817-1.823-1.823-1.823c-1.007 0-1.824.817-1.824 1.823s.817 1.823 1.824 1.823m-8.446-3.662c.552 0 1 .449 1 .999 0 .551-.448.999-1 .999s-1-.448-1-.999c0-.55.448-.999 1-.999m0 2.998c1.103 0 1.999-.896 1.999-1.999 0-1.103-.896-1.998-1.999-1.998-1.104 0-2 .895-2 1.998s.896 1.999 2 1.999",
  },
]

// Why Dexie Cloud? - Benefits data
const dexieCloudBenefits: BenefitItem[] = [
  {
    id: 1,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Local-First Without Backend Building",
    description:
      "Add two-way sync, user auth, and access control on top of Dexie – without having to develop and maintain your own sync API.",
    keyPoints: [
      "No backend development needed",
      "Built-in sync infrastructure",
      "Focus on your app, not plumbing",
    ],
    svgPath:
      "M21.62 20.196c1.055-.922 1.737-2.262 1.737-3.772 0-1.321-.521-2.515-1.357-3.412v-6.946l-11.001-6.066-11 6v12.131l11 5.869 5.468-2.917c.578.231 1.205.367 1.865.367.903 0 1.739-.258 2.471-.676l2.394 3.226.803-.596-2.38-3.208zm-11.121 2.404l-9.5-5.069v-10.447l9.5 4.946v10.57zm1-.001v-10.567l5.067-2.608.029.015.021-.04 4.384-2.256v5.039c-.774-.488-1.686-.782-2.668-.782-2.773 0-5.024 2.252-5.024 5.024 0 1.686.838 3.171 2.113 4.083l-3.922 2.092zm6.833-2.149c-2.219 0-4.024-1.808-4.024-4.026s1.805-4.025 4.024-4.025c2.22 0 4.025 1.807 4.025 4.025 0 2.218-1.805 4.026-4.025 4.026zm-.364-3.333l-1.306-1.147-.66.751 2.029 1.782 2.966-3.12-.725-.689-2.304 2.423zm-16.371-10.85l4.349-2.372 9.534 4.964-4.479 2.305-9.404-4.897zm9.4-5.127l9.404 5.186-3.832 1.972-9.565-4.98 3.993-2.178z",
  },
  {
    id: 2,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Security & Permissions",
    description:
      "Data is private by default; share selectively via 'realms', roles, and members with fine-grained access control.",
    keyPoints: [
      "Private by default",
      "Flexible sharing with realms",
      "Role-based permissions",
    ],
    svgPath:
      "M12 0c-3.371 2.866-5.484 3-9 3v11.535c0 4.603 3.203 5.804 9 9.465 5.797-3.661 9-4.862 9-9.465v-11.535c-3.516 0-5.629-.134-9-3zm0 1.292c2.942 2.31 5.12 2.655 8 2.701v10.542c0 3.891-2.638 4.943-8 8.284-5.375-3.35-8-4.414-8-8.284v-10.542c2.88-.046 5.058-.391 8-2.701zm5 7.739l-5.992 6.623-3.672-3.931.701-.683 3.008 3.184 5.227-5.878.728.685z",
  },
  {
    id: 3,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Developer Experience",
    description:
      "Start free with OTP login out-of-the-box, scale up as users grow; manage seats in Cloud Manager with transparent pricing.",
    keyPoints: [
      "Free tier for getting started",
      "Built-in authentication",
      "Simple scaling model",
    ],
    svgPath:
      "M6.676 9.18c-1.426-.009-3.217.764-4.583 2.13-.521.521-.979 1.129-1.333 1.812 1.232-.933 2.547-1.225 4.086-.361.453-1.199 1.056-2.418 1.83-3.581zm8.154 8.143c-1.264.826-2.506 1.422-3.581 1.842.863 1.54.571 2.853-.361 4.085.684-.353 1.291-.812 1.812-1.334 1.37-1.369 2.144-3.165 2.13-4.593zm5.127-13.288c-.344-.024-.681-.035-1.011-.035-7.169 0-11.249 5.465-12.733 9.86l3.939 3.94c4.525-1.62 9.848-5.549 9.848-12.642 0-.366-.014-.74-.043-1.123zm-8.24 8.258c-.326-.325-.326-.853 0-1.178.325-.326.853-.326 1.178 0 .326.326.326.853 0 1.178-.326.326-.853.326-1.178 0zm2.356-2.356c-.651-.65-.651-1.706 0-2.357s1.706-.651 2.356 0c.651.651.651 1.706 0 2.357-.65.65-1.704.65-2.356 0zm-12.432 10.378l-.755-.755 4.34-4.323.755.755-4.34 4.323zm4.149 1.547l-.755-.755 3.029-3.054.755.755-3.029 3.054zm-5.035 2.138l-.755-.755 5.373-5.364.756.755-5.374 5.364zm21.083-14.291c-.188.618-.673 1.102-1.291 1.291.618.188 1.103.672 1.291 1.291.189-.619.673-1.103 1.291-1.291-.618-.188-1.102-.672-1.291-1.291zm-14.655-6.504c-.247.81-.881 1.443-1.69 1.69.81.247 1.443.881 1.69 1.69.248-.809.881-1.443 1.69-1.69-.81-.247-1.442-.88-1.69-1.69zm-1.827-3.205c-.199.649-.706 1.157-1.356 1.355.65.199 1.157.707 1.356 1.355.198-.649.706-1.157 1.354-1.355-.648-.198-1.155-.706-1.354-1.355zm5.387 0c-.316 1.035-1.127 1.846-2.163 2.163 1.036.316 1.847 1.126 2.163 2.163.316-1.036 1.127-1.846 2.162-2.163-1.035-.317-1.845-1.128-2.162-2.163zm11.095 13.64c-.316 1.036-1.127 1.846-2.163 2.163 1.036.316 1.847 1.162 2.163 2.197.316-1.036 1.127-1.881 2.162-2.197-1.035-.317-1.846-1.127-2.162-2.163z",
  },
  {
    id: 4,
    className: "col-md-6 col-lg-4 d-flex align-items-stretch mb-sm-30",
    title: "Deployment Flexibility",
    description:
      "Run as SaaS or self-hosted (Node.js + PostgreSQL) when you need full control over your infrastructure.",
    keyPoints: [
      "SaaS for simplicity",
      "Self-hosted option available",
      "Full infrastructure control",
      "Full source code access available",
    ],
    svgPath:
      "M22 9.74l-2 1.02v7.24c-1.007 2.041-5.606 3-8.5 3-3.175 0-7.389-.994-8.5-3v-7.796l-3-1.896 12-5.308 11 6.231v8.769l1 3h-3l1-3v-8.26zm-18 1.095v6.873c.958 1.28 4.217 2.292 7.5 2.292 2.894 0 6.589-.959 7.5-2.269v-6.462l-7.923 4.039-7.077-4.473zm-1.881-2.371l9.011 5.694 9.759-4.974-8.944-5.066-9.826 4.346z",
  },
]

// Testimonials for product page
const productTestimonials: TestimonialItem[] = [
  {
    author: "Dusty Phillips",
    role: "Founder of Fablehenge",
    image: "/api/placeholder/80/80",
    quote:
      "Dexie Cloud makes offline-first and sync effortless. Perfect for app-like experiences where users work with their own data and share selected parts.",
  },
  {
    author: "David Fahlander",
    role: "Creator of Dexie.js",
    image: "/api/placeholder/80/80",
    quote:
      "With Dexie, we've made IndexedDB accessible to all web developers. No more complex database operations or callback complexity.",
  },
  {
    author: "Alba Rincon",
    role: "Full-stack Developer",
    image: "/api/placeholder/80/80",
    quote:
      "The developer experience is outstanding. From local storage to global sync with just an addon – no backend required.",
  },
]

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
    name: "Dexie Cloud",
    logo: "/assets/favicon/favicon-white.svg",
    zoom: 0.85,
    commandLineCode: `npx dexie-cloud create
npx dexie-cloud whitelist http://localhost:3000
npm install dexie@latest
npm install dexie-cloud-addon`,
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
  display: "flex",
  alignItems: "center",
  height: "90vh",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    opacity: 0.9,
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
            The smarter way to use
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
              zoom: 0.9,
            }}
          >
            {frameworkExamples
              .filter((f) => f.id !== "sync")
              .map((framework) => (
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

            {/* Progression indicator */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: 2,
                opacity: 0.6,
              }}
            >
              <ArrowForwardIcon sx={{ fontSize: 24, color: "white" }} />
            </Box>

            {/* Cloud functionality */}
            <Box>
              {frameworkExamples
                .filter((f) => f.id === "sync")
                .map((framework) => (
                  <FrameworkCard
                    key={framework.id}
                    className={
                      selectedFramework === framework.id ? "active" : ""
                    }
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
        </Box>

        {/* Right side - Code example */}
        <Box sx={{ flex: 1, mt: -5, maxWidth: { md: "50%" } }}>
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
              {currentExample?.id === "sync" &&
                currentExample.commandLineCode && (
                  <>
                    <CodeBlock
                      language="bash"
                      showLineNumbers={false}
                      commandLine={true}
                      commandPrompt="~/web-app $"
                      code={currentExample.commandLineCode}
                    />
                    <CodeBlock
                      language="javascript"
                      showLineNumbers={true}
                      code={currentExample?.code || frameworkExamples[0].code}
                    />
                  </>
                )}
              {currentExample?.id !== "sync" && (
                <CodeBlock
                  language="javascript"
                  showLineNumbers={true}
                  code={currentExample?.code || frameworkExamples[0].code}
                />
              )}
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
      {/* Custom Product Hero with Framework Examples - Keep as requested */}
      <CustomProductHero />

      {/* Why Dexie.js? Benefits Section */}
      <Benefits
        items={dexieJsBenefits}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "What is Dexie.js?",
          sectionSubtitle: "The Smarter Way to Use IndexedDB",
        }}
      />

      <Divider />

      {/* Why Dexie Cloud? Benefits Section */}
      <Benefits
        items={dexieCloudBenefits}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "What is Dexie Cloud?",
          sectionSubtitle: "Offline-First Sync Without the Complexity",
        }}
      />

      <Divider />

      {/* Getting Started Guides */}
      <BlogPostsWidget
        items={blogPostsData}
        sectionTitle="Get Started in minutes"
        sectionSubtitle="From local storage to global sync - choose your path"
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />

      {/* Call to Action */}
      <CallToActionWidget
        text="Ready to build offline-first apps? Start with Dexie.js for local storage, add Dexie Cloud when you need sync, auth, and collaboration. No backend required."
        buttonText="Start Building"
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />

      <Divider />

      {/* FAQ Section - Simple content section */}
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          px: 3,
          py: 8,
          backgroundColor: "#000000",
          color: "#dee2e6",
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          textAlign="center"
          sx={{ mb: 6 }}
        >
          Frequently Asked Questions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
              Do I need to rewrite my Dexie code for Cloud?
            </Typography>
            <Typography variant="body1" paragraph>
              No – you configure dexie-cloud-addon and continue using your
              tables/queries. Sync is handled under the hood.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
              How do I avoid conflicts?
            </Typography>
            <Typography variant="body1" paragraph>
              Use string-based stable IDs (@id/GUID), avoid ++id. Follow our
              &quot;Best Practices&quot; guide for conflict-free sync.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
              Do I need a service worker?
            </Typography>
            <Typography variant="body1" paragraph>
              No, but PWA/SW improves the experience when offline and during
              reconnection. Dexie Cloud works with or without.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
              Is Cloud suitable for public catalog search?
            </Typography>
            <Typography variant="body1" paragraph>
              Cloud excels for personally created data + selective sharing;
              enormous public catalogs are a less ideal match.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
              When do I need Dexie Cloud vs. just Dexie.js?
            </Typography>
            <Typography variant="body1" paragraph>
              Use only Dexie.js for fully local apps. Add Cloud when you want
              multi-device sync, collaboration, authentication, or secure
              sharing.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
              What&apos;s the deployment model?
            </Typography>
            <Typography variant="body1" paragraph>
              SaaS for simplicity, or self-hosted (Node.js + PostgreSQL) when
              you need full infrastructure control.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
