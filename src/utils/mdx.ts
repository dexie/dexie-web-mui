import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import remarkGfm from "remark-gfm"

// Document source types
export type DocumentSource = "docs" | "roadmap"

// Helper function to get directory path based on source
function getSourceDirectory(source: DocumentSource): string {
  return path.join(process.cwd(), source)
}

export interface DocMetadata {
  slug: string
  title: string
  layout?: string
  [key: string]: unknown
}

export interface Doc {
  metadata: DocMetadata
  content: string
  serializedContent?: unknown
}

// Generic function to get all documents from any source folder
export function getAllDocuments(source: DocumentSource): Doc[] {
  const sourceDirectory = getSourceDirectory(source)

  function readDocsRecursively(dir: string, basePath: string = ""): Doc[] {
    const docs: Doc[] = []
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        // Recursively read subfolders
        const subDocs = readDocsRecursively(fullPath, path.join(basePath, item))
        docs.push(...subDocs)
      } else if (item.endsWith(".md")) {
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // Create slug from file path
        const relativePath = path.join(basePath, item)
        const slug = relativePath.replace(/\.md$/, "").replace(/\\/g, "/")

        docs.push({
          metadata: {
            ...data,
            slug,
            title: data.title || item.replace(/\.md$/, ""),
          },
          content,
        })
      }
    }

    return docs
  }

  return readDocsRecursively(sourceDirectory)
}

// Generic function to get a specific document based on slug and source
export function getDocumentBySlug(
  slug: string,
  source: DocumentSource
): Doc | null {
  try {
    const sourceDirectory = getSourceDirectory(source)
    const filePath = path.join(sourceDirectory, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      metadata: {
        ...data,
        slug,
        title: data.title || slug,
      },
      content,
    }
  } catch {
    return null
  }
}

// Serialize Markdown content for rendering (uses MDX instead of plain HTML)
export async function serializeMarkdown(
  content: string
): Promise<MDXRemoteSerializeResult> {
  // Preprocess content to convert HTML table tags to JSX syntax
  const processedContent = content
    // Convert HTML table tags to JSX
    .replace(/<table([^>]*)>/g, "<Table$1>")
    .replace(/<\/table>/g, "</Table>")
    .replace(/<thead([^>]*)>/g, "<TableHead$1>")
    .replace(/<\/thead>/g, "</TableHead>")
    .replace(/<tbody([^>]*)>/g, "<TableBody$1>")
    .replace(/<\/tbody>/g, "</TableBody>")
    .replace(/<tr([^>]*)>/g, "<TableRow$1>")
    .replace(/<\/tr>/g, "</TableRow>")
    .replace(/<th([^>]*)>/g, "<TableHeaderCell$1>")
    .replace(/<\/th>/g, "</TableHeaderCell>")
    .replace(/<td([^>]*)>/g, "<TableCell$1>")
    .replace(/<\/td>/g, "</TableCell>")

  const result = await serialize(processedContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
      development: process.env.NODE_ENV === "development",
    },
    parseFrontmatter: true,
  })

  return result
}

interface NavItem {
  title: string
  slug: string
  layout?: string
}

interface NavStructure {
  [key: string]: NavItem | NavStructure
}

// Generic function to generate navigation from any source structure
export function generateDocumentNavigation(
  source: DocumentSource
): NavStructure {
  const docs = getAllDocuments(source)
  const nav: NavStructure = {}

  docs.forEach((doc) => {
    const parts = doc.metadata.slug.split("/")
    let current: NavStructure = nav

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // Last part is the file
        current[part] = {
          title: doc.metadata.title,
          slug: doc.metadata.slug,
          layout: doc.metadata.layout,
        }
      } else {
        // Create folder structure
        if (
          !current[part] ||
          (typeof current[part] === "object" && "title" in current[part])
        ) {
          current[part] = {}
        }
        current = current[part] as NavStructure
      }
    })
  })

  return nav
}

// BACKWARDS COMPATIBILITY FUNCTIONS FOR DOCS
export function getAllDocs(): Doc[] {
  return getAllDocuments("docs")
}

export function getDocBySlug(slug: string): Doc | null {
  return getDocumentBySlug(slug, "docs")
}

export function generateNavigation(): NavStructure {
  return generateDocumentNavigation("docs")
}

// CONVENIENCE FUNCTIONS FOR ROADMAP
export function getAllRoadmapDocs(): Doc[] {
  return getAllDocuments("roadmap")
}

export function getRoadmapDocBySlug(slug: string): Doc | null {
  return getDocumentBySlug(slug, "roadmap")
}

export function generateRoadmapNavigation(): NavStructure {
  return generateDocumentNavigation("roadmap")
}

// Convert Markdown to HTML (for simpler usage) - deprecated, use serializeMarkdown instead
export async function markdownToHtml(markdown: string): Promise<string> {
  await serialize(markdown, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })

  // This is a fallback - you should use serializeMarkdown and MDX components instead
  return `<div>Please use serializeMarkdown with MDX components instead</div>`
}
