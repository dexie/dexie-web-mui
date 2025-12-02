import React from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import LaunchIcon from "@mui/icons-material/Launch"
import CheckIcon from "@mui/icons-material/Check"

export interface BlogPostItem {
  id: number
  delay?: string
  imgSrc: string
  title: string
  text: string
  authorImg: string
  authorName: string
  date: string
  link: string
  keyPoints: string[]
}

interface BlogPostsWidgetProps {
  items: BlogPostItem[]
  sectionTitle?: string
  sectionSubtitle?: string
  textColor?: string
  backgroundColor?: string
  containerWidth?: "small" | "big" | "default"
}

export default function BlogPostsWidget({
  items,
  sectionTitle = "Get started in seconds",
  sectionSubtitle = "Accelerate your development with templates built by us and our community.",
  textColor = "#dee2e6",
  backgroundColor = "#000000",
  containerWidth = "default",
}: BlogPostsWidgetProps) {
  const getContainerMaxWidth = () => {
    switch (containerWidth) {
      case "small":
        return "600px"
      case "big":
        return "1400px"
      case "default":
      default:
        return "1200px"
    }
  }

  return (
    <Box
      component="section"
      sx={{
        backgroundColor,
        color: textColor,
        py: 16,
        minHeight: "auto",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: getContainerMaxWidth(),
          position: "relative",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h1"
            component={"h2"}
            sx={{
              color: textColor,
              fontSize: { xs: "2.5rem", md: "56px" },
              fontWeight: "500 !important",
              mb: 2,
            }}
          >
            {sectionTitle}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: textColor,
              opacity: 0.8,
              fontWeight: 400,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            {sectionSubtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                backgroundColor: "#000000",
                color: textColor,
                width: { xs: "100%", md: "30%" },
                minHeight: "420px",
                display: "flex",
                flexDirection: "column",
                padding: "40px !important",
              }}
            >
              <CardContent
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: textColor, fontWeight: 600, mb: 2 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: textColor, opacity: 0.8, mb: 8 }}
                >
                  {item.text}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <List
                  sx={{
                    p: 0,
                    mt: "auto",
                    "& .MuiListItem-root:hover": {
                      borderRadius: "4px !important",
                      padding: "0px 10px !important",
                      margin: "0px -10px!important",
                      backgroundColor: "rgba(255, 255, 255, 0.075) !important",
                    },
                  }}
                >
                  {item.keyPoints.map((point, idx) => (
                    <ListItem
                      key={idx}
                      sx={{
                        p: "0px !important",
                        "& .MuiTypography-root": {
                          mb: "0px",
                        },
                        "& .MuiListItemText-root": {
                          m: "0px",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                        <CheckIcon
                          sx={{ color: textColor, fontSize: "1rem" }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={point}
                        sx={{
                          "& .MuiListItemText-primary": {
                            color: textColor,
                            fontSize: "0.9rem",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  startIcon={
                    <LaunchIcon
                      sx={{
                        height: "0.875rem",
                      }}
                    />
                  }
                  sx={{
                    borderColor: textColor,
                    color: textColor,
                    fontWeight: 400,
                    fontSize: "0.8rem",
                    padding: "0px 6px !important",
                    borderRadius: "3px !important",
                    border: `1px solid ${textColor}`,
                    opacity: 0.8,
                    "&:hover": {
                      color: textColor,
                      opacity: 1,
                    },
                  }}
                >
                  View Template
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
