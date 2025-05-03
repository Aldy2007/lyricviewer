'use client';
import * as React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

export default function LyricDetail({ lyrics, tlyrics, artist }) {
    // 将歌词按行分割
    const lyricLines = lyrics ? lyrics.split('\n') : [];
    const tlyricLines = tlyrics ? tlyrics.split('\n') : [];

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                        {artist}
                    </Typography>
                </Box>

                {/* 检查是否有歌词 */}
                <Box sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', lineHeight: 1.6 }}>
                    {lyricLines.length > 0 ? (
                        lyricLines.map((line, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
                                <Typography variant="body1" component="span" sx={{ flex: 1 }}>
                                    {line}
                                </Typography>
                                {tlyricLines[index] && (
                                    <Typography variant="body1" component="span" sx={{ flex: 1, color: 'textSecondary' }}>
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
