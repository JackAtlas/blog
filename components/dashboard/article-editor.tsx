'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
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
  SelectValue,
  Textarea
} from '@/components/ui'
import { Category, Tag } from '@/generated/prisma'
import MarkdownPreviewer from '@/components/markdown-preview'

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
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')

  const { data: article, isLoading: isArticleLoading } = useQuery({
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
      setStatus(article.status)
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
            status,
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
            status: draft ? 'DRAFT' : 'PUBLISHED',
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
      if (articleId) {
        toast.success('文章修改成功')
      } else {
        setTitle('')
        setSlug('')
        setSlugTitle('')
        setContent('')
        setExcerpt('')
        setCategoryId(0)
        setTagIds([])
        if (saveArticle.variables?.draft) {
          toast.success('文章创建成功，存为草稿')
        } else {
          toast.success('文章创建成功，已经发布')
        }
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : articleId
          ? '文章修改失败，未知错误'
          : '文章创建失败，未知错误'
      )
    }
  })

  const handleSave = (draft: boolean) => {
    // TODO: validation

    saveArticle.mutate({ draft })
  }

  if (articleId && isArticleLoading) {
    return <div>加载中...</div>
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
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
      <div className="grid grid-cols-2 gap-4">
        <Textarea
          className="min-h-60 lg:text-lg xl:text-xl"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="正文"
        />
        <MarkdownPreviewer content={content} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="摘要"
        />
        <MarkdownPreviewer content={excerpt} />
      </div>
      <div className="flex items-center gap-4">
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
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">标签：</span>
        {tags?.map((tag: Tag) => (
          <div key={tag.id} className="flex items-center gap-2">
            <Checkbox
              checked={tagIds.includes(tag.id)}
              id={tag.id.toString()}
              onCheckedChange={() => handleTagToggle(tag.id)}
            ></Checkbox>
            <Label htmlFor={tag.id.toString()}>{tag.name}</Label>
          </div>
        ))}
      </div>
      {articleId ? (
        <div className="flex items-center gap-4">
          <Button
            className="cursor-pointer"
            onClick={() => handleSave(true)}
          >
            保存
          </Button>
          {status === 'DRAFT' && '草稿'}
          {status === 'PUBLISHED' && '已发布'}
        </div>
      ) : (
        <div className="flex gap-4">
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
      )}
    </div>
  )
}
