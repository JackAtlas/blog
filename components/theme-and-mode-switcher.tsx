'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui'
import { FaSun } from 'react-icons/fa'
import { LuMoon } from 'react-icons/lu'
import { useThemeName } from './providers'
import { cn } from '@/lib/utils'
import { applyTheme } from '@/lib/themes'

export function ThemeAndModeSwitcher({
  className
}: {
  className?: string
}) {
  const themes = useThemeName()
  const { theme: mode, setTheme: setMode } = useTheme()

  const [appTheme, setAppTheme] = useState('caffeine')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const saved = localStorage.getItem('theme-name') || 'caffeine'
    setAppTheme(saved)
    applyTheme(saved)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.setAttribute(
      'data-color-mode',
      mode === 'dark' ? 'dark' : 'light'
    )
  }, [mode, mounted])

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={cn('flex gap-2', className)}>
      <Select
        value={appTheme}
        onValueChange={(value) => {
          setAppTheme(value)
          localStorage.setItem('theme-name', value)
          applyTheme(value)
        }}
      >
        <SelectTrigger className="md:text-base 2xl:text-lg">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {themes.map((t) => (
            <SelectItem
              key={t}
              value={t}
              className="md:text-base 2xl:text-lg"
            >
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {mounted && (
        <Button onClick={toggleMode} className="cursor-pointer">
          {mode === 'light' ? <LuMoon /> : <FaSun />}
        </Button>
      )}
    </div>
  )
}
