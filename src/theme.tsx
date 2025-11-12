"use client"
import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles"

// Extend the theme interface to add custom background.main and discord color
declare module "@mui/material/styles" {
  interface TypeBackground {
    main: string
  }

  interface Palette {
    discord: PaletteColor
  }

  interface PaletteOptions {
    discord?: PaletteColorOptions
  }
}

// Extend Button props to include discord color
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    discord: true
  }
}
const theme = createTheme({
  cssVariables: true,
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  spacing: 8, // 8px base unit
  palette: {
    mode: "dark",
    background: {
      main: "#212529", // Dark background for navbar
      default: "#000000", // Main dark background
      paper: "rgba(255,255,255, 0.02) !important", // Very subtle white overlay
    },
    primary: {
      main: "#000000", // Bootstrap dark primary blue
      light: "#000000",
      dark: "#000000",
    },
    secondary: {
      main: "#c77dff", // Bootstrap dark primary blue
      light: "#e0b3ff",
      dark: "#9b59b6",
    },
    discord: {
      main: "#5865F2", // Discord Blurple
      light: "#7289DA",
      dark: "#4752C4",
    },
    text: {
      primary: "#dee2e6", // Main text color
      secondary: "#dee2e6bf", // Secondary text with opacity
    },
    success: {
      main: "#75b798",
      dark: "#0f5132",
    },
    warning: {
      main: "#ffda6a",
      dark: "#997404",
    },
    error: {
      main: "#ea868f",
      dark: "#842029",
    },
    info: {
      main: "#6edff6",
      dark: "#087990",
    },
    divider: "#495057",
  },
  typography: {
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontSize: 16, // 1rem = 16px
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "clamp(1.375rem, 1.375rem + 1.5vw, 2.5rem)",
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: "0.5rem",
      color: "#dee2e6",
    },
    h2: {
      fontSize: "clamp(1.325rem, 1.325rem + 0.9vw, 2rem)",
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: "0.5rem",
      color: "#dee2e6",
    },
    h3: {
      fontSize: "clamp(1.3rem, 1.3rem + 0.6vw, 1.75rem)",
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: "0.5rem",
      color: "#dee2e6",
    },
    h4: {
      fontSize: "clamp(1.275rem, 1.275rem + 0.3vw, 1.5rem)",
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: "0.5rem",
      color: "#dee2e6",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: "0.5rem",
      color: "#dee2e6",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: "0.5rem",
      color: "#dee2e6",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      marginBottom: "1rem",
      color: "#dee2e6",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#dee2e6bf", // with opacity
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.75,
      color: "#dee2e6",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      color: "#dee2e6bf",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
      color: "#dee2e680", // tertiary color
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 2.66,
      textTransform: "uppercase",
      color: "#dee2e680",
    },
    button: {
      lineHeight: 1.75,
      color: "#dee2e6",
      // MUI Button styles
      paddingLeft: "32px !important",
      paddingRight: "32px !important",
      paddingTop: "16px !important",
      paddingBottom: "15px !important",
      borderRadius: "4px !important",
      fontSize: "13px !important",
      fontWeight: 700,
      textTransform: "uppercase" as const,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#000000",
          color: "#dee2e6",
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.5,
          margin: 0,
          paddingRight: "0 !important",
        },
        "h1, h2, h3, h4, h5, h6": {
          marginTop: 0,
          marginBottom: "0.5rem",
          fontWeight: 500,
          lineHeight: 1.2,
          color: "#dee2e6",
        },
        p: {
          marginTop: 0,
          marginBottom: "1rem",
        },
        a: {
          color: "#ffffff", // White links as default
          opacity: 0.8, // Default opacity
          textDecoration: "underline",
          "&:hover": {
            opacity: 1, // Full opacity on hover
            textDecoration: "none", // No underline on hover
          },
          "&:visited": {
            color: "#ffffff",
            opacity: 0.8,
          },
        },
        "b, strong": {
          fontWeight: "bolder",
        },
        "small, .small": {
          fontSize: "0.875em",
        },
        hr: {
          margin: "1rem 0",
          color: "inherit",
          border: 0,
          borderTop: "1px solid",
          opacity: 0.25,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#343a40",
          color: "#dee2e6",
          borderColor: "#495057",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#212529",
          color: "#dee2e6",
          borderColor: "#495057",
          paddingRight: "0 !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          borderRadius: "0.375rem", // Bootstrap border radius
          fontWeight: 700,
          letterSpacing: "1.105px",
          fontSize: "13px !important",
          color: "rgba(255, 255, 255, 0.8)",
          // Discord color variants
          "&.MuiButton-containedDiscord": {
            backgroundColor: "#5865F2",
            color: "white",
            "&:hover": {
              backgroundColor: "#4752C4",
            },
          },
          "&.MuiButton-outlinedDiscord": {
            color: "#5865F2",
            borderColor: "#5865F2",
            "&:hover": {
              backgroundColor: "rgba(88, 101, 242, 0.1)",
              borderColor: "#4752C4",
            },
          },
          "&.MuiButton-textDiscord": {
            color: "#5865F2",
            "&:hover": {
              backgroundColor: "rgba(88, 101, 242, 0.1)",
            },
          },
          // Secondary color variants
          "&.MuiButton-outlinedSecondary": {
            color: "#c77dff",
            borderColor: "#c77dff",
            "&:hover": {
              backgroundColor: "rgba(199, 125, 255, 0.1)",
              borderColor: "#e0b3ff",
            },
          },
        },
        text: {
          textTransform: "none",
          color: "#dee2e6", // White text for text variant buttons
          fontSize: "17px !important",
          fontWeight: 500,
          letterSpacing: "0.5px",
          "&:hover": {
            color: "#dee2e6",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#212529",
            "& fieldset": {
              borderColor: "#495057",
            },
            "&:hover fieldset": {
              borderColor: "#6ea8fe",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6ea8fe",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#dee2e6bf",
          },
          "& .MuiOutlinedInput-input": {
            color: "#dee2e6",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#343a40",
          color: "#dee2e6",
          border: "1px solid #495057",
          borderRadius: "0.375rem",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#495057",
          opacity: 0.25,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "#dee2e6",
          "&:hover": {
            backgroundColor: "#2b3035",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiLink-root": {
            color: "#ffffff", // White links as default
            opacity: 0.8, // Default opacity
            "&:hover": {
              opacity: 1, // Full opacity on hover
            },
            "&:visited": {
              color: "#ffffff",
              opacity: 0.8,
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#dee2e6", // Theme white color (normal state)
          textDecoration: "none", // No underline
          "&:hover": {
            color: "#ffffff", // Pure white on hover
            textDecoration: "none", // No underline on hover
          },
          "&:visited": {
            color: "#dee2e6",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#343a40",
          color: "#dee2e6",
          border: "1px solid #495057",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.02)",
          },
        },
        head: {
          backgroundColor: "transparent",
          borderBottom: "2px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          color: "#dee2e6",
          "&:last-child": {
            borderRight: "none",
          },
        },
        head: {
          backgroundColor: "transparent",
          borderBottom: "2px solid rgba(255, 255, 255, 0.05)",
          fontWeight: 600,
          color: "#dee2e6",
        },
      },
    },
  },
})

export default theme
