import React from "react"
import { notFound } from "next/navigation"
import { DocsLayout } from "../../../components/layout/DocsLayout"
import MDXContent from "../../../components/content/MDXContent"
import {
  getAllDocuments,
  getDocumentBySlug,
  createDocNavigation,
  serializeMdxContent,
  getBreadcrumbs,
} from "../../../utils/mdx"
import path from "path"

interface CloudPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), "cloud")
  const allDocs = await getAllDocuments(docsDirectory)

  return allDocs.map((doc) => ({
    slug: doc.slug,
  }))
}
export default async function CloudPage({ params }: CloudPageProps) {
  const { slug } = params
  const basePath = "/cloud"
  const docsDirectory = path.join(process.cwd(), "cloud")

  // Hämta dokumentet
  const doc = await getDocumentBySlug(docsDirectory, slug)

  if (!doc) {
    notFound()
  }

  // Serialisera MDX-innehållet
  const mdxSource = await serializeMdxContent(doc.content)

  // Skapa navigation
  const navigation = await createDocNavigation(docsDirectory)

  // Skapa breadcrumbs
  const breadcrumbs = getBreadcrumbs(slug, basePath)

  const pageTitle = doc.metadata.title || slug[slug.length - 1]

  return (
    <DocsLayout
      navigation={navigation}
      basePath={basePath}
      title="Dexie Cloud"
      breadcrumbs={breadcrumbs}
      pageTitle={pageTitle}
    >
      <MDXContent source={mdxSource} />
    </DocsLayout>
  )
}
