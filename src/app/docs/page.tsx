import DocsLayout from "@/components/content/docs/DocsLayout"
import DocsHomePage from "@/components/content/docs/DocsHomePage"
import {
  getDocumentBySlug,
  serializeMarkdown,
  generateNavigation,
} from "@/utils/mdx"

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
