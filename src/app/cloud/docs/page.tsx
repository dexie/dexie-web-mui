import React from "react"
import CloudDocsLayout from "@/components/content/docs/CloudDocsLayout"
import DocsHomePage from "@/components/content/docs/DocsHomePage"
import {
  getDocumentBySlug,
  serializeMarkdown,
  generateCloudNavigation,
} from "@/utils/mdx"

export const metadata = {
  title: "Dexie Cloud Documentation - Offline-First Sync, Auth & Collaboration Platform",
  description:
    "Complete Dexie Cloud documentation: real-time sync, authentication, access control, and collaborative features for offline-first applications. No backend required - start building with IndexedDB sync today.",
  keywords: [
    "dexie cloud documentation",
    "offline first sync",
    "real time database sync", 
    "offline sync platform",
    "database synchronization",
    "offline first auth",
    "collaborative offline apps",
    "indexeddb sync",
    "javascript sync database",
    "browser database sync", 
    "local first sync",
    "offline collaboration",
    "real time collaboration",
    "offline auth platform",
    "sync authentication",
    "database access control",
    "offline permissions"
  ],
  openGraph: {
    title: "Dexie Cloud Documentation - Master Offline-First Sync & Auth",
    description: "Complete guide to real-time sync, authentication, and collaboration for offline-first applications. No backend setup required.",
    url: 'https://dexie.org/cloud/docs',
    type: 'website',
    images: [
      {
        url: '/assets/images/dexie-cloud-docs-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Dexie Cloud Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dexie Cloud Docs - Offline-First Sync & Auth',
    description: 'Master real-time sync, auth, and collaboration for offline-first apps. Complete documentation and tutorials.',
    images: ['/assets/images/dexie-cloud-docs-og.jpg'],
  },
  alternates: {
    canonical: 'https://dexie.org/cloud/docs',
  },
}

export default async function CloudDocsHome() {
  // Läs index.md från cloud/docs mappen
  const indexDoc = getDocumentBySlug("docs/index", "cloud")
  const indexContent = indexDoc
    ? await serializeMarkdown(indexDoc.content)
    : undefined

  // Generate navigation on the server
  const navigation = generateCloudNavigation()

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
    <CloudDocsLayout
      navigation={navigation}
      currentSlug={currentSlug}
      pageTitle={pageTitle}
    >
      {children}
    </CloudDocsLayout>
  )

  return (
    <DocsHomePage
      source="cloud"
      title={indexDoc?.metadata.title || "Dexie Cloud Documentation"}
      description="Comprehensive documentation for Dexie Cloud - authentication, synchronization, permissions, and more. Get started with building cloud-enabled applications."
      basePath="/cloud/docs"
      Layout={LayoutWithNavigation}
      currentSlug="docs"
      filterDocs={(docs) =>
        docs.filter((doc) => doc.metadata.slug.startsWith("docs/"))
      }
      generatePathFromSlug={(slug) =>
        `/cloud/docs/${slug.replace("docs/", "")}`
      }
      useSimpleList={true}
      indexContent={indexContent}
    />
  )
}
