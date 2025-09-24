import HeroWidget from "@/components/content/hero/HeroWidget"
import HeroContent from "@/components/content/hero/HeroContent"
import Brands from "@/components/content/hero/Brands"
import Benefits, {
  BenefitItem,
} from "@/components/content/Benefits/BenefitsWidget"
import BlogPostsWidget, {
  BlogPostItem,
} from "@/components/content/BlogPostsWidget"
import TestimonialsWidget, {
  TestimonialItem,
} from "@/components/content/TestimonialsWidget"
import CallToActionWidget from "@/components/content/CallToActionWidget"
import HackathonWidget from "@/components/content/HackathonWidget"
import FeatureScreenshotWidget from "@/components/content/FeatureScreenshotWidget"
import TypeWriter from "@/components/content/shared/TypeWriter"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Divider } from "@mui/material"

const dexieBenefitsData: BenefitItem[] = [
  {
    id: 1,
    className: "col-md-4 col-lg-3 d-flex align-items-stretch mb-sm-30",
    title: "Local-first Storage",
    description:
      "Starts with powerful IndexedDB — the built-in, offline-ready database for the browser.",
    keyPoints: [
      "Instant access, no setup",
      "Runs on web, mobile, embedded",
      "Single-user to multi-user sync",
    ],
    svgPath:
      "M21.62 20.196c1.055-.922 1.737-2.262 1.737-3.772 0-1.321-.521-2.515-1.357-3.412v-6.946l-11.001-6.066-11 6v12.131l11 5.869 5.468-2.917c.578.231 1.205.367 1.865.367.903 0 1.739-.258 2.471-.676l2.394 3.226.803-.596-2.38-3.208zm-11.121 2.404l-9.5-5.069v-10.447l9.5 4.946v10.57zm1-.001v-10.567l5.067-2.608.029.015.021-.04 4.384-2.256v5.039c-.774-.488-1.686-.782-2.668-.782-2.773 0-5.024 2.252-5.024 5.024 0 1.686.838 3.171 2.113 4.083l-3.922 2.092zm6.833-2.149c-2.219 0-4.024-1.808-4.024-4.026s1.805-4.025 4.024-4.025c2.22 0 4.025 1.807 4.025 4.025 0 2.218-1.805 4.026-4.025 4.026zm-.364-3.333l-1.306-1.147-.66.751 2.029 1.782 2.966-3.12-.725-.689-2.304 2.423zm-16.371-10.85l4.349-2.372 9.534 4.964-4.479 2.305-9.404-4.897zm9.4-5.127l9.404 5.186-3.832 1.972-9.565-4.98 3.993-2.178z",
  },
  {
    id: 2,
    className: "col-md-4 col-lg-3 d-flex align-items-stretch mb-sm-30",
    title: "Cloud Storage",
    description:
      "Store and access files and data directly from the frontend — no servers to maintain.",
    keyPoints: [
      "Unlimited storage & databases",
      "Store data, files and Yjs documents",
      "Per-object access control",
    ],
    svgPath:
      "M6.676 9.18c-1.426-.009-3.217.764-4.583 2.13-.521.521-.979 1.129-1.333 1.812 1.232-.933 2.547-1.225 4.086-.361.453-1.199 1.056-2.418 1.83-3.581zm8.154 8.143c-1.264.826-2.506 1.422-3.581 1.842.863 1.54.571 2.853-.361 4.085.684-.353 1.291-.812 1.812-1.334 1.37-1.369 2.144-3.165 2.13-4.593zm5.127-13.288c-.344-.024-.681-.035-1.011-.035-7.169 0-11.249 5.465-12.733 9.86l3.939 3.94c4.525-1.62 9.848-5.549 9.848-12.642 0-.366-.014-.74-.043-1.123zm-8.24 8.258c-.326-.325-.326-.853 0-1.178.325-.326.853-.326 1.178 0 .326.326.326.853 0 1.178-.326.326-.853.326-1.178 0zm2.356-2.356c-.651-.65-.651-1.706 0-2.357s1.706-.651 2.356 0c.651.651.651 1.706 0 2.357-.65.65-1.704.65-2.356 0zm-12.432 10.378l-.755-.755 4.34-4.323.755.755-4.34 4.323zm4.149 1.547l-.755-.755 3.029-3.054.755.755-3.029 3.054zm-5.035 2.138l-.755-.755 5.373-5.364.756.755-5.374 5.364zm21.083-14.291c-.188.618-.673 1.102-1.291 1.291.618.188 1.103.672 1.291 1.291.189-.619.673-1.103 1.291-1.291-.618-.188-1.102-.672-1.291-1.291zm-14.655-6.504c-.247.81-.881 1.443-1.69 1.69.81.247 1.443.881 1.69 1.69.248-.809.881-1.443 1.69-1.69-.81-.247-1.442-.88-1.69-1.69zm-1.827-3.205c-.199.649-.706 1.157-1.356 1.355.65.199 1.157.707 1.356 1.355.198-.649.706-1.157 1.354-1.355-.648-.198-1.155-.706-1.354-1.355zm5.387 0c-.316 1.035-1.127 1.846-2.163 2.163 1.036.316 1.847 1.126 2.163 2.163.316-1.036 1.127-1.846 2.162-2.163-1.035-.317-1.845-1.128-2.162-2.163zm11.095 13.64c-.316 1.036-1.127 1.846-2.163 2.163 1.036.316 1.847 1.162 2.163 2.197.316-1.036 1.127-1.881 2.162-2.197-1.035-.317-1.846-1.127-2.162-2.163z",
  },
  {
    id: 3,
    className: "col-md-4 col-lg-3 d-flex align-items-stretch mb-sm-30",
    title: "Authentication",
    description:
      "Built-in user management and login. Optimized for hybrid applications on all platforms.",
    keyPoints: [
      "No cookie or session management",
      "Oauth and custom login support",
      "Secure, token-based authentication ",
    ],
    svgPath:
      "M12 0c-3.371 2.866-5.484 3-9 3v11.535c0 4.603 3.203 5.804 9 9.465 5.797-3.661 9-4.862 9-9.465v-11.535c-3.516 0-5.629-.134-9-3zm0 1.292c2.942 2.31 5.12 2.655 8 2.701v10.542c0 3.891-2.638 4.943-8 8.284-5.375-3.35-8-4.414-8-8.284v-10.542c2.88-.046 5.058-.391 8-2.701zm5 7.739l-5.992 6.623-3.672-3.931.701-.683 3.008 3.184 5.227-5.878.728.685z",
  },
  {
    id: 4,
    className: "col-md-4 col-lg-3 d-flex align-items-stretch mb-sm-30",
    title: "Sync & Realtime",
    description:
      "Effortlessly sync and share data in real-time across all devices.",
    keyPoints: [
      "Instant data synchronization",
      "Collaborative editing and sharing",
      "Conflict-free data updates",
    ],
    svgPath:
      "M24 19h-1v-2.2c-1.853 4.237-6.083 7.2-11 7.2-6.623 0-12-5.377-12-12h1c0 6.071 4.929 11 11 11 4.66 0 8.647-2.904 10.249-7h-2.249v-1h4v4zm-10.772 0h-2.457c-.448-1.286-.489-1.599-.931-1.781-.468-.193-.77.044-1.922.598l-1.736-1.735c.587-1.217.786-1.473.6-1.922-.188-.451-.528-.495-1.782-.932v-2.457c1.285-.448 1.598-.488 1.782-.932.192-.465-.04-.758-.6-1.921l1.736-1.736c1.163.561 1.467.792 1.921.6.46-.191.505-.556.932-1.782h2.457c.449 1.287.49 1.599.932 1.781.466.194.776-.045 1.922-.599l1.735 1.736c-.581 1.208-.784 1.473-.599 1.921.191.46.556.505 1.782.932v2.457c-1.27.442-1.597.487-1.782.933-.187.452.022.722.599 1.921l-1.735 1.735c-1.096-.526-1.452-.798-1.916-.601-.465.193-.508.553-.938 1.784zm-.71-13h-1.036c-.243.722-.462 1.375-1.26 1.705-.744.31-1.383.032-2.098-.314l-.733.733c.363.74.644 1.303.315 2.098-.343.827-.969.991-1.706 1.259v1.046c.723.244 1.375.453 1.706 1.25.332.802.033 1.378-.315 2.1l.733.731c.711-.348 1.355-.622 2.098-.314.757.314 1.011.909 1.259 1.706h1.029c.244-.723.471-1.375 1.272-1.708.773-.32 1.4-.01 2.094.316l.731-.732c-.336-.724-.656-1.268-.313-2.098.344-.828.963-.985 1.706-1.26v-1.036c-.724-.243-1.375-.463-1.706-1.26-.33-.798-.044-1.367.315-2.098l-.732-.733c-.715.344-1.345.627-2.099.315-.789-.327-.994-.922-1.26-1.706zm-.539 8.5c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm-7.979-1.5h-4v-4h1v2.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12h-1c0-6.071-4.929-11-11-11-4.66 0-8.647 2.904-10.249 7h2.249v1z",
  },
  {
    id: 5,
    className: "col-md-4 col-lg-3 d-flex align-items-stretch mb-sm-30",
    title: "Cross-platform",
    description: "Write once — run anywhere JavaScript runs.",
    keyPoints: [
      "Web",
      "Mobile (PWA, Capacitor, Tauri)",
      "Desktop (Electron, NW.js)",
      "Embedded (Node.js, React Native)",
    ],
    svgPath:
      "M17.517 10.012c.151.23.087.541-.144.692l-2.2 1.444c-.085.056-.179.082-.274.082-.162 0-.322-.079-.418-.225-.152-.231-.087-.541.143-.692l2.201-1.445c.23-.151.541-.089.692.144m-6.242-2.595l1.111-2.385c.116-.252.414-.36.664-.243.25.117.36.413.242.664l-1.111 2.386c-.085.181-.265.288-.453.288l-.211-.047c-.25-.115-.359-.413-.242-.663m-2.624.613c1.377-2.652 1.484-5.104.318-7.286-.178-.333.066-.734.441-.734.177 0 .351.095.442.264 1.33 2.49 1.225 5.254-.314 8.217-.089.171-.263.269-.444.269-.078 0-.156-.018-.23-.056-.245-.127-.341-.429-.213-.674m15.349 5.526c0 .352-.351.588-.671.47-2.808-1.028-5.254-.821-7.271.611-.088.063-.189.093-.29.093-.155 0-.309-.073-.406-.21-.16-.224-.108-.537.117-.696 2.301-1.637 5.059-1.884 8.193-.737.203.074.328.266.328.469m-16.484-2.608l2.865 7.517-2.248.964-2.753-7.512.778-2.176 1.358 1.207zm3.785 7.124l-2.168-5.687 5.025 4.463-2.857 1.224zm-8.27.419l.989 2.699-2.307.989 1.318-3.688zm1.823-5.103l2.358 6.435-2.271.973-1.384-3.777 1.297-3.631zm-4.853 10.612l15.997-6.853-10.283-9.137-5.714 15.99zm20.46-15.629l.552-.694.281.841.831.309-.713.528-.038.886-.723-.516-.854.238.268-.846-.491-.739.887-.007zm-1.384.885l-.639 2.019 2.041-.568 1.724 1.23.089-2.115 1.704-1.258-1.985-.739-.672-2.008-1.315 1.658-2.118.017 1.171 1.764zm-2.167-4.194c.593-.044.924-.141 1.074-.315.176-.204.226-.647.165-1.433-.023-.276.183-.517.459-.539.277-.016.515.18.537.456.063.806.059 1.62-.402 2.156-.429.499-1.13.602-1.76.647-.702.052-.72.243-.774.878-.056.67-.152 1.744-1.84 1.933-1.017.115-1.433.33-1.377 1.956.008.275-.207.325-.484.325h-.016c-.269 0-.491-.022-.5-.291-.049-1.461.191-2.655 2.265-2.887.874-.099.9-.404.956-1.072.054-.635.145-1.7 1.697-1.814m5.264-3.048c.454 0 .823.37.823.824 0 .454-.369.823-.823.823-.454 0-.824-.369-.824-.823 0-.454.37-.824.824-.824m0 2.647c1.006 0 1.823-.817 1.823-1.823s-.817-1.823-1.823-1.823c-1.007 0-1.824.817-1.824 1.823s.817 1.823 1.824 1.823m-8.446-3.662c.552 0 1 .449 1 .999 0 .551-.448.999-1 .999s-1-.448-1-.999c0-.55.448-.999 1-.999m0 2.998c1.103 0 1.999-.896 1.999-1.999 0-1.103-.896-1.998-1.999-1.998-1.104 0-2 .895-2 1.998s.896 1.999 2 1.999",
  },
  {
    id: 6,
    className: "col-md-4 col-lg-3 d-flex align-items-stretch mb-sm-30",
    title: "Any framework",
    description: "Works with any JavaScript framework or library.",
    keyPoints: ["React", "Vue", "Angular", "Svelte"],
    svgPath:
      "M22 9.74l-2 1.02v7.24c-1.007 2.041-5.606 3-8.5 3-3.175 0-7.389-.994-8.5-3v-7.796l-3-1.896 12-5.308 11 6.231v8.769l1 3h-3l1-3v-8.26zm-18 1.095v6.873c.958 1.28 4.217 2.292 7.5 2.292 2.894 0 6.589-.959 7.5-2.269v-6.462l-7.923 4.039-7.077-4.473zm-1.881-2.371l9.011 5.694 9.759-4.974-8.944-5.066-9.826 4.346z",
  },
]

