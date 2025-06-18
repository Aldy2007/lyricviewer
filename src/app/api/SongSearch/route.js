import { NextResponse } from 'next/server';

export async function GET(request) {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('keywords'); // 从查询参数获取关键词

    if (!searchTerm) {
        return NextResponse.json({ results: [] }); // 如果没有提供搜索词，返回空数组
    }

    try {
        // 代理请求到外部 API
        const apiUrl = `https://ncmapi.aldyh.top/search?keywords=${encodeURIComponent(searchTerm)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        // 处理返回的 JSON 数据并解码需要的信息
        const songs = data.result.songs.map((song) => ({
            id: song.id,
            name: song.name,
            artists: song.artists.map(artist => artist.name).join(', '),
            // image: song.album.picid,
        }));

        return NextResponse.json({ results: songs });
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        return NextResponse.json({ results: [] }); // 如果出错，返回空数组
    }
}
