'use client'

import { Button, Input } from '@/components/ui'
import { Article, Tag } from '@/generated/prisma'
import { cn } from '@/lib/utils'
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import MarkdownPreviewer from '@/components/markdown-preview'
import { useState } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import { toast } from 'sonner'

interface ExtendedTag extends Tag {
  articles: Article[]
}

export default function TagsPage() {
  const queryClient = useQueryClient()
  const [newTag, setNewTag] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<ExtendedTag | null>(
    null
  )
  const [selectedArticle, setSelectedArticle] =
    useState<Article | null>(null)

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await fetch('/api/tags')
      const data = await res.json()

      return data
    }
  })

  const createCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch('/api/tags', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '标签创建失败，未知错误')
      }
    },
    onSuccess: () => {
      toast.success('标签创建成功')
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '标签创建失败，未知错误'
      )
    }
  })

  return (
    <div className="h-full grid grid-cols-6 gap-6">
      <div className="p-4">
        <Input
          placeholder="回车创建新标签"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              createCategoryMutation.mutate(newTag)
              setNewTag('')
            }
          }}
        />
        {/* TODO: remove tag */}
        <ul className="mt-4">
          {tags?.map((tag: any) => (
            <li
              key={tag.id}
              className={cn(
                'px-4 py-2 cursor-pointer transition-all hover:bg-primary/80 hover:text-white',
                tag.id === selectedTag?.id
                  ? 'pl-8 bg-primary text-white'
                  : ''
              )}
              onClick={() => {
                setSelectedTag(tag)
                setSelectedArticle(tag.articles[0] ?? null)
              }}
            >
              {tag.name} - {tag.articles?.length ?? 0}
            </li>
          ))}
          {tags?.length === 0 && <div>暂无标签</div>}
        </ul>
      </div>
      <div className="col-span-2">
        <ul>
          {selectedTag?.articles?.length === 0 ? (
            <li className="px-4 py-2">无</li>
          ) : null}
          {selectedTag?.articles?.map((article) => (
            <li
              key={article.id}
              className={cn(
                'flex justify-between px-4 py-2 cursor-pointer transition-all hover:bg-primary/80 hover:text-white',
                article.id === selectedArticle?.id
                  ? 'pl-8 bg-primary text-white'
                  : ''
              )}
              onClick={() => setSelectedArticle(article)}
            >
              {article.title}
              <Button
                className="cursor-pointer"
                variant="destructive"
                title={`从该文章中移除 ${selectedTag.name} 标签`}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <LuTrash2 />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-3 flex flex-col gap-4 lg:gap-6">
        <h2 className="text-2xl font-bold">
          {selectedArticle?.title}
        </h2>
        <MarkdownPreviewer content={selectedArticle?.content ?? ''} />
      </div>
    </div>
  )
}
