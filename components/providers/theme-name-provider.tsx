'use client'

import { getThemes } from '@/lib/themes'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

const ThemeNameContext = createContext<string[] | null>(null)

export function ThemeNameProvider({
  children
}: {
  children: ReactNode
}) {
  const [themes, setThemes] = useState<string[]>([])

  useEffect(() => {
    getThemes().then(setThemes)
  }, [])

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
