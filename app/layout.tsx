import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import {
  AppProviders,
  ThemeNameProvider
} from '@/components/providers'

export const metadata: Metadata = {
  title: 'JackAtlas',
  description: '我的前端小站'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const dirPath = path.join(process.cwd(), 'themes')
  const files = fs.readdirSync(dirPath)
  const themes = files.map((file) => file.replace('.css', ''))
  return (
    <SessionProvider>
      <html lang="zh-cmn-Hans" suppressHydrationWarning>
        <body className="antialiased">
          <ThemeNameProvider themes={themes}>
            <AppProviders>{children}</AppProviders>
          </ThemeNameProvider>
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  )
}
