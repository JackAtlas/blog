import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@/auth'

export async function proxy(request: NextRequest) {
  const session = await auth()

  const isAdminRoute =
    request.nextUrl.pathname.startsWith('/dashboard')

  if (isAdminRoute && !session?.user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callback', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
