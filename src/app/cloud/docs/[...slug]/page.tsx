import { notFound } from "next/navigation"
import {
  getAllCloudDocs,
  getCloudDocBySlug,
  serializeMarkdown,
  generateCloudNavigation,
} from "@/utils/mdx"

import CloudDocsLayout from "@/components/content/docs/CloudDocsLayout"
import MDXContent from "@/components/content/docs/MDXContent"
import { Box, Typography } from "@mui/material"

// Generate static pages for all cloud docs
export async function generateStaticParams() {
  const docs = getAllCloudDocs()

  return docs
    .filter((doc) => doc.metadata.slug.startsWith("docs/"))
    .map((doc) => ({
      slug: doc.metadata.slug.replace("docs/", "").split("/"),
    }))
}

interface CloudDocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export default async function CloudDocPage({ params }: CloudDocPageProps) {
  const { slug } = await params
  const slugString = `docs/${slug.join("/")}`

  const doc = getCloudDocBySlug(slugString)

  if (!doc) {
    notFound()
  }

  const mdxContent = await serializeMarkdown(doc.content)
  const navigation = generateCloudNavigation()

  return (
    <CloudDocsLayout
      navigation={navigation}
      currentSlug={slugString}
      pageTitle={doc.metadata.title}
    >
      <Box component="article">
        <Box component="header" sx={{ mb: 5 }}>
          <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
            {doc.metadata.title}
          </Typography>
        </Box>

        <Box className="docs-content">
          <MDXContent source={mdxContent} />
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
    </CloudDocsLayout>
  )
}

// Generate metadata for each page
export async function generateMetadata({ params }: CloudDocPageProps) {
  const { slug } = await params
  const slugString = `docs/${slug.join("/")}`
  const doc = getCloudDocBySlug(slugString)

  if (!doc) {
    return {
      title: "Page not found",
    }
  }

  // Skapa bättre beskrivningar för Dexie Cloud features
  const createCloudDescription = (title: string, slug: string): string => {
    const cloudKeywordMap: Record<string, string> = {
      authentication:
        "Dexie Cloud authentication guide. Implement secure user login, OTP authentication, and OAuth integration for offline-first applications with zero backend setup.",
      sync: "Dexie Cloud sync documentation. Real-time data synchronization, conflict resolution, and offline-first patterns for collaborative web applications.",
      permissions:
        "Dexie Cloud permissions and access control. Manage user roles, data sharing, and security for multi-user offline applications.",
      "db.cloud":
        "Dexie Cloud API reference. Complete documentation for cloud configuration, sync methods, and real-time collaboration features.",
      "access-control":
        "Dexie Cloud access control system. Implement fine-grained permissions, user roles, and secure data sharing in offline-first apps.",
      realms:
        "Dexie Cloud realms for data isolation. Organize and secure application data with multi-tenant architecture and selective sharing.",
      members:
        "Dexie Cloud member management. Handle team collaboration, user invitations, and member permissions in offline-first applications.",
      roles:
        "Dexie Cloud role-based access control. Define user permissions, manage team roles, and secure collaborative features.",
      "getting-started":
        "Get started with Dexie Cloud. Step-by-step setup guide for adding real-time sync and authentication to offline-first applications.",
      "best-practices":
        "Dexie Cloud best practices. Performance optimization, security guidelines, and architecture patterns for production offline-first apps.",
    }

    // Hitta matchande beskrivning
    for (const [key, desc] of Object.entries(cloudKeywordMap)) {
      if (
        title.toLowerCase().includes(key) ||
        slug.toLowerCase().includes(key)
      ) {
        return desc
      }
    }

    // Fallback för olika kategorier
    if (slug.includes("api") || title.toLowerCase().includes("api")) {
      return `${title} API reference for Dexie Cloud. Learn real-time sync, authentication, and collaboration methods for offline-first applications.`
    } else if (
      slug.includes("tutorial") ||
      title.toLowerCase().includes("tutorial")
    ) {
      return `${title} tutorial for Dexie Cloud. Step-by-step guide to implementing sync, auth, and collaboration in offline-first apps.`
    } else if (
      slug.includes("guide") ||
      title.toLowerCase().includes("guide")
    ) {
      return `${title} guide for Dexie Cloud. Implementation patterns and best practices for offline-first sync and authentication.`
    }

    return `${title} documentation for Dexie Cloud. Learn real-time sync, authentication, and collaboration for offline-first web applications.`
  }

  // Skapa keywords för Dexie Cloud
  const createCloudKeywords = (title: string, slug: string): string[] => {
    const baseKeywords = [
      "dexie cloud",
      "offline first sync",
      "real time sync",
      "database synchronization",
      "offline authentication",
      "collaborative apps",
    ]

    const contextKeywords: string[] = []

    if (slug.includes("auth") || title.toLowerCase().includes("auth")) {
      contextKeywords.push(
        "offline auth",
        "user authentication",
        "login system",
        "otp authentication"
      )
    }
    if (slug.includes("sync") || title.toLowerCase().includes("sync")) {
      contextKeywords.push(
        "data sync",
        "real time database",
        "conflict resolution",
        "offline sync"
      )
    }
    if (
      slug.includes("permission") ||
      title.toLowerCase().includes("permission")
    ) {
      contextKeywords.push(
        "access control",
        "user permissions",
        "data security",
        "role based access"
      )
    }
    if (
      slug.includes("collaboration") ||
      title.toLowerCase().includes("collaboration")
    ) {
      contextKeywords.push(
        "team collaboration",
        "shared data",
        "collaborative editing",
        "multi user"
      )
    }
    if (slug.includes("api")) {
      contextKeywords.push(
        "cloud api",
        "sync api",
        "javascript api",
        "database api"
      )
    }
    if (slug.includes("getting-started") || slug.includes("tutorial")) {
      contextKeywords.push(
        "cloud tutorial",
        "sync tutorial",
        "offline first tutorial"
      )
    }

    return [...baseKeywords, ...contextKeywords]
  }

  const description = createCloudDescription(doc.metadata.title, slugString)
  const keywords = createCloudKeywords(doc.metadata.title, slugString)
  const cleanSlug = slugString.replace("docs/", "")

  return {
    title: `${doc.metadata.title} | Dexie Cloud Documentation - Offline-First Sync & Auth`,
    description,
    keywords,
    openGraph: {
      title: `${doc.metadata.title} - Dexie Cloud Documentation`,
      description,
      url: `https://dexie.org/cloud/docs/${cleanSlug}`,
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
      title: `${doc.metadata.title} - Dexie Cloud`,
      description,
      images: ["/assets/images/og-images/og-base.png"],
    },
    alternates: {
      canonical: `https://dexie.org/cloud/docs/${cleanSlug}`,
    },
    other: {
      "article:section": "Dexie Cloud Documentation",
      "article:tag": keywords.join(", "),
    },
  }
}
