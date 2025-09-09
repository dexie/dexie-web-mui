import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SxProps,
  Theme,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"

interface SupportPlan {
  title: string
  price: string
  description: string
  features: string[]
}

interface SupportPlansWidgetProps {
  plans: SupportPlan[]
  settings?: {
    textColor?: string
    backgroundColor?: string
    containerWidth?: "small" | "medium" | "big"
    sectionTitle?: string
    sectionSubtitle?: string
  }
  sx?: SxProps<Theme>
}

export default function SupportPlansWidget({
  plans,
  settings = {},
  sx = {},
}: SupportPlansWidgetProps) {
  const {
    textColor = "#dee2e6",
    backgroundColor = "#000000",
    containerWidth = "big",
    sectionTitle = "Support Options",
    sectionSubtitle = "Choose the right level of support for your team and requirements",
  } = settings

  const getMaxWidth = () => {
    switch (containerWidth) {
      case "small":
        return "sm"
      case "medium":
        return "md"
      case "big":
        return "xl"
      default:
        return "xl"
    }
  }

  return (
    <Box sx={{ backgroundColor, py: 8, ...sx }}>
      <Container maxWidth={getMaxWidth()}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 2,
            color: textColor,
            fontWeight: 600,
          }}
        >
          {sectionTitle}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "#adb5bd",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {sectionSubtitle}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {plans.map((plan, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#1a1a1a",
                  border: "0px solid #333",
                  "&:hover": {
                    borderColor: "#555",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ color: textColor, fontWeight: 600 }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                    }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#adb5bd",
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    {plan.description}
                  </Typography>
                  <List sx={{ padding: 0 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem
                        key={featureIndex}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start !important",
                          alignContent: "flex-start !important",
                          p: "1px !important",
                          pb: "5px !important",
                          pl: "10px !important",
                          ml: "-10px !important",
                          borderRadius: "4px",
                          "& .MuiTypography-root": {
                            mb: "0px",
                          },
                          "& .MuiListItemText-root": {
                            m: "0px",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "auto",
                            mr: 1,
                            justifyContent: "flex-start",
                            alignContent: "flex-start",
                          }}
                        >
                          <CheckIcon
                            sx={{
                              fontSize: "16px",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              sx={{
                                color: textColor,
                                fontSize: "0.9rem",
                                lineHeight: 1.4,
                              }}
                            >
                              {feature}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export type { SupportPlan }
