"use client"

import React, { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Skeleton,
  useTheme,
  alpha,
} from "@mui/material"
import Link from "next/link"
import { BlogPost } from "@/utils/rssFeedParser"

interface RelatedBlogPostsProps {
  currentSlug?: string
  limit?: number
  title?: string
}

const RelatedBlogPosts: React.FC<RelatedBlogPostsProps> = ({
  currentSlug,
  limit = 6,
  title = "More Articles",
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/blog-feed?limit=50&feedUrl=${encodeURIComponent(
            "https://medium.com/feed/dexie-js"
          )}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`)
        }

        const data = await response.json()
        let filteredPosts = data.posts || []

        // Filter out current post if currentSlug is provided
        if (currentSlug) {
          filteredPosts = filteredPosts.filter(
            (post: BlogPost) => post.slug !== currentSlug
          )
        }

        // Limit the number of posts
        setPosts(filteredPosts.slice(0, limit))

        if (filteredPosts.length === 0) {
          setError("No posts available")
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error"
        console.error("Error loading posts:", errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [currentSlug, limit])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const renderSkeleton = () => (
    <>
      {Array.from({ length: limit > 6 ? 6 : limit }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            opacity: 0.2,
            height: "100%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={200} />
            <CardContent>
              <Skeleton variant="text" height={32} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} width="60%" />
            </CardContent>
          </Card>
        </Box>
      ))}
    </>
  )

  const renderPost = (post: BlogPost) => {
    const isValidImage =
      post.thumbnail &&
      !post.thumbnail.includes("/_/stat?") &&
      !post.thumbnail.includes("/stat?event=") &&
      !post.thumbnail.includes("tracking")

    const imageUrl = isValidImage
      ? post.thumbnail
      : "/assets/images/dexie-bg.jpg"

    return (
      <Card
        key={post.slug}
        sx={{
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          backgroundImage: "none",
          backgroundColor: alpha(theme.palette.text.primary, 0.05),
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[8],
          },
          border: "none",
        }}
      >
        <CardActionArea
          component={Link}
          href={`/blog/${post.slug}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              image={imageUrl}
              alt={post.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              width: "100%",
            }}
          >
            <Box
              sx={{
                fontWeight: 600,
                fontSize: "1.125rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.title}
            </Box>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              {formatDate(post.pubDate)} - {post.author}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mt: 1,
              }}
            >
              {post.description}
            </Typography>
            {post.categories.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  mt: 2,
                  zoom: 0.9,
                }}
              >
                {post.categories.slice(0, 3).map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    size="small"
                    sx={{
                      fontSize: "0.75rem",
                      "& .MuiChip-label": {
                        padding: "0px 8px !important",
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  if (loading) {
    return (
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {renderSkeleton()}
        </Box>
      </Box>
    )
  }

  if (!loading && posts.length === 0) {
    return null
  }

  return (
    <Box sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {posts.map(renderPost)}
      </Box>

      {error && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="body2"
            color="error"
            sx={{ fontFamily: "monospace" }}
          >
            Error: {error}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default RelatedBlogPosts
