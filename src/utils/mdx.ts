import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import remarkGfm from "remark-gfm"

// Document source types
export type DocumentSource = "docs" | "roadmap" | "cloud"

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
  slug: string
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

        // For cloud source, prefix docs/ if the file is in the docs subfolder
        if (source === "cloud" && basePath.includes("docs")) {
          // Already has the correct path structure
        }

        docs.push({
          slug, // Add the missing slug property
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
    let filePath: string

    // For cloud source, check if the slug starts with 'docs/'
    if (source === "cloud" && slug.startsWith("docs/")) {
      // Remove 'docs/' prefix and look in cloud/docs/
      const docSlug = slug.replace("docs/", "")
      filePath = path.join(sourceDirectory, "docs", `${docSlug}.md`)
    } else {
      filePath = path.join(sourceDirectory, `${slug}.md`)
    }

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug, // Add the missing slug property
      metadata: {
        ...data,
        slug,
        title: data.title || slug.split("/").pop() || slug,
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
  const parts = content.split(/(```[\s\S]*?```)/g)
  const processedContent = parts
    .map((part, index) => {
      if (index % 2 === 0) {
        // This is not a code block, apply replacements
        return (
          part
            // Convert self-closing HTML tags to JSX format
            .replace(/<br\s*\/?>/g, "<br />")
            .replace(/<hr\s*\/?>/g, "<hr />")
            .replace(/<img([^>]*)\s*\/?>/g, "<img$1 />")
            .replace(/<input([^>]*)\s*\/?>/g, "<input$1 />")
            .replace(/<meta([^>]*)\s*\/?>/g, "<meta$1 />")
            .replace(/<link([^>]*)\s*\/?>/g, "<link$1 />")
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
            // Escape curly braces in text that might be interpreted as JSX expressions
            // This handles patterns like "function (value) { return true/false; }"
            .replace(/function\s*\([^)]*\)\s*\{\s*[^}]*\s*\}/g, (match) => {
              // Wrap function signatures in backticks to make them code spans
              return `\`${match}\``
            })
            // Also escape standalone curly braces that aren't in code blocks
            .replace(
              /(?<!`[\s\S]*?)\{([^}]*)\}(?![\s\S]*?`)/g,
              (match, content) => {
                // Only escape if it's not already in backticks and contains problematic patterns
                if (
                  content.includes("return") ||
                  content.includes(";") ||
                  content.includes("function")
                ) {
                  return `\\{${content}\\}`
                }
                return match
              }
            )
        )
      }
      // This is a code block, return as is
      return part
    })
    .join("")

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

// CONVENIENCE FUNCTIONS FOR CLOUD
export function getAllCloudDocs(): Doc[] {
  return getAllDocuments("cloud")
}

export function getCloudDocBySlug(slug: string): Doc | null {
  return getDocumentBySlug(slug, "cloud")
}

export function generateCloudNavigation(): NavStructure {
  const allCloudDocs = getAllCloudDocs()
  // Filter to only docs from docs/ subfolder and remove the docs/ prefix from slugs for navigation
  const docsOnly = allCloudDocs
    .filter(doc => doc.metadata.slug.startsWith("docs/"))
    .map(doc => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        slug: doc.metadata.slug.replace("docs/", "")
      }
    }))
  
  const nav: NavStructure = {}

  docsOnly.forEach((doc) => {
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
