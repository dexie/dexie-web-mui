import MDXContent from "@/components/content/docs/MDXContent";
import { Doc, serializeMarkdown } from "@/utils/mdx";
import { Box, Breadcrumbs, Container, Typography, Link as MuiLink, Divider } from "@mui/material";
import Link from "next/link";


export async function PlainMdPage(doc: Doc, currentSlug: string) {
  const mdxContent = await serializeMarkdown(doc.content);
  return <Container maxWidth={false} sx={{ padding: 0, pt: "100px" }}>
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          paddingTop: { xs: 8, md: 3 },
          paddingBottom: 2,
          marginBottom: 3,
          flex: 1,
          paddingLeft: { xs: 2, md: 4 },
          paddingRight: { xs: 2, md: 4 },
          width: { xs: "100%", md: `100%` }
        }}
      >
        <Box
          sx={{
            "& a": {
              color: "#c77dff !important",
              textDecoration: "none",
              "&:hover": { color: "white !important" },
            },
            "& li:hover": { background: "transparent" },
          }}
        >
          <MDXContent source={mdxContent} highlightSearchTerms={false} />
          <div style={{ height: '20vh' }}></div>
        </Box>
      </Box>
    </Box>
  </Container>
}
