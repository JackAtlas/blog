'use client'

import { Button, Input } from '@/components/ui'
import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import slugify from 'slugify'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false
})

export default function NewArticlePage() {
  const [title, setTitle] = useState<string>('')
  const [slugTitle, setSlugTitle] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [content, setContent] = useState<string | undefined>('')
  const [excerpt, setExcerpt] = useState<string | undefined>('')

  useEffect(() => {
    setSlug(slugify(slugTitle))
  }, [slugTitle, setSlug, slugify])

  const handleSave = (draft: boolean) => {
    // TODO: validation

    saveArticle.mutate({ draft })
  }

  const saveArticle = useMutation({
    mutationFn: async ({ draft }: { draft: boolean }) => {
      const res = await fetch('/api/articles', {
        method: 'POST',
        body: JSON.stringify({
          title,
          slugTitle,
          slug,
          content,
          excerpt,
          draft
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '文章创建失败，未知错误')
      }
    },
    onSuccess: () => {
      setTitle('')
      setSlug('')
      setContent('')
      setExcerpt('')
      if (saveArticle.variables?.draft) {
        toast.success('文章创建成功，存为草稿')
      } else {
        toast.success('文章创建成功，已经发布')
      }
    },
    onError: (error) => {
      console.log(error)
      toast.error(
        error instanceof Error
          ? error.message
          : '文章创建失败，未知错误'
      )
    }
  })

  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
        <div>
          <Input
            value={title}
            placeholder="标题"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Input
            value={slugTitle}
            placeholder="Slug 标题（必须唯一）"
            onChange={(e) => setSlugTitle(e.target.value)}
          />
        </div>
      </div>
      <MDEditor
        className="mb-4 lg:mb-6"
        height={800}
        value={content}
        onChange={setContent}
        textareaProps={{
          placeholder: '内容'
        }}
      ></MDEditor>
      <MDEditor
        className="mb-4 lg:mb-6"
        value={excerpt}
        onChange={setExcerpt}
        textareaProps={{
          placeholder: '摘要'
        }}
      ></MDEditor>
      <div className="flex justify-end gap-4 lg:gap-6">
        <Button
          className="cursor-pointer"
          onClick={() => handleSave(false)}
        >
          保存并发布
        </Button>
        <Button
          variant="secondary"
          className="cursor-pointer"
          onClick={() => handleSave(true)}
        >
          保存为草稿
        </Button>
      </div>
    </div>
  )
}
