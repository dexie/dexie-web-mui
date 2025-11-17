import { notFound } from "next/navigation"
import {
  getAllDocs,
  getDocBySlug,
  serializeMarkdown,
  generateNavigation,
} from "@/utils/mdx"

import DocsLayout from "@/components/content/docs/DocsLayout"
import { Box, Typography } from "@mui/material"

// Generera statiska sidor för alla docs
export async function generateStaticParams() {
  const docs = getAllDocs()

  return docs.map((doc) => ({
    slug: doc.metadata.slug.split("/"),
  }))
}

interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  const slugString = slug.join("/")

  const doc = getDocBySlug(slugString)

  if (!doc) {
    notFound()
  }

  const mdxContent = await serializeMarkdown(doc.content)
  const navigation = generateNavigation()

  return (
    <DocsLayout
      navigation={navigation}
      currentSlug={slugString}
      pageTitle={doc.metadata.title}
      mdxSource={mdxContent}
    >
      <Box component="article">
        <Box component="header" sx={{ mb: 5 }}>
          <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
            {doc.metadata.title}
          </Typography>
        </Box>

        <Box
          component="footer"
          sx={{
            mt: 5,
            pt: 4,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {slugString}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </Typography>
        </Box>
      </Box>
    </DocsLayout>
  )
}

// Generera metadata för varje sida
export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params
  const slugString = slug.join("/")
  const doc = getDocBySlug(slugString)

  if (!doc) {
    return {
      title: "Page not found",
    }
  }

  // Skapa bättre beskrivningar baserat på content eller title
  const createDescription = (title: string): string => {
    // Keyword mapping för bättre SEO
    const keywordMap: Record<string, string> = {
      Tutorial:
        "Learn Dexie.js step-by-step with this complete tutorial. Build offline-first web applications using IndexedDB wrapper with React, Vue, Angular examples.",
      "API-Reference":
        "Complete Dexie.js API reference. All methods, properties, and examples for building offline-first applications with IndexedDB.",
      liveQuery:
        "Dexie.js liveQuery() enables reactive database queries. Automatically update React, Vue, Angular components when IndexedDB data changes.",
      "Dexie.js":
        "Dexie.js main documentation. Learn how to use the powerful IndexedDB wrapper for offline-first web applications.",
      Transaction:
        "Dexie.js transactions for safe database operations. Learn atomic operations, error handling, and best practices for IndexedDB.",
      Table:
        "Dexie.js Table API reference. Methods for querying, inserting, updating and deleting data in IndexedDB with ease.",
      Collection:
        "Dexie.js Collection API for advanced querying. Filter, sort, and manipulate IndexedDB data with powerful collection methods.",
      WhereClause:
        "Dexie.js WhereClause for precise queries. Learn indexing, filtering, and performance optimization for IndexedDB applications.",
    }

    // Hitta matchande keywords
    for (const [key, desc] of Object.entries(keywordMap)) {
      if (title.toLowerCase().includes(key.toLowerCase())) {
        return desc
      }
    }

    // Fallback beskrivning baserad på kategorier
    if (slugString.includes("cloud")) {
      return `${title} documentation for Dexie Cloud. Learn offline-first sync, authentication, and real-time collaboration features.`
    } else if (slugString.includes("tutorial")) {
      return `${title} tutorial for Dexie.js. Step-by-step guide to building offline-first applications with IndexedDB.`
    } else if (slugString.includes("api")) {
      return `${title} API reference for Dexie.js. Complete documentation with examples for offline-first development.`
    }

    return `${title} documentation for Dexie.js. Learn offline-first development with IndexedDB wrapper for JavaScript applications.`
  }

  // Skapa keywords baserat på content
  const createKeywords = (title: string, slugString: string): string[] => {
    const baseKeywords = [
      "dexie.js",
      "indexeddb",
      "offline first",
      "javascript database",
      "browser database",
    ]

    const contextKeywords: string[] = []

    if (slugString.includes("cloud")) {
      contextKeywords.push(
        "dexie cloud",
        "offline sync",
        "real time sync",
        "database sync"
      )
    }
    if (slugString.includes("react")) {
      contextKeywords.push("react offline", "react indexeddb", "react database")
    }
    if (slugString.includes("vue")) {
      contextKeywords.push("vue offline", "vue indexeddb", "vue database")
    }
    if (slugString.includes("angular")) {
      contextKeywords.push(
        "angular offline",
        "angular indexeddb",
        "angular database"
      )
    }
    if (slugString.includes("tutorial")) {
      contextKeywords.push(
        "offline tutorial",
        "indexeddb tutorial",
        "local storage tutorial"
      )
    }
    if (slugString.includes("api")) {
      contextKeywords.push("api reference", "javascript api", "database api")
    }
    if (title.toLowerCase().includes("livequery")) {
      contextKeywords.push(
        "reactive queries",
        "live queries",
        "real time updates"
      )
    }
    if (title.toLowerCase().includes("transaction")) {
      contextKeywords.push(
        "database transactions",
        "atomic operations",
        "data consistency"
      )
    }

    return [...baseKeywords, ...contextKeywords]
  }

  const description = createDescription(doc.metadata.title)
  const keywords = createKeywords(doc.metadata.title, slugString)

  return {
    title: `${doc.metadata.title} | Dexie.js Documentation - Offline-First Database`,
    description,
    keywords,
    openGraph: {
      title: `${doc.metadata.title} - Dexie.js Documentation`,
      description,
      url: `https://dexie.org/docs/${slugString}`,
      type: "article",
      images: [
        {
          url: "/assets/images/og-images/og-base.png",
          width: 1200,
          height: 630,
          alt: "Build synced offline-first apps with Dexie",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.metadata.title} - Dexie.js Docs`,
      description,
      images: ["/assets/images/og-images/og-base.png"],
    },
    alternates: {
      canonical: `https://dexie.org/docs/${slugString}`,
    },
    other: {
      "article:section": "Documentation",
      "article:tag": keywords.join(", "),
    },
  }
}
