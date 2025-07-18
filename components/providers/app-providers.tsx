'use client'

import { ThemeProvider } from 'next-themes'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
