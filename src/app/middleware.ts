import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const isPublicPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/cadastro');

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL('/inicio', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
};
