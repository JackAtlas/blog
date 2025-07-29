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

const themes = ['default', 'pastel-dreams'] as const

export function ThemeAndModeSwitcher() {
  const { theme: mode, setTheme: setMode } = useTheme()
  const [appTheme, setAppTheme] = useState('default')

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-color-mode', 'dark')
    } else {
      document.documentElement.setAttribute(
        'data-color-mode',
        'light'
      )
    }
  }, [mode])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appTheme)
  }, [appTheme])

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
    <div className="flex gap-2 px-4">
      <Select
        defaultValue={appTheme}
        onValueChange={(value) => setAppTheme(value)}
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
      <Button onClick={() => toggleMode()} className="cursor-pointer">
        {mode === 'light' ? <LuMoon /> : <FaSun />}
      </Button>
    </div>
  )
}
