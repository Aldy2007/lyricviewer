
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Link from 'next/link';

export default function RootLayout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <meta name="description" content="工具" />
        <meta name="keywords" content="工具" />

        <meta property="og:title" content="工具" />
        <meta property="og:description" content="工具" />
        <meta property="og:image" content="" />

        <title>tools</title>
        
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppBar position="sticky" sx={{ '@media print': { display: 'none' } }}>
          <Toolbar>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  '&:hover': { 
                    cursor: 'pointer',
                    opacity: 0.8 
                  },
                  transition: 'opacity 0.2s'
                }}
              >
                工具
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

