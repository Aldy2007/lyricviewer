
'use client';

import * as React from 'react';
import { Container, CircularProgress, Button } from '@mui/material';
import Link from 'next/link';
import LyricDetail from '@/components/lyricdetail';

export default function LyricPage({ params }) {
    const { id } = params; // 直接解构 params
    const [lyricsData, setLyricsData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    // 当 id 存在时请求歌词数据
    React.useEffect(() => {
        if (!id) {
            setLoading(false);
            return; // 如果没有 id，停止请求
        }

        const fetchLyrics = async () => {
            setLoading(true); // 启动加载
            try {
                const res = await fetch(`/api/detail?id=${id}`);
                if (!res.ok) {
                    console.error('Error fetching lyrics:', res.status);
                    setLyricsData(null);
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setLyricsData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLyricsData(null);
                setLoading(false);
            }
        };

        fetchLyrics();
    }, [id]); // 当 id 发生变化时重新请求歌词数据

    // 加载中状态
    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    // 如果没有获取到数据
    if (!lyricsData) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                <h3>没有找到歌词数据</h3>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center', position: 'relative', '@media print': { display: 'block', mt: 0 } }}>
            {/* 返回按钮 */}
            <Link href="/" passHref>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        padding: 0,
                        minWidth: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                        '@media print': { display: 'none' },
                    }}
                >
                    <span style={{ fontSize: '20px', color: 'white' }}>←</span>
                </Button>
            </Link>

            {/* 打印按钮 */}
            <Button
                variant="contained"
                color="secondary"
                onClick={() => window.print()}
                sx={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    padding: 0,
                    minWidth: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                    '@media print': { display: 'none' },
                }}
            >
                <span style={{ fontSize: '20px', color: 'white' }}>🖨️</span>
            </Button>

            <LyricDetail
                lyrics={lyricsData.lyric}
                tlyrics={lyricsData.tlyric}
            />
        </Container>
    );
}

