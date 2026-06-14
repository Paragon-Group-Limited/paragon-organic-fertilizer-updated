import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/editor')) {
    // Payload stores auth as a cookie starting with the cookiePrefix ('payload' by default)
    // The token cookie name is '{cookiePrefix}-token'
    const hasToken = request.cookies.has('payload-token')

    if (!hasToken) {
      // Not logged in → send to Payload admin (which will show login page)
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Logged in → allow through to Puck editor
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/editor/:path*'],
}
