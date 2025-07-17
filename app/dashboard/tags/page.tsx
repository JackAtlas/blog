'use client'

import { Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

export default function TagsPage() {
  const queryClient = useQueryClient()
  const [newTag, setNewTag] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<number>(0)

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
        <ul className="mt-4">
          {tags?.map((tag: any) => (
            <li
              key={tag.id}
              className={cn(
                'px-4 py-2 cursor-pointer transition-all hover:bg-primary/80 hover:text-white',
                tag.id === selectedTag
                  ? 'pl-8 bg-primary text-white'
                  : ''
              )}
              onClick={() => setSelectedTag(tag.id)}
            >
              {tag.name}
            </li>
          ))}
          {tags?.length === 0 && <div>暂无标签</div>}
        </ul>
      </div>
      <div className="col-span-2 bg-blue-500">Articles</div>
      <div className="col-span-3 bg-emerald-500">Preview</div>
    </div>
  )
}
