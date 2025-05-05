
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

export default function RootLayout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <meta name="description" content="歌词查看网站，提供歌词内容和PDF下载功能，帮助你轻松查看并保存喜欢的歌词。" />
        <meta name="keywords" content="歌词查看, 歌词下载, PDF歌词, 歌曲, 音乐" />

        <meta property="og:title" content="歌词查看与PDF下载" />
        <meta property="og:description" content="浏览并下载你最喜欢的歌词，支持PDF格式。" />
        <meta property="og:image" content="链接到网站的缩略图" />
        <meta property="og:url" content="https://yourwebsite.com" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="歌词查看与PDF下载" />
        <meta name="twitter:description" content="浏览并下载你最喜欢的歌词，支持PDF格式。" />
        <meta name="twitter:image" content="链接到网站的缩略图" />

        <title>歌词查看与PDF下载</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppBar position="sticky" sx={{ '@media print': { display: 'none' } }}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Song Search
            </Typography>
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

