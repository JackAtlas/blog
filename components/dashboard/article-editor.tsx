'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import slugify from 'slugify'
import { toast } from 'sonner'
import {
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui'
import { Category, Tag } from '@/generated/prisma'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false
})

export default function ArticleEditor({
  articleId = ''
}: {
  articleId?: string
}) {
  const [title, setTitle] = useState<string>('')
  const [slugTitle, setSlugTitle] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [excerpt, setExcerpt] = useState<string>('')
  const [categoryId, setCategoryId] = useState<number>(0)
  const [tagIds, setTagIds] = useState<number[]>([])

  const { data: article } = useQuery({
    queryKey: ['articles', articleId],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${articleId}`)

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message)
      } else {
        return await res.json()
      }
    },
    enabled: !!articleId
  })

  const { data: categories, isLoading: isCategoriesLoading } =
    useQuery({
      queryKey: ['categories'],
      queryFn: async () => {
        const res = await fetch('/api/categories')

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message)
        } else {
          return await res.json()
        }
      }
    })

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await fetch('/api/tags')

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message)
      } else {
        return await res.json()
      }
    }
  })

  useEffect(() => {
    if (article) {
      setTitle(article.title)
      setSlugTitle(article.slugTitle)
      setSlug(article.slug)
      setContent(article.content)
      setExcerpt(article.excerpt)
      setCategoryId(article.categoryId ?? 0)
      setTagIds(article.tags.map((tag: Tag) => tag.id))
    }
  }, [
    article,
    setTitle,
    setSlugTitle,
    setSlug,
    setContent,
    setExcerpt,
    setCategoryId,
    setTagIds
  ])

  useEffect(() => {
    setSlug(slugify(slugTitle))
  }, [slugTitle, setSlug, slugify])

  const handleTagToggle = (tagId: number) => {
    if (tagIds.includes(tagId)) {
      setTagIds(tagIds.filter((id) => id !== tagId))
    } else {
      setTagIds([...tagIds, tagId])
    }
  }

  const saveArticle = useMutation({
    mutationFn: async ({ draft }: { draft: boolean }) => {
      if (articleId) {
        const res = await fetch(`/api/articles/${articleId}`, {
          method: 'PUT',
          body: JSON.stringify({
            title,
            slugTitle,
            slug,
            content,
            excerpt,
            draft,
            categoryId,
            tagIds
          }),
          headers: { 'Content-Type': 'application/json' }
        })
      } else {
        const res = await fetch('/api/articles', {
          method: 'POST',
          body: JSON.stringify({
            title,
            slugTitle,
            slug,
            content,
            excerpt,
            draft,
            categoryId,
            tagIds
          }),
          headers: { 'Content-Type': 'application/json' }
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(
            errorData.message || '文章创建失败，未知错误'
          )
        }
      }
    },
    onSuccess: () => {
      setTitle('')
      setSlug('')
      setSlugTitle('')
      setContent('')
      setExcerpt('')
      setCategoryId(0)
      if (saveArticle.variables?.draft) {
        toast.success('文章创建成功，存为草稿')
      } else {
        toast.success('文章创建成功，已经发布')
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '文章创建失败，未知错误'
      )
    }
  })

  const handleSave = (draft: boolean) => {
    // TODO: validation

    saveArticle.mutate({ draft })
  }

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
        height={600}
        value={content}
        onChange={(value) => setContent(value ? value : '')}
        textareaProps={{
          placeholder: '内容'
        }}
      ></MDEditor>
      <MDEditor
        className="mb-4 lg:mb-6"
        value={excerpt}
        onChange={(value) => setExcerpt(value ? value : '')}
        textareaProps={{
          placeholder: '摘要'
        }}
      ></MDEditor>
      <div className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-6">
        <span className="text-sm text-muted-foreground">栏目：</span>
        <Select
          disabled={isCategoriesLoading}
          value={categoryId.toString()}
          onValueChange={(value) => setCategoryId(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择栏目"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="0">无</SelectItem>
              {categories?.map((category: Category) => (
                <SelectItem
                  key={category.id}
                  value={category.id.toString()}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-6">
        <span className="text-sm text-muted-foreground">标签：</span>
        {tags?.map((tag: Tag) => (
          <div key={tag.id} className="flex items-center gap-2">
            <Checkbox
              id={tag.id.toString()}
              onCheckedChange={() => handleTagToggle(tag.id)}
            ></Checkbox>
            <Label htmlFor={tag.id.toString()}>{tag.name}</Label>
          </div>
        ))}
      </div>
      <div className="flex gap-4 lg:gap-6">
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
