
import * as React from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemText, Typography, CircularProgress, Box } from '@mui/material';

// 调用 Next.js 后端 API 获取搜索结果
const fetchSearchResults = async (searchTerm) => {
    if (!searchTerm) return [];
    const res = await fetch(`/api/tools/lyrics/search?keywords=${searchTerm}`);
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
            <Box display="flex" justifyContent="center" marginTop={2}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box marginTop={2}>
            {results.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    No results found.
                </Typography>
            ) : (
                <List>
                    {results.map((result, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={
                                    <Link href={`/lyric/${result.id}`} passHref>
                                        <Typography variant="h6" component="a" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                            {result.name} {/* 歌曲名称 */}
                                        </Typography>
                                    </Link>
                                }
                                secondary={
                                    <Typography variant="body2" color="textSecondary">
                                        {result.artists} {/* 歌手 */}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default SearchResults;

