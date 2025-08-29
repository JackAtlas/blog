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

export function ThemeAndModeSwitcher({
  className
}: {
  className?: string
}) {
  const themes = useThemeName()
  const { theme: mode, setTheme: setMode } = useTheme()
  const [appTheme, setAppTheme] = useState('caffeine')
  const [isMounted, setIsmounted] = useState(false)

  useEffect(() => {
    setIsmounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      const localTheme = localStorage.getItem('theme-name')
      if (localTheme) {
        setAppTheme(localTheme)
      }
      if (mode === 'dark') {
        document.documentElement.setAttribute(
          'data-color-mode',
          'dark'
        )
      } else {
        document.documentElement.setAttribute(
          'data-color-mode',
          'light'
        )
      }
      document.documentElement.setAttribute('data-theme', appTheme)
    }
  }, [mode, appTheme, isMounted])

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
    if (mode === 'light') {
      document.documentElement.setAttribute('data-color-mode', 'dark')
    } else {
      document.documentElement.setAttribute(
        'data-color-mode',
        'light'
      )
    }
  }

  return (
    <div className={cn('flex gap-2', className)}>
      <Select
        value={appTheme}
        onValueChange={(value) => {
          localStorage.setItem('theme-name', value)
          setAppTheme(value)
        }}
      >
        <SelectTrigger>
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {themes.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isMounted && (
        <Button
          onClick={() => toggleMode()}
          className="cursor-pointer"
        >
          {mode === 'light' ? <LuMoon /> : <FaSun />}
        </Button>
      )}
    </div>
  )
}
