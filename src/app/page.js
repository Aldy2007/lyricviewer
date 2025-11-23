'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import ToolCard from '@/components/toolcard';

export default function Home() {
  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ToolCard 
            title="歌词查看"
            link="/tools/lyrics"
          />
          <ToolCard 
            title="邮件查看"
            link="/tools/email"
          />
          <ToolCard
            title="图床"
            link="/tools/upload"
          />
          <ToolCard
            title="KV 数据库管理"
            link="/tools/kv"
          />
        </Box>
      </Container>
    </Box>
  );
}
