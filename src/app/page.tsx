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
      "M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-18.055c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256zm-6.023 5.02l-.495 3.473c.373.112.772.215 1.192.308l.505-3.535c-.414-.073-.816-.155-1.202-.246zm8.564.54l-.527 3.706c.429-.03.845-.071 1.251-.12l.529-3.722c-.409.054-.827.099-1.253.136zm2.197-.28l-.53 3.732c.439-.071.862-.153 1.266-.246l.532-3.743c-.407.097-.831.182-1.268.257zm-4.37.384l-.521 3.672c.428 0 .721 0 1.235-.02l.525-3.691c-.408.021-.822.034-1.239.039zm8.353 1.892c.813-.505 1.279-1.087 1.279-1.707v-2.439c-.23.16-.482.313-.755.458l-.524 3.688zm-16.819-3.168l-.468 3.26c.337.195.725.377 1.162.544l.487-3.407c-.395-.114-.804-.249-1.181-.397zm6.314 1.226l-.517 3.629c.399.033.808.057 1.224.073l.521-3.655c-.414-.007-.824-.023-1.228-.047zm-8.216-2.204v2.439c0 .415.21.813.592 1.183l.436-3.024c-.381-.187-.723-.386-1.028-.598zm6.085 1.997l-.51 3.569c.391.067.794.126 1.211.175l.514-3.605c-.413-.038-.819-.084-1.215-.139zm10.88-.636l-.533 3.748c.471-.138.904-.291 1.296-.457l.531-3.737c-.427.17-.808.303-1.294.446z",
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
      "M15 10c3.753 0 3.844 3.922 3.701 4.822 1.033.053 3.299.246 3.299 2.206 0 1.087-.953 1.972-2.125 1.972h-9.75c-1.172 0-2.125-.885-2.125-1.972 0-1.94 2.235-2.151 3.299-2.206-.127-.797-.171-4.822 3.701-4.822zm0-2c-3.004 0-5.45 2.268-5.609 5.123-1.928.333-3.391 1.954-3.391 3.905 0 2.193 1.848 3.972 4.125 3.972h9.75c2.277 0 4.125-1.779 4.125-3.972 0-1.951-1.463-3.572-3.391-3.905-.159-2.855-2.605-5.123-5.609-5.123zm-7.382 3.58c.766-2.932 3.325-5.126 6.445-5.502-.905-1.82-2.828-3.078-5.063-3.078-3.004 0-5.45 2.268-5.609 5.123-1.928.333-3.391 1.954-3.391 3.905 0 2.185 1.835 3.957 4.101 3.97.349-1.959 1.671-3.615 3.517-4.418z",
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
      "M12 2.644c2.965 2.238 6.457 3.004 8.912 3.25-.658 7.052-4.892 12.593-8.912 15.655-4.021-3.062-8.255-8.603-8.912-15.656 2.454-.245 5.947-1.011 8.912-3.249zm0-2.644c-2.996 2.995-7.486 4-11 4 0 8.583 5.067 16.097 11 20 5.932-3.903 11-11.417 11-20-3.515 0-8.006-1.005-11-4zm3.794 8l-4.381 4.475-2.215-2.123-1.237 1.239 3.452 3.362 5.619-5.715-1.238-1.238z",
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
      "M15.408 21h-9.908c-3.037 0-5.5-2.463-5.5-5.5 0-2.702 1.951-4.945 4.521-5.408.212-3.951 3.473-7.092 7.479-7.092 3.267 0 6.037 2.089 7.063 5.003l-.063-.003c-.681 0-1.336.102-1.958.283-.878-2.025-2.73-3.283-5.042-3.283-3.359 0-5.734 2.562-5.567 6.78-1.954-.113-4.433.923-4.433 3.72 0 1.93 1.57 3.5 3.5 3.5h7.76c.566.81 1.3 1.49 2.148 2zm2.257-8.669c.402-.206.852-.331 1.335-.331 1.455 0 2.67 1.042 2.941 2.418l1.96-.398c-.456-2.291-2.475-4.02-4.901-4.02-.957 0-1.845.278-2.604.745l-1.396-1.745-1 5h5l-1.335-1.669zm5.335 8.669l-1.396-1.745c-.759.467-1.647.745-2.604.745-2.426 0-4.445-1.729-4.901-4.02l1.96-.398c.271 1.376 1.486 2.418 2.941 2.418.483 0 .933-.125 1.335-.331l-1.335-1.669h5l-1 5z",
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
      "M22 10h-1v-2h-11v13h5v1.617c0 .524.121 1.058.502 1.383h-5.002c-.398 0-.779-.158-1.061-.439-.281-.282-.439-.663-.439-1.061v-15c0-.398.158-.779.439-1.061.282-.281.663-.439 1.061-.439h10c.398 0 .779.158 1.061.439.281.282.439.663.439 1.061v2.5zm2 2.25c0-.69-.56-1.25-1.25-1.25h-5.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h5.5c.69 0 1.25-.56 1.25-1.25v-10.5zm-15.407 11.75h-6.593l2.599-3h3.401v1.804c0 .579.337 1.09.593 1.196zm11.407-1c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm3-3v-6.024h-6v6.024h6zm-2-15h-2v-3h-17v15h6v2h-8v-19h21v5zm-.5 7h-1c-.276 0-.5.224-.5.5s.224.5.5.5h1c.275 0 .5-.224.5-.5s-.225-.5-.5-.5z",
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
        sectionCaption="Case study"
        sectionTitle="Built totally on Dexie"
        description="In the application totodo.app, Dexie handles everything - authentication, real-time sync, file storage, and offline support. No backend setup, no separate services, no complexity."
        slides={featureScreenshotSlides}
        textColor="#dee2e6"
        backgroundColor="#000000"
        containerWidth="big"
      />
    </>
  )
}
