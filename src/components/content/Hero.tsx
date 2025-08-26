import { Box, Typography } from "@mui/material"
import ButtonWidget, { ButtonWidgetProps } from "./shared/Button"
import TypeWriter from "./shared/TypeWriter"

interface HeroWidgetProps {
  preHeading: string
  heading: string | React.ReactNode
  text: string
  background: string
  buttons: ButtonWidgetProps[]
  settings?: {
    textColor?: string
    containerWidth?: "small" | "default" | "big"
    textWidth?: string // percentage as string, e.g. "30%"
    height?: string // percentage as string, e.g. "100%"
    overlayStrength?: string // percentage as string, e.g. "20%"
    textAlignment?:
      | "left"
      | "center"
      | "right"
      | "space-around"
      | "space-between"
      | "space-evenly"
    verticalTextAlignment?: "top" | "center" | "bottom"
  }
}

export default function HeroWidget({
  preHeading,
  heading,
  text,
  background,
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
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: getAlignItems(),
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
          maxWidth: getContainerMaxWidth(),
          width: "100%",
          padding: 4,
          display: "flex",
          justifyContent: getJustifyContent(),
          alignItems: getAlignItems(),
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: textWidth,
            color: textColor,
            textAlign:
              textAlignment === "left" ||
              textAlignment === "center" ||
              textAlignment === "right"
                ? textAlignment
                : "left", // For space-* values, use left alignment within the text box
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "inherit", fontSize: "14px", fontWeight: 500 }}
          >
            {preHeading}
          </Typography>
          <Typography variant="h1" sx={{ color: "inherit", fontSize: "60px" }}>
            {heading}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "inherit", fontSize: "23px", mt: 2, mb: 4 }}
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
      </Box>
    </Box>
  )
}
