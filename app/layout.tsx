import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

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
    <html lang="zh-cmn-Hans">
      <body className="antialiased">
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
