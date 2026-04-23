import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const isLoggedIn = request.cookies.get('is_logged_in');

    if (!isLoggedIn && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isLoggedIn && request.nextUrl.pathname.startsWith('/login')) {
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