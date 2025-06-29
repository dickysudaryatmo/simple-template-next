import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const publicRoutes = ['/login', '/register']
const authRoutes = ['/login', 'register']
const DEFAULT_LOGIN_REDIRECT = '/dashboard'

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const pathname = nextUrl.pathname

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isAuthenticated = !!token

  // Special handling for root path
  if (pathname === '/') {
    return NextResponse.next() // Let the page.tsx handle the redirect
  }

  // Handle auth routes
  if (authRoutes.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  // Handle protected routes
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    // Create callback URL without encoding the entire URL
    let callbackUrl = pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    // Only set callbackUrl if it's not empty and not the root
    const redirectUrl = callbackUrl ? `/login?callbackUrl=${callbackUrl}` : '/login'
    return NextResponse.redirect(new URL(redirectUrl, nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)'],
}