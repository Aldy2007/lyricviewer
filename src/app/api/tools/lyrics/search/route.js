import { NextResponse } from 'next/server';

export async function GET(request) {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('keywords');

    if (!searchTerm) {
        return NextResponse.json({ results: [] });
    }

    try {
        const apiUrl = `https://ncmapi.aldyh.top/search?keywords=${encodeURIComponent(searchTerm)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        const songs = data.result.songs.map((song) => ({
            id: song.id,
            name: song.name,
            artists: song.artists.map(artist => artist.name).join(', '),
        }));

        return NextResponse.json({ results: songs });
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        return NextResponse.json({ results: [] });
    }
}