export const blogPostsData: BlogPostItem[] = [
  {
    id: 1,
    delay: "0.1s",
    imgSrc: "/assets/images/blog/post-prev-1.jpg",
    title: "Dexie Cloud Vanilla",
    text: "The simplest possible Dexie Cloud application, built with vanilla JavaScript. It is a great starting point for building your own Dexie Cloud application.",
    authorImg: "/assets/images/blog/author/author-1.jpg",
    authorName: "Adam Smith",
    date: "August 3",
    link: "https://stackblitz.com/edit/dexie-todo-list?file=components%2FTodoListView.tsx",
    keyPoints: [
      "Any JavaScript framework",
      "Lightweight and simple",
      "Perfect for chrome extensions",
      "Works with fake-indexeddb",
      "Build-in authentication",
    ],
  },
  {
    id: 2,
    delay: "0.1s",
    imgSrc: "/assets/images/blog/post-prev-1.jpg",
    title: "Dexie Cloud Starter",
    text: "Dexie Cloud Starter is a fully functional showcase application. Inspired by the popular MyMind app, it demonstrates how to build a collaborative note-taking application using Dexie Cloud.",
    authorImg: "/assets/images/blog/author/author-1.jpg",
    authorName: "Adam Smith",
    date: "August 3",
    link: "https://github.com/dexie/dexie-cloud-starter",
    keyPoints: [
      "NextJS and TypeScript",
      "Offline storage and sync",
      "Conflict-free rich text editing",
      "Tiptap and Y.js",
      "Image upload and storage",
      "Collaborative editing and awareness",
      "Full text search in notes",
      "Full sharing support",
    ],
  },
  {
    id: 3,
    delay: "0.1s",
    imgSrc: "/assets/images/blog/post-prev-1.jpg",
    title: "Sveltekit Dexie-boilerplate",
    text: "An example of a Dexie Cloud application built with Svelte. It is a great starting point for building your own Dexie Cloud application using Svelte.",
    authorImg: "/assets/images/blog/author/author-1.jpg",
    authorName: "Adam Smith",
    date: "August 3",
    link: "https://github.com/albarin/sveltekit-dexie-boilerplate",
    keyPoints: ["Svelte framework", "Build-in authentication"],
  },
]

