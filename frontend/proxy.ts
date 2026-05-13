import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const hasSession = request.cookies.has('laravel-session');

    if (!hasSession && request.nextUrl.pathname !== '/login') {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('error', 'session_expired');

        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('is_logged_in');
        return response;
    }

    if (hasSession && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// ミドルウェアを起動させるURL（ルート）を指定
export const config = {
    matcher: [
    /*
     * 適用したいパスを指定します。
     * '/' (TOP画面のみ) や '/dashboard/:path*' (ダッシュボード配下すべて) など
     * APIルートや静的ファイル(_next/static等)は除外するのが一般的です。
     */
    '/',
    '/activity/:path*',
    '/login',
    ],
}