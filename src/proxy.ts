import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isPublicPath =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/auth') ||
    pathname === '/';

  if (isPublicPath && token) {
    if (token.role === 'influencer') {
      return NextResponse.redirect(new URL('/influencer-dashboard', req.url));
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/influencer-dashboard/:path*',
    '/login',
    '/register',
    '/register-role',
  ],
};