// Testimonials data
const testimonials: TestimonialItem[] = [
  {
    author: "David Fahlander",
    role: "Founder of Dexie.js",
    image: "/api/placeholder/80/80",
    quote:
      "With Dexie, we've made IndexedDB accessible to all web developers. No more complex database operations.",
  },
  {
    author: "Alba Rincon",
    role: "Founder of Routickr",
    image: "/api/placeholder/80/80",
    quote:
      "Integrating Dexie Cloud was seamless. Sync and auth worked in minutes, and the docs made everything easy.",
  },
  {
    author: "Dusty Phillips",
    role: "Founder of Fablehenge",
    image: "/api/placeholder/80/80",
    quote:
      "Dexie Cloud makes offline-first and sync effortless. It’s the perfect abstraction for a small team to ship big features.",
  },
  {
    author: "Anton Andreasson",
    role: "Founder of Birdlist",
    image: "/api/placeholder/80/80",
    quote:
      "Dexie Cloud made sharing bird lists and managing invites simple. It’s fast, reliable, and easy to use.",
  },
  {
    author: "Bennie Forss",
    role: "Founder of Zenta AB",
    image: "/api/placeholder/80/80",
    quote:
      "What truly sets Dexie Cloud apart is its ability to unleash productivity and nurturing creativity. Unlike other platforms, Dexie Cloud doesn't confine our visions; it expands them.",
  },
]

