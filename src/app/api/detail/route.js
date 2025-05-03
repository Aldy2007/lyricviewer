
import { NextResponse } from 'next/server';

function ProcessLyric(lyric, tlyric, romalrc) {
    const timeStampRegex = /\[(.*?)\]/g;
    if (!tlyric) {
        lyric = lyric.replace(timeStampRegex, '');
        return [lyric, tlyric, romalrc];
    }
    const tlyric_firstTime = tlyric.match(timeStampRegex)[0];
    lyric = lyric.slice(lyric.indexOf(tlyric_firstTime) + tlyric_firstTime.length);
    lyric = lyric.replace(timeStampRegex, '');
    tlyric = tlyric.replace(timeStampRegex, '');
    return [lyric, tlyric, romalrc];
}
export async function GET(request) {
    const url = new URL(request.url);
    const songId= url.searchParams.get('id'); // 从查询参数获取关键词

    if (!songId) {
        return NextResponse.json({ results: [] }); // 如果没有提供搜索词，返回空数组
    }

    try {
        // 代理请求到外部 API
        const apiUrl = `https://ncmapi.aldyh.top/lyric?id=${encodeURIComponent(songId)}`;
        const res = await fetch(apiUrl);
        const data = await res.json()
        var lyric = data.lrc.lyric;
        var tlyric = data.tlyric.lyric || null;
        var romalrc = data.romalrc.lyric.replace(/\[(.*?)\]/g, '') || null;
        [lyric, tlyric, romalrc] = ProcessLyric(lyric, tlyric, romalrc);
        return NextResponse.json({lyric: lyric, tlyric: tlyric, romalrc: romalrc});
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        return NextResponse.json({ results: [] }); // 如果出错，返回空数组
    }
}
