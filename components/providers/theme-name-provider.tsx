'use client'

import { createContext, ReactNode, useContext } from 'react'

const ThemeNameContext = createContext<string[] | null>(null)

export function ThemeNameProvider({
  children,
  themes
}: {
  children: ReactNode
  themes: string[]
}) {
  return (
    <ThemeNameContext.Provider value={themes}>
      {children}
    </ThemeNameContext.Provider>
  )
}

export function useThemeName() {
  const themes = useContext(ThemeNameContext)
  if (!themes) {
    throw new Error(
      'useThemeName must be used within a ThemeNameProvider'
    )
  }
  return themes
}
