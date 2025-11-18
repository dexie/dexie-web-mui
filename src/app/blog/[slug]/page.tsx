import { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPostClient from "./BlogPostClient"
import { BlogPost } from "@/utils/rssFeedParser"

// Fetch blog posts from API
async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch("https://medium.com/feed/dexie-js", {
      next: { revalidate: 3600 },
    })

    if (!response.ok) return []

    const xmlText = await response.text()
    const { parseStringPromise } = await import("xml2js")
    const result = await parseStringPromise(xmlText, {
      trim: true,
      explicitArray: false,
    })

    const items = result.rss?.channel?.item || []
    const itemsArray = Array.isArray(items) ? items : [items]

    const createSlug = (title: string): string => {
      return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim()
    }

    const stripHtml = (html: string, maxLength: number = 200): string => {
      const tmp = html.replace(/<[^>]*>/g, "")
      const decoded = tmp
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .trim()
      return decoded.length > maxLength
        ? decoded.substring(0, maxLength) + "..."
        : decoded
    }

    const extractThumbnail = (html: string): string | undefined => {
      const imgMatch = html.match(/<img[^>]+src="([^">]+)"/)
      if (!imgMatch) return undefined

      const url = imgMatch[1]
      if (
        url.includes("/_/stat?") ||
        url.includes("/stat?event=") ||
        url.includes("tracking")
      ) {
        return undefined
      }

      if (url.startsWith("http") && url.match(/\.(jpg|jpeg|png|webp)/)) {
        return url
      }

      return undefined
    }

    const posts: BlogPost[] = itemsArray.map((item: unknown) => {
      const typedItem = item as { 
        category?: string | string[]
        "content:encoded"?: string
        description?: string
        title?: string
        link?: string
        pubDate?: string
        "dc:creator"?: string
        creator?: string
      }
      let categories: string[] = []
      if (typedItem.category) {
        categories = Array.isArray(typedItem.category)
          ? typedItem.category
          : [typedItem.category]
      }

      const content = typedItem["content:encoded"] || typedItem.description || ""
      const thumbnail = extractThumbnail(content)
      const title = typedItem.title || ""

      return {
        title,
        link: typedItem.link || "",
        pubDate: typedItem.pubDate || "",
        author: typedItem["dc:creator"] || typedItem.creator || "Dexie Team",
        description: stripHtml(content),
        thumbnail,
        categories,
        slug: createSlug(title),
        content,
      }
    })

    return posts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await fetchBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Fetch a single blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await fetchBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found - Dexie.js",
      description: "The requested blog post could not be found.",
    }
  }

  const keywords = [
    "Dexie.js",
    "IndexedDB",
    "JavaScript database",
    ...post.categories,
  ]

  return {
    title: `${post.title} | Dexie.js Blog`,
    description: post.description,
    keywords: keywords.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.pubDate,
      authors: [post.author],
      tags: post.categories,
      images: post.thumbnail
        ? [
            {
              url: post.thumbnail,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
