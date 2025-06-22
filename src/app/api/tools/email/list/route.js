import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (!password) {
        return NextResponse.json({ status: 'error', message: '密码不能为空' });
    }

    try {
        const response = await fetch(`https://api.vercel.aldyh.top/mail/recent_emails?password=${password}`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching emails:', error);
        return NextResponse.json({ status: 'error', message: '获取邮件失败' });
    }
}
