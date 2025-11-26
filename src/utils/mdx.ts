import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkHtml from "remark-html"
import remarkGfm from "remark-gfm"

// Document source types
export type DocumentSource = "docs" | "roadmap" | "cloud"

// Breadcrumb navigation types
export interface BreadcrumbItem {
  label: string
  href: string
}

// Documentation category types for navigation
export interface DocCategory {
  name: string
  title: string
  pages: {
    slug: string[]
    metadata: DocMetadata
  }[]
  subcategories: DocCategory[]
}

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
    // URL-decode the slug to handle encoded brackets like %5B and %5D
    const decodedSlug = decodeURIComponent(slug)
    
    const sourceDirectory = getSourceDirectory(source)
    let filePath: string

    // For cloud source, check if the slug starts with 'docs/'
    if (source === "cloud" && decodedSlug.startsWith("docs/")) {
      // Remove 'docs/' prefix and look in cloud/docs/
      const docSlug = decodedSlug.replace("docs/", "")
      filePath = path.join(sourceDirectory, "docs", `${docSlug}.md`)
    } else {
      filePath = path.join(sourceDirectory, `${decodedSlug}.md`)
    }

    // If the exact file doesn't exist, try looking for index.md in the directory
    if (!fs.existsSync(filePath)) {
      // Try directory/index.md pattern
      const indexPath =
        source === "cloud" && decodedSlug.startsWith("docs/")
          ? path.join(
              sourceDirectory,
              "docs",
              decodedSlug.replace("docs/", ""),
              "index.md"
            )
          : path.join(sourceDirectory, decodedSlug, "index.md")

      if (fs.existsSync(indexPath)) {
        filePath = indexPath
      } else {
        // Also try case-insensitive matching for directory names
        const allDocs = getAllDocuments(source)
        const matchingDoc = allDocs.find(doc => {
          const docSlug = doc.metadata.slug.toLowerCase()
          const searchSlug = decodedSlug.toLowerCase()
          // Check for exact match or index match
          return docSlug === searchSlug || 
                 docSlug === `${searchSlug}/index` ||
                 (docSlug.endsWith('/index') && docSlug.slice(0, -6) === searchSlug)
        })
        
        if (matchingDoc) {
          return matchingDoc
        }
        
        return null
      }
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug: decodedSlug, // Use decoded slug
      metadata: {
        ...data,
        slug: decodedSlug, // Use decoded slug
        title: data.title || decodedSlug.split("/").pop() || decodedSlug,
      },
      content,
    }
  } catch {
    return null
  }
}

// Serialize Markdown content for rendering (uses MDX instead of plain HTML)
export async function serializeMarkdown(content: string): Promise<string> {
  // Preprocess content to handle Jekyll attributes and other transformations
  const processedContent = content
    // Convert Jekyll image attributes like {:width="200px"} to style attributes
    .replace(
      /<img([^>]*)\s*\/?>(\s*)\{([^}]*)\}/g,
      (match, imgAttrs, space, jekyllAttrs) => {
        const styleAttrs =
          jekyllAttrs.match(/width="([^"]*)"/)?.[1] ||
          jekyllAttrs.match(/height="([^"]*)"/)?.[1] ||
          ""
        if (styleAttrs) {
          return `<img${imgAttrs} style="width:${styleAttrs}" />`
        }
        return `<img${imgAttrs} />`
      }
    )
    // Remove other Jekyll attributes
    .replace(/\{:[^}]*\}/g, "")
    // Remove Jekyll Liquid tags
    .replace(/\{%\s*raw\s*%\}/g, "")
    .replace(/\{%\s*endraw\s*%\}/g, "")
    .replace(/\{%[^}]*%\}/g, "")

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, {
      sanitize: false, // Allow raw HTML
    })
    .process(processedContent)

  return result.toString()
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
    .filter((doc) => doc.metadata.slug.startsWith("docs/"))
    .map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        slug: doc.metadata.slug.replace("docs/", ""),
      },
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
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown)

  return result.toString()
}
