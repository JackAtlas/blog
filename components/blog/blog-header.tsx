'use client'

import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'
import { ThemeAndModeSwitcher } from '../theme-and-mode-switcher'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function BlogHeader() {
  const pathname = usePathname()

  return (
    <header className="shadow shadow-black/5">
      <div className="container min-h-17 flex">
        <div className="flex items-center text-2xl mr-4">
          JackAtlas
        </div>
        <div className="flex justify-between flex-1">
          <div className="flex">
            <Link
              className={cn(
                'flex items-center px-3 hover:text-primary',
                pathname === '/' ? 'text-primary' : ''
              )}
              href="/"
            >
              首页
            </Link>
            <Link
              className={cn(
                'flex items-center px-3',
                pathname.startsWith('/categor') ? 'text-primary' : ''
              )}
              href="/categories"
            >
              栏目
            </Link>
            <Link
              className={cn(
                'flex items-center px-3',
                pathname.startsWith('/tags') ? 'text-primary' : ''
              )}
              href="/tags"
            >
              标签
            </Link>
            <Link
              className={cn(
                'flex items-center px-3',
                pathname.startsWith('/archives') ? 'text-primary' : ''
              )}
              href="/archives"
            >
              归档
            </Link>
            <Link
              className={cn(
                'flex items-center px-3',
                pathname.startsWith('/about') ? 'text-primary' : ''
              )}
              href="/about"
            >
              关于
            </Link>
          </div>
          <div className="flex items-center">
            <ThemeAndModeSwitcher />
            <a
              href="https://github.com/jackatlas"
              className="flex items-center px-5 py-3 hover:text-primary"
              target="_blank"
              title="https://github.com/jackatlas"
            >
              <FaGithub />
            </a>
            {/* <a
              href="javascript:void(0)"
              className="flex items-center px-5 py-3 hover:bg-[#fafafa] hover:text-[#3273dc]"
              title="搜索"
            >
              <LuSearch />
            </a> */}
          </div>
        </div>
      </div>
    </header>
  )
}
