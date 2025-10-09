import { Box, Typography } from "@mui/material"
import ButtonWidget, { ButtonWidgetProps } from "../shared/Button"
import { HeroWidgetSettings } from "@/types/widgets"

interface HeroWidgetProps {
  preHeading: string
  heading: string | React.ReactNode
  text: string
  background: string
  contentRight?: React.ReactNode
  contentRightWidthPercentage?: number
  contentBottom?: React.ReactNode
  buttons: ButtonWidgetProps[]
  settings?: HeroWidgetSettings
}

export default function HeroWidget({
  preHeading,
  heading,
  text,
  background,
  contentRight,
  contentRightWidthPercentage = 50,
  contentBottom,
  buttons,
  settings: {
    textColor = "#000000",
    containerWidth = "default",
    textWidth = "100%",
    height = "100vh",
    overlayStrength,
    textAlignment = "left",
    verticalTextAlignment = "center",
  } = {},
}: HeroWidgetProps) {
  // Container width mapping
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

  // Text alignment mapping for flexbox
  const getJustifyContent = () => {
    switch (textAlignment) {
      case "center":
        return "center"
      case "right":
        return "flex-end"
      case "space-around":
        return "space-around"
      case "space-between":
        return "space-between"
      case "space-evenly":
        return "space-evenly"
      case "left":
      default:
        return "flex-start"
    }
  }

  // Vertical alignment mapping
  const getAlignItems = () => {
    switch (verticalTextAlignment) {
      case "top":
        return "flex-start"
      case "bottom":
        return "flex-end"
      case "center":
      default:
        return "center"
    }
  }

  // Determine if overlay should be light or dark based on text color
  const getOverlayColor = () => {
    if (!overlayStrength) return "transparent"

    // Simple brightness calculation - if text is light, overlay should be dark
    const hex = textColor.replace("#", "")
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    const opacity = parseInt(overlayStrength.replace("%", "")) / 100
    return brightness > 128
      ? `rgba(0, 0, 0, ${opacity})` // Dark overlay for light text
      : `rgba(255, 255, 255, ${opacity})` // Light overlay for dark text
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: {
          xs: "auto", // Auto height on small screens
          md: height, // Fixed height on medium and larger screens
        },
        minHeight: {
          xs: contentBottom ? "auto" : "100vh", // Auto height if contentBottom exists on small screens
          md: "auto",
        },
        display: "flex",
        flexDirection: {
          xs: "column", // Column layout on small screens to stack content
          md: "row", // Default flex direction for larger screens
        },
        justifyContent: {
          xs: "flex-start", // Start from top on small screens
          md: "center",
        },
        alignItems: {
          xs: "stretch", // Stretch to full width on small screens
          md: getAlignItems(),
        },
        position: "relative",
        "&::before": overlayStrength
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: getOverlayColor(),
              zIndex: 1,
            }
          : {},
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "100%", // Full width on small screens
            md: getContainerMaxWidth(),
          },
          width: "100%",
          padding: {
            xs: 2, // Less padding on small screens
            md: 4,
          },
          paddingTop: {
            xs: 8, // More top padding if no bottom content on small screens
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: {
            xs: "center", // Space between content and bottom on small screens
            md: contentRight ? "space-between" : getJustifyContent(),
          },
          alignItems: {
            xs: "center", // Center align on small screens
            md: getAlignItems(),
          },
          position: "relative",
          zIndex: 2,
          flex: 1, // Take up available space
          minHeight: {
            xs: "auto", // Full height if contentBottom exists
            md: "auto",
          },
        }}
      >
        {/* Main content wrapper */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // Always column on small screens
              md: contentRight ? "row" : "column", // Row if contentRight exists on medium+ screens
            },
            justifyContent: {
              xs: "center", // Center content on small screens
              md: contentRight ? "space-between" : getJustifyContent(),
            },
            alignItems: {
              xs: "center", // Center align on small screens
              md: getAlignItems(),
            },
            gap: {
              xs: 3, // Consistent gap on small screens
              md: contentRight ? 4 : 0,
            },
            flex: 1, // Take up available space above contentBottom
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%", // Full width on small screens
                md: contentRight
                  ? `${100 - contentRightWidthPercentage}%`
                  : textWidth,
              },
              color: textColor,
              textAlign: {
                xs: "center", // Center text on small screens
                md:
                  textAlignment === "left" ||
                  textAlignment === "center" ||
                  textAlignment === "right"
                    ? textAlignment
                    : "left", // For space-* values, use left alignment within the text box
              },
            }}
          >
            {preHeading && (
              <Typography
                variant="overline"
                component="div"
                sx={{
                  color: "inherit",
                  fontSize: "14px",
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                {preHeading}
              </Typography>
            )}
            <Typography
              variant="h1"
              sx={{
                color: "inherit",
                fontSize: {
                  xs: "10vw", // Smaller on mobile
                  md: "60px",
                },
              }}
            >
              {heading}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "inherit",
                fontSize: {
                  xs: "18px", // Smaller on mobile
                  md: "23px",
                },
                mt: {
                  xs: 2, // Less margin on mobile
                  md: 4,
                },
                mb: {
                  xs: 4, // Less margin on mobile
                  md: 6,
                },
              }}
            >
              {text}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {buttons.map((buttonProps, index) => (
                <ButtonWidget
                  key={index}
                  {...buttonProps}
                  sx={{
                    mr: 2,
                  }}
                />
              ))}
            </Box>
          </Box>
          {contentRight && (
            <Box
              sx={{
                width: {
                  xs: "100%", // Full width on small screens
                  md: `${contentRightWidthPercentage}%`,
                },
                zoom: {
                  xs: "0.8",
                  sm: 1,
                },
                padding: {
                  xs: 2, // Padding around contentRight on small screens
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {contentRight}
            </Box>
          )}
        </Box>
      </Box>
      {/* Content bottom - flows naturally on small screens, absolute on larger */}
      {contentBottom && (
        <Box
          sx={{
            position: {
              xs: "relative", // Natural flow on small screens
              md: "absolute", // Absolute positioning on larger screens
            },
            bottom: {
              xs: "auto", // No bottom positioning on small screens
              md: 0,
            },
            left: {
              xs: "auto",
              md: 0,
            },
            right: {
              xs: "auto",
              md: 0,
            },
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: {
              xs: 2, // Less padding on small screens
              md: 4,
            },
            zIndex: 2,
            mt: {
              xs: 4, // Add margin top on small screens to separate from main content
              md: 0,
            },
          }}
        >
          {contentBottom}
        </Box>
      )}
    </Box>
  )
}
