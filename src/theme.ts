// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#C09933", // 落ち着いたゴールド
    },
    secondary: {
      main: "#6d6d6d",
    },
    background: {
      default: "#f9f7f3",
      paper: "#ffffff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontFamily: `"Playfair Display", serif`,
      fontWeight: 700,
      fontSize: "3rem",
      letterSpacing: "0.5px",
    },
    h2: {
      fontFamily: `"Playfair Display", serif`,
      fontWeight: 600,
      fontSize: "2.2rem",
      letterSpacing: "0.5px",
    },
    h4: {
      fontFamily: `"Playfair Display", serif`,
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "0.5px",
    },
    subtitle1: {
      fontFamily: `"Noto Serif JP", serif`,
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f5d67c", // ゴールド調
    },
    secondary: {
      main: "#888",
    },
    background: {
      default: "#121212",
      paper: "rgba(255, 255, 255, 0.04)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cfcfcf",
    },
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontFamily: `"Playfair Display", serif`,
      fontWeight: 700,
      fontSize: "3rem",
      letterSpacing: "0.5px",
    },
    h2: {
      fontFamily: `"Playfair Display", serif`,
      fontWeight: 600,
      fontSize: "2.2rem",
      letterSpacing: "0.5px",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
        },
      },
    },
  },
});
