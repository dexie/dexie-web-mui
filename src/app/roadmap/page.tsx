import React from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material"
import Link from "next/link"
import { DocsLayout } from "../../components/layout/DocsLayout"
import {
  getAllDocuments,
  createDocNavigation,
  DocCategory,
} from "../../utils/mdx"
import path from "path"

interface CategoryCardProps {
  category: DocCategory
  basePath: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, basePath }) => {
  if (category.name === "root") return null

  return (
    <Card sx={{ height: "100%", "&:hover": { boxShadow: 4 } }}>
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ textTransform: "capitalize" }}
        >
          {category.name.replace(/-/g, " ")}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {category.docs.length} dokument
        </Typography>

        <List dense>
          {category.docs.slice(0, 5).map((doc) => (
            <ListItem
              key={doc.slug.join("/")}
              component={Link}
              href={`/${basePath}/${doc.slug.join("/")}`}
              sx={{
                px: 0,
                "&:hover": { backgroundColor: "action.hover" },
                borderRadius: 1,
                mb: 0.5,
              }}
            >
              <ListItemText
                primary={doc.metadata.title || doc.slug[doc.slug.length - 1]}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          ))}

          {category.docs.length > 5 && (
            <ListItem sx={{ px: 0 }}>
              <Typography variant="body2" color="text.secondary">
                och {category.docs.length - 5} till...
              </Typography>
            </ListItem>
          )}
        </List>

        {category.subcategories.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 1, display: "block" }}
            >
              Underkategorier:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {category.subcategories.map((subcat) => (
                <Chip
                  key={subcat.name}
                  label={subcat.name.replace(/-/g, " ")}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

// App Router async component
export default async function RoadmapHome() {
  const basePath = "roadmap"
  const docsDirectory = path.join(process.cwd(), basePath)
  const allDocs = getAllDocuments(docsDirectory)
  const navigation = createDocNavigation(allDocs)

  const title = "Roadmap"

  return (
    <DocsLayout
      navigation={navigation}
      basePath={basePath}
      title={title}
      pageTitle={title}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          Här hittar du Dexies roadmap och planerade funktioner. Se vad som
          kommer härnäst och hur projektet utvecklas.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <Chip
            label={`${allDocs.length} dokument`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${navigation.subcategories.length} kategorier`}
            color="secondary"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Rot-dokument */}
      {navigation.docs.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Kommande funktioner
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 2,
            }}
          >
            {navigation.docs.map((doc) => (
              <Card
                key={doc.slug.join("/")}
                component={Link}
                href={`/${basePath}/${doc.slug.join("/")}`}
                sx={{
                  height: "100%",
                  textDecoration: "none",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {doc.metadata.title || doc.slug[doc.slug.length - 1]}
                  </Typography>
                  {doc.metadata.description && (
                    <Typography variant="body2" color="text.secondary">
                      {doc.metadata.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Kategorier */}
      {navigation.subcategories.length > 0 && (
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Kategorier
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 3,
            }}
          >
            {navigation.subcategories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category}
                basePath={basePath}
              />
            ))}
          </Box>
        </Box>
      )}
    </DocsLayout>
  )
}
