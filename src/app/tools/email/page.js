'use client';
import React from 'react';
import EmailViewer from '@/components/emailviewer';
import { Box } from '@mui/material';

export default function EmailPage() {
  return (
    <Box sx={{ py: 4 }}>
      <EmailViewer />
    </Box>
  );
}
