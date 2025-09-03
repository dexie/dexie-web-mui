import { notFound } from "next/navigation"
import {
  getAllCloudDocs,
  getCloudDocBySlug,
  serializeMarkdown,
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

  return (
    <CloudDocsLayout currentSlug={slugString}>
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

  return {
    title: `${doc.metadata.title} - Dexie Cloud Documentation`,
    description: `Documentation for ${doc.metadata.title}`,
  }
}
