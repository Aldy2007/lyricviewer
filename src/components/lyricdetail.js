
'use client';

import * as React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

export default function LyricDetail({ lyrics, tlyrics, artist }) {
    // 将歌词按行分割
    const lyricLines = lyrics ? lyrics.split('\n') : [];
    const tlyricLines = tlyrics ? tlyrics.split('\n') : [];

    return (
        <Container maxWidth="md" sx={{ mt: 4, '@media print': { mt: 0 } }}>
            <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', '@media print': { boxShadow: 'none', padding: 0, backgroundColor: '#fff' } }}>
                <Box sx={{ textAlign: 'center', mb: 3, '@media print': { display: 'none' } }}>
                    <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                        {artist}
                    </Typography>
                </Box>

                {/* 检查是否有歌词 */}
                <Box sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: 1.6, '@media print': { fontSize: '12pt', lineHeight: 1.8, color: '#000' } }}>
                    {lyricLines.length > 0 ? (
                        lyricLines.map((line, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: 'row', mb: 1, '@media print': { display: 'block', mb: 0.5 } }}>
                                <Typography variant="body1" component="span" sx={{ flex: 1, '@media print': { display: 'block', fontFamily: '"Noto Sans CJK SC", sans-serif' } }}>
                                    {line}
                                </Typography>
                                {tlyricLines[index] && (
                                    <Typography variant="body1" component="span" sx={{ flex: 1, color: 'textSecondary', '@media print': { display: 'block', color: '#555', fontFamily: '"Noto Sans CJK SC", sans-serif' } }}>
                                        {tlyricLines[index]}
                                    </Typography>
                                )}
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            无歌词数据
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}

