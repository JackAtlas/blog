'use client'

import Link from 'next/link'
import { AiOutlineDashboard } from 'react-icons/ai'
import { LuList, LuSearch } from 'react-icons/lu'
import { ThemeAndModeSwitcher } from '../theme-and-mode-switcher'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useQueries } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui'
import { Article, Category, Tag } from '@/generated/prisma'
import { useSession } from 'next-auth/react'

export default function BlogHeader() {
  const { status } = useSession()

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (search) {
          router.push(search.split(' ')[0])
          setOpen(false)
          setSearch('')
        }
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  })

  const { data } = useQueries({
    queries: [
      {
        queryKey: ['articles'],
        queryFn: async () => {
          const res = await fetch('/api/articles')

          if (!res.ok) {
            throw new Error(await res.json())
          } else {
            return await res.json()
          }
        }
      },
      {
        queryKey: ['categories'],
        queryFn: async () => {
          const res = await fetch('/api/categories')

          if (!res.ok) {
            throw new Error(await res.json())
          } else {
            return await res.json()
          }
        }
      },
      {
        queryKey: ['tags'],
        queryFn: async () => {
          const res = await fetch('/api/tags')

          if (!res.ok) {
            throw new Error(await res.json())
          } else {
            return await res.json()
          }
        }
      }
    ],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending)
      }
    }
  })

  const [articles, categories, tags] = data || [[], [], []]

  return (
    <header className="blog-container flex gap-2 md:gap-4 2xl:gap-6 shadow shadow-black/5">
      <div className="flex items-center text-2xl md:text-3xl 2xl:text-4xl">
        JackAtlas
      </div>
      <div className="flex justify-end sm:justify-between flex-1">
        <div className="hidden sm:flex md:text-lg 2xl:text-xl break-keep">
          <Link
            className={cn(
              'flex items-center px-2 md:px-4 2xl:px-6 hover:text-primary',
              pathname === '/' ? 'text-primary' : ''
            )}
            href="/"
          >
            首页
          </Link>
          <Link
            className={cn(
              'flex items-center px-2 md:px-4 2xl:px-6 hover:text-primary',
              pathname.startsWith('/categor') ? 'text-primary' : ''
            )}
            href="/categories"
          >
            栏目
          </Link>
          <Link
            className={cn(
              'flex items-center px-2 md:px-4 2xl:px-6 hover:text-primary',
              pathname.startsWith('/tags') ? 'text-primary' : ''
            )}
            href="/tags"
          >
            标签
          </Link>
          <Link
            className={cn(
              'flex items-center px-2 md:px-4 2xl:px-6 hover:text-primary',
              pathname.startsWith('/archives') ? 'text-primary' : ''
            )}
            href="/archives"
          >
            归档
          </Link>
          <Link
            className={cn(
              'flex items-center px-2 md:px-4 2xl:px-6 hover:text-primary',
              pathname.startsWith('/project') ? 'text-primary' : ''
            )}
            href="/projects"
          >
            项目
          </Link>
          <Link
            className={cn(
              'flex items-center px-2 md:px-4 2xl:px-6 hover:text-primary',
              pathname.startsWith('/about') ? 'text-primary' : ''
            )}
            href="/about"
          >
            关于
          </Link>
        </div>
        <div className="flex items-center">
          <ThemeAndModeSwitcher className="mr-2 md:mr-4" />
          <div>
            <div
              className="flex items-center p-2 md:p-4 2xl:p-6 hover:text-primary cursor-pointer"
              title="搜索"
              onClick={() => setOpen(true)}
            >
              <LuSearch size={20} />
            </div>
          </div>
          {status === 'authenticated' && (
            <Link
              className="hidden sm:flex items-center p-2 md:p-4 2xl:p-6 hover:text-primary"
              href="/dashboard"
            >
              <AiOutlineDashboard size={20} />
            </Link>
          )}
          <CommandDialog
            open={open}
            onOpenChange={setOpen}
            commandProps={{
              value: search,
              onValueChange: setSearch
            }}
          >
            <CommandInput placeholder="搜索栏目、标签、文章……"></CommandInput>
            <CommandList>
              <CommandEmpty>没有结果。</CommandEmpty>
              <CommandGroup heading="栏目">
                {categories?.map((category: Category) => (
                  <CommandItem
                    key={category.id}
                    value={`/categories/${category.name}`}
                  >
                    <Link
                      href={`/categories/${category.name}`}
                      onClick={() => setOpen(false)}
                      className="flex-1 px-4"
                    >
                      {category.name}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="标签">
                {tags?.map((tag: Tag) => (
                  <CommandItem
                    key={tag.id}
                    value={`/tags/${tag.name}`}
                  >
                    <Link
                      href={`/tags/${tag.name}`}
                      onClick={() => setOpen(false)}
                      className="flex-1 px-4"
                    >
                      {tag.name}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="文章">
                {articles?.map((article: Article) => (
                  <CommandItem
                    key={article.id}
                    value={`/articles/${article.slug} ${article.title}`}
                  >
                    <Link
                      href={`/articles/${article.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex-1 px-4"
                    >
                      {article.title}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
          <div className="block sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center p-2 md:p-4 2xl:p-6 hover:text-primary cursor-pointer">
                  <LuList size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/">首页</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/categories">栏目</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/tags">标签</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/archives">归档</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/projects">项目</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/about">关于</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/dashboard">后台</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
