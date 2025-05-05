'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import { TextField,  Box } from '@mui/material';
import SearchResults from '@/components/searchresult';

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState('');

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 延迟 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      {/* 顶栏 */}
      

      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <TextField
          id="SongInfo"
          label="Search"
          placeholder="Name / Singer"
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
