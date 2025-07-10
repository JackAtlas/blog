import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()

  const isAdminRoute =
    request.nextUrl.pathname.startsWith('/dashboard')

  if (isAdminRoute && !session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callback', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