// Hackathon winners data
const hackathonWinners = [
  {
    id: 1,
    name: "lkalma",
    place: "🏆 1st Place",
    title: "lkalma",
    subtitle: "Collaborative Whiteboard with AI Integration",
    description:
      "A collaborative whiteboard app designed for seamless creativity, both online and offline. Built on top of the powerful drawing library tldraw.dev combined with Dexie Cloud for sync and local-first storage.",
    features: [
      "Real-time collaboration with teammates",
      "Offline-first architecture for uninterrupted work",
      "AI-driven image and text generation via Pollinations.ai",
      "Seamless synchronization across all devices",
    ],
    award: "One On-Prem Gold license + Exposure (Value: $7,995)",
    demoUrl: "https://lkal.ma/",
    buttonText: "Live Demo",
    imageUrl:
      "https://dexie.org/assets/images/hackathon/winners/lkalma-preview.png",
    imageAlt: "lkalma Collaborative Whiteboard Preview",
  },
  {
    id: 2,
    name: "Workflows",
    place: "🥈 2nd Place",
    title: "Workflows",
    subtitle: "Structured Activity Improvement Tool",
    description:
      "An innovative tool aimed at refining and improving repeatable activities, such as habits, recipes, or professional processes.",
    features: [
      "Customizable workflow templates",
      "Offline functionality for constant access",
      "Detailed tracking of activities and outcomes",
      "Seamless synchronization across devices",
    ],
    award: "1,000 Dexie Cloud seats for 12 months + Exposure (Value: $1,320)",
    demoUrl: "https://workflows-svelte.statichost.eu/",
    buttonText: "Live Demo",
    imageUrl:
      "https://dexie.org/assets/images/hackathon/winners/workflows-preview.png",
    imageAlt: "Workflows Activity Improvement Tool Preview",
  },
  {
    id: 3,
    name: "CoTaskAI",
    place: "🥉 3rd Place",
    title: "CoTaskAI",
    subtitle: "AI-Powered Browser Extension",
    description:
      "A powerful Chrome extension leveraging advanced natural language AI to analyze web pages and PDF documents directly from your browser.",
    features: [
      "Instant analysis with context-aware insights",
      "Advanced multi-model AI integration",
      "Offline capabilities with Dexie.js",
      "Privacy-focused design",
    ],
    award: "100 Dexie Cloud seats for 12 months + Exposure (Value: $132)",
    demoUrl:
      "https://chrome.google.com/webstore/detail/hifbaagbmobldofjdhnpgkpjgkjeamio",
    buttonText: "Install Extension",
    imageUrl: "https://dexie.org/assets/hackathon/cotaskai-preview.jpg",
    videoUrl:
      "https://drive.google.com/file/d/1tPkse49qIm241F7AplDe9ZpOdZOV0ZxX/preview",
    imageAlt: "CoTaskAI Browser Extension Preview",
  },
  {
    id: 4,
    name: "Startup ToolKit",
    place: "🏅 4th Place",
    title: "Startup ToolKit",
    subtitle: "Essential Tools for Early-Stage Startups",
    description:
      "Comprehensive set of essential tools for startups with limited budgets—including CRM, KPIs tracking, and roadmap management.",
    features: [
      "Free for single-device usage",
      "Offline-first design with minimal cloud dependency",
      "Comprehensive suite of essential business tools",
      "Extremely low operational costs",
    ],
    award: "100 Dexie Cloud seats for 12 months + Exposure (Value: $132)",
    demoUrl: "https://startuptk.com/",
    buttonText: "Live Demo",
    imageUrl:
      "https://dexie.org/assets/images/hackathon/winners/startup-toolkit-preview.png",
    imageAlt: "Startup ToolKit Preview",
  },
]

