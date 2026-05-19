import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/dashboard', '/propuestas', '/plantillas'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('cootravir_token');
  if (!token?.value) {
    const login = new URL('/login', request.url);
    login.searchParams.set('from', pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/propuestas/:path*', '/plantillas', '/plantillas/:path*'],
};
