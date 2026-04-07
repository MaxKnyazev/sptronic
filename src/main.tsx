import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appRouter } from './app/providers/router';
import { appTheme } from './app/providers/theme';
import './app/styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  </StrictMode>,
);
