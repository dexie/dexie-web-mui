import DocsLayout from "@/components/content/docs/DocsLayout"
import DocsHomePage from "@/components/content/docs/DocsHomePage"
import { getDocumentBySlug, serializeMarkdown } from "@/utils/mdx"

export default async function DocsHomePageWrapper() {
  // Läs index.md från docs mappen
  const indexDoc = getDocumentBySlug("index", "docs")
  const indexContent = indexDoc
    ? await serializeMarkdown(indexDoc.content)
    : undefined

  return (
    <DocsHomePage
      source="docs"
      title={indexDoc?.metadata.title || "Docs Home"}
      description=""
      basePath="/docs"
      Layout={DocsLayout}
      useSimpleList={true}
      indexContent={indexContent}
    />
  )
}
