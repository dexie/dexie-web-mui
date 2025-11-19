"use client"

import React from "react"
import {
  Box,
  Container,
  Typography,
  Chip,
  useTheme,
  alpha,
} from "@mui/material"
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser"
import { BlogPost } from "@/utils/rssFeedParser"
import RelatedBlogPosts from "../RelatedBlogPosts"

interface BlogPostClientProps {
  post: BlogPost
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  const theme = useTheme()

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

  // Parse HTML content and add target="_blank" to external links
  const parseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "a") {
        const href = domNode.attribs?.href

        if (href) {
          // Check if link is external (starts with http/https and not current domain)
          const isExternal =
            href.startsWith("http://") || href.startsWith("https://")

          if (isExternal) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.palette.text.primary }}
              >
                {domToReact(domNode.children as DOMNode[], parseOptions)}
              </a>
            )
          }
        }
      }
    },
  }

  return (
    <Box>
      {/* Hero Header */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/assets/images/dexie-bg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          padding: { xs: 3, md: 6, lg: 12, xl: 40 },
          paddingTop: "200px !important",
          paddingBottom: "100px !important",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "1200px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3.5rem" },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              opacity: 0.9,
              fontWeight: 300,
              fontSize: { xs: "1rem", md: "1.1rem" },
              textAlign: "center",
            }}
          >
            {post.author} • {formatDate(post.pubDate)}
          </Typography>
          {post.categories.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "center",
              }}
            >
              {post.categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    borderColor: alpha(theme.palette.primary.main, 1),
                    color: "white",
                    fontWeight: 500,
                    "& .MuiChip-label": {
                      fontSize: "0.75rem",
                      padding: "0px 10px !important",
                      pb: "2px !important",
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.mode === "dark" ? "#0a0a0a" : "#f8f9fa",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* Article Content */}
          <Box
            sx={{
              borderRadius: 2,
              mb: 4,
              boxShadow: theme.shadows[1],
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: 1,
                my: 2,
              },
              "& p": {
                mb: 2,
                lineHeight: 1.8,
                fontSize: "1.1rem",
              },
              "& p:last-of-type": {
                fontSize: "11px",
                color: theme.palette.text.disabled,
                opacity: 0.7,
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                mt: 3,
                mb: 2,
                fontWeight: 600,
              },
              "& a": {
                color: theme.palette.text.primary,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
              "& pre": {
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                p: 2,
                borderRadius: 1,
                overflowX: "auto",
              },
              "& code": {
                fontFamily: "monospace",
                fontSize: "0.9em",
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                px: 0.5,
                borderRadius: 0.5,
              },
              "& ul, & ol": {
                pl: 3,
                mb: 2,
              },
              "& li": {
                mb: 1,
                lineHeight: 1.8,
              },
              "& blockquote": {
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 2,
                ml: 0,
                my: 2,
                fontStyle: "italic",
                color: theme.palette.text.secondary,
              },
            }}
          >
            {post.content
              ? parse(post.content, parseOptions)
              : parse(post.description, parseOptions)}
          </Box>

          {/* Related Articles */}
          <RelatedBlogPosts
            currentSlug={post.slug}
            limit={6}
            title="More Articles"
          />
        </Container>
      </Box>
    </Box>
  )
}

export default BlogPostClient
