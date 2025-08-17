'use client'

import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'
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
  CommandSeparator
} from '@/components/ui'
import { Article, Category, Tag } from '@/generated/prisma'

export default function BlogHeader() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (search) {
          router.push(search)
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
            <div
              className="flex items-center px-5 py-3 hover:text-primary cursor-pointer"
              title="搜索"
              onClick={() => setOpen(true)}
            >
              <LuSearch />
            </div>
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
                      value={`/articles/${article.slug}`}
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
          </div>
        </div>
      </div>
    </header>
  )
}
