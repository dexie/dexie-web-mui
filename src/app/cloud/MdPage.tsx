import DocsLayout from "@/components/content/docs/DocsLayout";
import { Doc, generateNavigation, serializeMarkdown } from "@/utils/mdx";
import { Box, Typography } from "@mui/material";


export async function MdPage(doc: Doc, decodedSlugString: string) {
  const mdxContent = await serializeMarkdown(doc.content);
  const navigation = generateNavigation()
  return (
    <DocsLayout
      navigation={navigation}
      currentSlug={decodedSlugString} // Use decoded slug for display
      pageTitle={doc.metadata.title}
      mdxSource={mdxContent}
    >
      <Box component="article">
        <Box component="header" sx={{ mb: 5 }}>
          <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
            {doc.metadata.title}
          </Typography>
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
            {decodedSlugString}
          </Typography>
        </Box>
      </Box>
    </DocsLayout>
  )

}
