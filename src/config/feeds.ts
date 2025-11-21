/**
 * RSS Feed Configuration
 * Centralized configuration for external feed URLs
 */

export const FEEDS = {
  BLOG: "https://dexie.org/blog-feed.xml",
} as const

export type FeedKey = keyof typeof FEEDS
