import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // On the 100vc domain, rewrite root to /100vc
  if (hostname.includes('100-vc') && pathname === '/') {
    return NextResponse.rewrite(new URL('/100vc', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
