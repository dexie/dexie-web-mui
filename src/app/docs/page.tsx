import type { Metadata } from "next"
import DocsLayout from "@/components/content/docs/DocsLayout"
import DocsHomePage from "@/components/content/docs/DocsHomePage"
import {
  getDocumentBySlug,
  serializeMarkdown,
  generateNavigation,
} from "@/utils/mdx"

export const metadata: Metadata = {
  title:
    "Dexie.js Documentation - Complete Guide to IndexedDB & Offline-First Development",
  description:
    "Complete Dexie.js documentation: IndexedDB tutorials, API reference, offline-first patterns, and Dexie Cloud sync guides. Learn to build fast, offline web applications with React, Vue, Angular, and more.",
  keywords: [
    "dexie.js documentation",
    "indexeddb tutorial",
    "offline first tutorial",
    "dexie api reference",
    "javascript database tutorial",
    "browser database guide",
    "offline sync tutorial",
    "react offline tutorial",
    "vue offline guide",
    "angular offline storage",
    "progressive web app tutorial",
    "local first development guide",
    "client side database tutorial",
    "indexeddb wrapper guide",
    "offline storage tutorial",
    "real time sync guide",
    "collaborative apps tutorial",
  ],
  openGraph: {
    title: "Dexie.js Documentation - Master Offline-First Development",
    description:
      "Complete tutorials and API reference for building offline-first web applications with IndexedDB and real-time sync.",
    url: "https://dexie.org/docs",
    images: [
      {
        url: "/assets/images/dexie-docs-og.jpg",
        width: 1200,
        height: 630,
        alt: "Dexie.js Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dexie.js Documentation - Complete Guide",
    description:
      "Master offline-first development with complete tutorials and API reference for IndexedDB and sync.",
    images: ["/assets/images/dexie-docs-og.jpg"],
  },
  alternates: {
    canonical: "https://dexie.org/docs",
  },
}

export default async function DocsHomePageWrapper() {
  // Läs index.md från docs mappen
  const indexDoc = getDocumentBySlug("index", "docs")
  const indexContent = indexDoc
    ? await serializeMarkdown(indexDoc.content)
    : undefined

  // Generate navigation on the server
  const navigation = generateNavigation()

  // Create a wrapped Layout component that includes navigation
  const LayoutWithNavigation = ({
    children,
    currentSlug,
    pageTitle,
  }: {
    children: React.ReactNode
    currentSlug?: string
    pageTitle?: string
  }) => (
    <DocsLayout
      navigation={navigation}
      currentSlug={currentSlug}
      pageTitle={pageTitle}
    >
      {children}
    </DocsLayout>
  )

  return (
    <DocsHomePage
      source="docs"
      title={indexDoc?.metadata.title || "Docs Home"}
      description=""
      basePath="/docs"
      Layout={LayoutWithNavigation}
      useSimpleList={true}
      indexContent={indexContent}
    />
  )
}
