import React from "react"
import { Box, Typography, Card, CardContent } from "@mui/material"
import Link from "next/link"
import CloudDocsLayout from "@/components/content/docs/CloudDocsLayout"
import { getAllCloudDocs } from "@/utils/mdx"

export const metadata = {
  title: "Dexie Cloud Documentation",
  description:
    "Comprehensive documentation for Dexie Cloud - authentication, synchronization, permissions, and more.",
}

export default async function CloudDocsHome() {
  const allDocs = getAllCloudDocs()

  // Filter to only get docs from the docs/ subfolder
  const cloudDocs = allDocs.filter((doc) =>
    doc.metadata.slug.startsWith("docs/")
  )

  return (
    <CloudDocsLayout currentSlug="docs" pageTitle="Dexie Cloud Documentation">
      <Box component="article">
        <Box component="header" sx={{ mb: 5 }}>
          <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
            Dexie Cloud Documentation
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Comprehensive documentation for Dexie Cloud - authentication,
            synchronization, permissions, and more. Get started with building
            cloud-enabled applications.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" component="h2" gutterBottom>
            All Documentation
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 3,
            }}
          >
            {cloudDocs.map((doc) => (
              <Card
                key={doc.metadata.slug}
                component={Link}
                href={`/cloud/docs/${doc.metadata.slug.replace("docs/", "")}`}
                sx={{
                  height: "100%",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  backgroundColor: "#000000",
                  border: "1px solid #333333",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {doc.metadata.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {(doc.metadata.description as string) ||
                      `Learn about ${doc.metadata.title}`}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
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
            cloud/docs
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {cloudDocs.length} documents available
          </Typography>
        </Box>
      </Box>
    </CloudDocsLayout>
  )
}
