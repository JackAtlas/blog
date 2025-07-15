import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import ReactQueryProvider from '@/providers/query-provider'

export const metadata: Metadata = {
  title: 'JackAtlas',
  description: '我的前端小站'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <html lang="zh-cmn-Hans">
        <body className="antialiased">
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  )
}