// Feature screenshot slides data
const featureScreenshotSlides = [
  {
    id: 1,
    title: "Custom optimized onboarding with Dexie Auth",
    description:
      "Complete user authentication with passwordless login and OAuth providers. What typically requires complex backend setup and multiple services is handled entirely by Dexie Auth with no backend needed.",
    imageUrl: "/assets/images/feature-screenshots/login.png",
    imageAlt: "Dexie login page",
    features: [
      {
        id: 1,
        number: "1",
        title: "Branded Login Experience",
        description:
          "The login screen adapts to the brand while maintaining security standards. Built-in components handle validation and error states automatically.",
        position: { x: 5, y: 8 },
      },
      {
        id: 2,
        number: "2",
        title: "Magic Link Authentication",
        description:
          "Passwordless login with custom email templates gives users branded magic links with no password management complexity.",
        position: { x: 50, y: 44.5 },
      },
      {
        id: 3,
        number: "3",
        title: "Social Login Integration",
        description:
          "Google, Microsoft, and GitHub login options work seamlessly across all platforms with automatic token management.",
        position: { x: 50, y: 58 },
      },
    ],
  },
  {
    id: 2,
    title: "Dexie´s built-in sharing & collaboration",
    description:
      "Leverages Dexie's built-in sharing system with realms for seamless collaboration. No complex permission systems to build - just simple JavaScript objects control who can access what.",
    imageUrl: "/assets/images/feature-screenshots/share.png",
    imageAlt: "Task sharing interface showing collaboration features",
    features: [
      {
        id: 6,
        number: "1",
        title: "Per-Object Access Control",
        description:
          "Dexie's realm system allows each task to be private, shared with teams, or public - all controlled by simple JavaScript objects.",
        position: { x: 28, y: 11.5 },
      },
      {
        id: 7,
        number: "2",
        title: "Instant Collaboration",
        description:
          "When projects are shared, team members receive built-in invitation emails and in-app notifications. Real-time updates follow automatically with no complex APIs to manage.",
        position: { x: 36, y: 64 },
      },
      {
        id: 8,
        number: "3",
        title: "Zero Setup Sharing",
        description:
          "Sharing works out of the box with Dexie Cloud. No servers, no permission databases, no backend complexity - just built-in collaborative features.",
        position: { x: 64, y: 83 },
      },
    ],
  },
  {
    id: 3,
    title: "Dexie liveQuery and Redux",
    description:
      "Combines Dexie's reactive queries with Redux for optimal performance. Using useLiveQuery for real-time UI updates, RxJS liveQuery for complex data flows, and optimistic state management for instant user feedback.",
    imageUrl: "/assets/images/feature-screenshots/today.png",
    imageAlt: "Reactive interface showing live data updates",
    features: [
      {
        id: 3,
        number: "1",
        title: "Reactive Live Queries",
        description:
          "useLiveQuery hooks provide automatic UI updates when data changes, combined with RxJS liveQuery for complex reactive data flows and subscriptions.",
        position: { x: 17, y: 10 },
      },
      {
        id: 4,
        number: "2",
        title: "Optimistic Updates",
        description:
          "Optimistic state with Redux delivers instant UI feedback. Changes appear immediately while syncing with Dexie Cloud in the background.",
        position: { x: 72, y: 40 },
      },
      {
        id: 5,
        number: "3",
        title: "Offline-First Architecture",
        description:
          "Dexie's offline-first approach with smart state management ensures all operations work locally first, then sync seamlessly when online.",
        position: { x: 25, y: 90 },
      },
    ],
  },
  {
    id: 4,
    title: "Account and payment",
    description:
      "Manage user accounts, subscriptions, and payment methods seamlessly with Dexie Cloud.",
    imageUrl: "/assets/images/feature-screenshots/account.png",
    imageAlt:
      "Account management interface showing user details and payment options",
    features: [
      {
        id: 3,
        number: "1",
        title: "Built-in Evaluation Policies",
        description:
          "Flexible evaluation periods with pausable or fixed duration options. Control how new users experience your app with customizable trial periods up to 30 days.",
        position: { x: 36, y: 27 },
      },
      {
        id: 4,
        number: "2",
        title: "Multi-Platform Payment Integration",
        description:
          "Seamless integration with Stripe for web payments and RevenueCat for iOS and Android subscriptions, enabling unified payment handling across all platforms.",
        position: { x: 63, y: 67 },
      },
      {
        id: 5,
        number: "3",
        title: "Smart User Management Policies",
        description:
          "Configure how new users are handled - from automatic evaluation accounts to domain-based production access, or webhook-driven custom logic for user onboarding.",
        position: { x: 50, y: 88 },
      },
    ],
  },
  {
    id: 5,
    title: "Dashboard using Dexie's API",
    description:
      "Built a comprehensive analytics dashboard using Dexie's API to monitor user growth, app performance, and production metrics. Essential insights without complex analytics infrastructure.",
    imageUrl: "/assets/images/feature-screenshots/dashboard.png",
    imageAlt: "Analytics dashboard showing user metrics and performance data",
    features: [
      {
        id: 3,
        number: "1",
        title: "User Growth Tracking",
        description:
          "Monitoring new user registrations, active users, and retention metrics directly through Dexie's built-in analytics API.",
        position: { x: 20, y: 30 },
      },
      {
        id: 4,
        number: "2",
        title: "Production Monitoring",
        description:
          "Real-time tracking of app performance, sync success rates, and error monitoring across all production environments.",
        position: { x: 72, y: 45 },
      },
      {
        id: 5,
        number: "3",
        title: "Business Intelligence",
        description:
          "Valuable insights into user behavior and app usage patterns drive product decisions, all built into Dexie Cloud.",
        position: { x: 40, y: 85 },
      },
    ],
  },
]

