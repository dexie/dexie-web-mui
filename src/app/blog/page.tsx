import { Metadata } from "next"
import BlogListClient from "./BlogListClient"

export const metadata: Metadata = {
  title: "Blog - Dexie.js | IndexedDB Tutorials, Tips & Updates",
  description:
    "Read the latest articles about Dexie.js, IndexedDB, offline-first web development, and modern JavaScript database techniques. Learn tips, best practices, and stay updated with the Dexie community.",
  keywords: [
    "Dexie.js blog",
    "IndexedDB tutorials",
    "offline-first development",
    "JavaScript database",
    "web storage",
    "Progressive Web Apps",
    "PWA tutorials",
    "Dexie.js examples",
  ],
  openGraph: {
    title: "Dexie.js Blog - IndexedDB Tutorials & Tips",
    description:
      "Discover tutorials, tips, and updates about Dexie.js and modern web database development.",
    type: "website",
    url: "https://dexie.org/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dexie.js Blog",
    description:
      "Tutorials, tips, and updates about Dexie.js and IndexedDB development",
  },
}

export default function BlogPage() {
  return <BlogListClient />
}
