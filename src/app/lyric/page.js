'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, CircularProgress, Button } from '@mui/material';
import Link from 'next/link';  // 导入 Link 组件
import LyricDetail from '@/components/lyricdetail';
import { Suspense } from 'react';

export default function LyricPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // 获取URL中的id参数
    const [lyricsData, setLyricsData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    // 只在组件加载时执行一次
    React.useEffect(() => {
        if (!id) {
            setLoading(false); // 如果没有id，结束加载
            return;
        }
        const fetchLyrics = async () => {
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
                setLoading(false);
            }
        };
        fetchLyrics();
    }, [id]); // 加入id作为依赖项，当id发生变化时重新请求歌词

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
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center', position: 'relative' }}>
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
                    }}
                >
                    <span style={{ fontSize: '20px', color: 'white' }}>←</span>
                </Button>
            </Link>

            <Suspense fallback={<CircularProgress />}>
                <LyricDetail
                    lyrics={lyricsData.lyric}
                    tlyrics={lyricsData.tlyric}
                />
            </Suspense>
        </Container>
    );
}