export default function Home() {
  return (
    <>
      <HeroWidget
        preHeading={"Zero-config & no backend skills needed"}
        heading={
          <>
            Build fast, scale big <br />
            Dexie handles
            <TypeWriter
              colorClass=""
              strings={[
                "Sync",
                "Login",
                "Real-time",
                "Storage",
                "Offline Support",
                "Collaboration",
                "Everything",
              ]}
            />
          </>
        }
        text={
          "IndexedDB made simple. Add cloud sync for auth, storage, with real-time updates. One unified data layer across all platforms — no backend required. Truly offline-first."
        }
        background={"/assets/images/dexie-bg.jpg"}
        contentRight={<HeroContent />}
        contentRightWidthPercentage={45}
        contentBottom={
          <Brands
            sx={{
              padding: "0px !important",
            }}
          />
        }
        buttons={[
          {
            text: "Get Started",
            link: {
              url: "/get-started",
              querystring: "",
              title: "Get Started",
              target: "_self",
            },
            color: "primary",
            size: "large",
            variant: "contained",
          },
          {
            text: "How it works?",
            icon: <PlayArrowIcon />,
            link: {
              url: "/how-it-works",
              querystring: "",
              title: "How it works",
              target: "_self",
            },
            color: "primary",
            size: "large",
            variant: "text",
          },
        ]}
        settings={{
          height: "90vh",
          textColor: "#FFFFFF",
          overlayStrength: "80%",
          textWidth: "60%",
          containerWidth: "big",
        }}
      />
      <Benefits
        items={dexieBenefitsData}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Primary Benefits",
          sectionSubtitle: "Why use Dexie?",
        }}
      />
      <Divider />
      <TestimonialsWidget
        items={testimonials}
        settings={{
          textColor: "#dee2e6",
          backgroundColor: "#000000",
          containerWidth: "big",
          sectionTitle: "Dexie is trusted by",
          sectionSubtitle: "1,000,000+ developers.",
        }}
      />
      <Divider />
      <BlogPostsWidget
        items={blogPostsData}
        sectionTitle="Get started in minutes"
        sectionSubtitle="Accelerate your development with templates built by us and our community."
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />
      <CallToActionWidget
        text="The power of Dexie lies in turning complex data problems into simple scalable solutions. Reduce time to market and deliver offline-first, real-time apps faster than ever."
        buttonText="CONTACT US"
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />
      <Divider />
      <HackathonWidget
        sectionCaption="DGH25"
        sectionTitle="Winners of Dexie Global Hackathon 25"
        description="After eight inspiring weeks of innovation, collaboration, and creativity, we're thrilled to announce the outstanding winners who pushed the boundaries of what's possible with Dexie.js and Dexie Cloud!"
        winners={hackathonWinners}
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />
      <Divider />
      <FeatureScreenshotWidget
        sectionCaption="Features"
        sectionTitle="Built totally on Dexie"
        description="In To To-Do Dexie handles everything - authentication, real-time sync, file storage, and offline support. No backend setup, no separate services, no complexity."
        slides={featureScreenshotSlides}
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />
    </>
  )
}
