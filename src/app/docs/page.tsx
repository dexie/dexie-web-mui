import { getAllDocs } from "@/utils/mdx"
import Link from "next/link"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material"
import DocsLayout from "@/components/content/docs/DocsLayout"

export default function DocsHomePage() {
  const docs = getAllDocs()

  // Group documents by category/folder
  const docsByCategory = docs.reduce((acc, doc) => {
    const category = doc.metadata.slug.split("/")[0] || "General"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, typeof docs>)

  return (
    <DocsLayout currentSlug="">
      <Box component="article">
        <Box component="header" sx={{ mb: 5, textAlign: "center" }}>
          <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
            Documentation
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
          >
            Welcome to the Dexie.js documentation. Here you will find guides,
            API references, and examples.
          </Typography>
        </Box>

        <Box className="docs-content">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 3,
              mb: 6,
            }}
          >
            {Object.entries(docsByCategory).map(([category, categoryDocs]) => (
              <Card
                key={category}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#000000",
                  border: "1px solid #333333",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                    {categoryDocs.slice(0, 8).map((doc) => (
                      <Box
                        component="li"
                        key={doc.metadata.slug}
                        sx={{ mb: 1 }}
                      >
                        <Link
                          href={`/docs/${doc.metadata.slug}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              "&:hover": {
                                color: "#FFFFFF",
                              },
                            }}
                          >
                            {doc.metadata.title}
                          </Typography>
                        </Link>
                      </Box>
                    ))}
                    {categoryDocs.length > 8 && (
                      <Box component="li" sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          ... and {categoryDocs.length - 8} more
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 6 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gap: 4,
            }}
          >
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Get Started Quickly
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Start by reading our tutorial to get started with Dexie.js.
              </Typography>
              <Link href="/docs/Tutorial" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large" sx={{ mt: 2 }}>
                  Read Tutorial
                </Button>
              </Link>
            </Box>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom>
                API Reference
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Explore the complete API documentation.
              </Typography>
              <Link
                href="/docs/API-Reference"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" size="large" sx={{ mt: 2 }}>
                  View API
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          component="footer"
          sx={{
            mt: 5,
            pt: 4,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Documentation Overview
          </Typography>
        </Box>
      </Box>
    </DocsLayout>
  )
}
