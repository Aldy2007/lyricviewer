'use client';
import React from 'react';
import KVManager from '@/components/kvmanager';
import { Box } from '@mui/material';

export default function KVPage() {
  return (
    <Box sx={{ py: 4 }}>
      <KVManager />
    </Box>
  );
}
