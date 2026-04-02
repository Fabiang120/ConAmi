import { NextResponse } from 'next/server'

function isPublicRoute(pathname) {
    return (
        pathname === "/" ||
        pathname === "/Login" ||
        pathname === "/SignUp"
    );
}

export function proxy(request) {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("access_token")?.value;
    if (!accessToken && !isPublicRoute(pathname)) {
        return NextResponse.redirect(new URL("/Login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/Home/:path*",
        "/Profile/:path*",
        "/ChatRoom/:path*",
        "/Settings/:path*",
        "/Self-Evaluation/:path*",
        "/TermsAndServices/:path*",
    ],
};