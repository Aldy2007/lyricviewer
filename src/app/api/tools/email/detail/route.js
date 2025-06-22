import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const password = searchParams.get('password');

    if (!id || !password) {
        return NextResponse.json({ status: 'error', message: '参数错误' });
    }

    try {
        const response = await fetch(`https://api.vercel.aldyh.top/mail/fetch?id=${id}&password=${password}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching email detail:', error);
        return NextResponse.json({ status: 'error', message: '获取邮件详情失败' });
    }
}
