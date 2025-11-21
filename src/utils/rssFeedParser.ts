import { FEEDS } from "@/config/feeds"

export interface BlogPost {
  title: string
  link: string
  pubDate: string
  author: string
  description: string
  thumbnail?: string
  categories: string[]
  slug: string
  content?: string
}

/**
 * Fetches blog posts from our Next.js API endpoint
 * @param feedUrl - The RSS feed URL
 * @param limit - Maximum number of articles to return
 * @returns Promise with array of blog posts
 */
export async function fetchMediumFeed(
  feedUrl: string = FEEDS.BLOG,
  limit: number = 6
): Promise<BlogPost[]> {
  try {
    const apiUrl = `/api/blog-feed?limit=${limit}&feedUrl=${encodeURIComponent(
      feedUrl
    )}`

    console.log("Fetching blog posts from API:", apiUrl)

    const response = await fetch(apiUrl)

    if (!response.ok) {
      console.error(
        "API response not OK:",
        response.status,
        response.statusText
      )
      const errorData = await response.json().catch(() => ({}))
      console.error("Error details:", errorData)
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`)
    }

    const data = await response.json()

    console.log("API response:", {
      postCount: data.posts?.length || 0,
      cached: data.cached,
      cacheAge: data.cacheAge,
      error: data.error,
    })

    if (data.error) {
      console.error("API returned error:", data.error)
    }

    return data.posts || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}
