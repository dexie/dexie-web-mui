import { notFound } from "next/navigation"
import { getAllDocs, getDocBySlug, serializeMarkdown } from "@/utils/mdx"

import DocsLayout from "@/components/content/docs/DocsLayout"
import MDXContent from "@/components/content/docs/MDXContent"
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

  return (
    <DocsLayout currentSlug={slugString}>
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

  return {
    title: `${doc.metadata.title} - Dexie.js Documentation`,
    description: `Documentation for ${doc.metadata.title}`,
  }
}
