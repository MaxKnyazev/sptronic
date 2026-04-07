import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#8fb076' },
    secondary: { main: '#7f9770' },
    text: {
      primary: '#181818',
      secondary: '#4e4e4e',
    },
    background: {
      default: '#ffffff',
      paper: '#f3f8ee',
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Segoe UI", "Inter", sans-serif',
    h4: { fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { boxShadow: 'none' } },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 10, alignSelf: 'flex-start', width: 'auto', minWidth: 0 },
        contained: {
          backgroundColor: '#ffffff',
          color: '#1c1c1c',
          border: '1px solid #bccbab',
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#f7f7f7', boxShadow: 'none' },
          '&:active': { boxShadow: 'none' },
          '&.Mui-focusVisible': { boxShadow: 'none' },
        },
        outlined: {
          backgroundColor: '#ffffff',
          borderColor: '#bccbab',
          '&:hover': { backgroundColor: '#f7f7f7', borderColor: '#9db58a' },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.active': {
            backgroundColor: '#bfd4ab',
          },
          '&:hover': {
            backgroundColor: '#d5e3c8',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          '& fieldset': { borderColor: '#b8c8aa' },
          '&:hover fieldset': { borderColor: '#9db58a' },
          '&.Mui-focused fieldset': { borderColor: '#8fb076' },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: 10,
          marginRight: 8,
          minHeight: 40,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderColor: '#b8c8aa',
          '&.Mui-selected': {
            backgroundColor: '#dce9d0',
          },
        },
      },
    },
  },
});
