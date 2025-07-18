import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AppProviders } from '@/components/providers/app-providers'

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
          <AppProviders>{children}</AppProviders>
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  )
}
