'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import { TextField, Box } from '@mui/material';
import SearchResults from '@/components/searchresult';

export default function LyricsSearch() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState('');

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <TextField
          id="SongInfo"
          label="搜索歌词"
          placeholder="输入歌曲名称或歌手"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchResults searchTerm={debouncedSearchTerm} />
      </Container>
    </Box>
  );
}
