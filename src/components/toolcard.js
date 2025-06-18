'use client';
import * as React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ToolCard({ title, link }) {
  const router = useRouter();

  return (
    <Card sx={{ 
      width: '100%',
      maxWidth: 300,
      margin: '0 auto',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3,
      }
    }}>
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 3,
      }}>
        <Typography variant="h5" component="h2" textAlign="center">
          {title}
        </Typography>
        <Button 
          variant="contained" 
          fullWidth
          onClick={() => router.push(link)}
          sx={{ mt: 1 }}
        >
          立即使用
        </Button>
      </CardContent>
    </Card>
  );
}
