import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safeCallback(url: string | null): string {
  if (!url) return '/dashboard'
  if (!url.startsWith('/')) return '/dashboard'
  return url
}
