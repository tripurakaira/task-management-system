import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // enterprise blue
    },
    secondary: {
      main: '#0f766e',
    },
    background: {
      default: '#0b1120',
      paper: '#0f172a',
    },
    text: {
      primary: '#e5e7eb',
      secondary: '#9ca3af',
    },
  },
  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: 0.2,
    },
    h5: {
      fontWeight: 600,
      letterSpacing: 0.1,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: '1px solid rgba(148, 163, 184, 0.25)',
          boxShadow:
            '0 18px 45px rgba(15,23,42,0.85), 0 0 0 1px rgba(15,23,42,0.9)',
          background:
            'radial-gradient(circle at top left, rgba(59,130,246,0.14), transparent 55%), rgba(15,23,42,0.98)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
        containedPrimary: {
          backgroundImage:
            'linear-gradient(135deg, #2563eb, #4f46e5, #0ea5e9)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            'linear-gradient(90deg, rgba(15,23,42,0.95), rgba(30,64,175,0.96))',
          boxShadow: '0 18px 45px rgba(15,23,42,0.85)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f172a',
        },
      },
    },
  },
})

export default theme
