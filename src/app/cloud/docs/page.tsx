import React from "react"
import CloudDocsLayout from "@/components/content/docs/CloudDocsLayout"
import DocsHomePage from "@/components/content/docs/DocsHomePage"
import {
  getDocumentBySlug,
  serializeMarkdown,
  generateCloudNavigation,
} from "@/utils/mdx"

export const metadata = {
  title: "Dexie Cloud Documentation",
  description:
    "Comprehensive documentation for Dexie Cloud - authentication, synchronization, permissions, and more.",
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
