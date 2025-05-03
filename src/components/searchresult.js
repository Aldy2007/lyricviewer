import * as React from 'react';
import Link from 'next/link';
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';

// 调用 Next.js 后端 API 获取搜索结果
const fetchSearchResults = async (searchTerm) => {
    if (!searchTerm) return [];
    const res = await fetch(`/api/search?keywords=${searchTerm}`); // 调用本地的 API 路由
    const data = await res.json();
    return data.results || [];
};

const SearchResults = ({ searchTerm }) => {
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // 当 searchTerm 变化时触发 API 请求
    React.useEffect(() => {
        if (!searchTerm) {
            setResults([]); // 如果没有搜索词，清空结果
            return;
        }

        setLoading(true);
        fetchSearchResults(searchTerm)
            .then((data) => {
                setResults(data); // 设置搜索结果
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
                setLoading(false);
            });
    }, [searchTerm]);

    if (loading) {
        return (
            <Grid container justifyContent="center" marginTop={2}>
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <Grid container spacing={4} marginTop={2} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {results.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    No results found.
                </Typography>
            ) : (
                results.map((result, index) => (
                    <Grid item key={index} sx={{ flex: '1 0 21%', maxWidth: '21%', marginBottom: 4 }}> {/* 增加底部的间距 */}
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={result.image || 'https://via.placeholder.com/150'} // 专辑图片
                                alt={result.name}
                            />
                            <CardContent>
                                <Link href={`/lyric?id=${result.id}`} passHref>
                                    <Typography variant="h6" component="a">
                                        {result.name} {/* 歌曲名称 */}
                                    </Typography>
                                </Link>
                                <Typography variant="body2" color="textSecondary">
                                    {result.artists} {/* 歌手 */}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default SearchResults;
