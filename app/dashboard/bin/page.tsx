'use client'

import ErrorDisplay from '@/components/dashboard/error-display'
import Loader from '@/components/dashboard/loader'
import DataTable from '@/components/data-table'
import MarkdownPreviewer from '@/components/markdown-preview'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'
import { Article } from '@/generated/prisma'
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import { LuLoader } from 'react-icons/lu'
import { toast } from 'sonner'

interface ExtendedArticle extends Article {
  category?: {
    name: string
  }
  tags?: { name: string }[]
  coverUrl?: string
}

export default function BinPage() {
  const [previewArticle, setPreviewArticle] =
    useState<ExtendedArticle>({} as ExtendedArticle)
  const queryClient = useQueryClient()

  const {
    data: articles,
    isLoading,
    error
  } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await fetch('/api/articles/bin')

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message)
      } else {
        const data = await res.json()
        return data
      }
    }
  })

  const removeArticle = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/articles`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '文章删除失败，未知错误')
      }
    },
    onSuccess: () => {
      toast.success('文章删除成功')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '文章删除失败，未知错误'
      )
    }
  })

  const softRecoverArticle = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/articles/soft-recover`, {
        method: 'PATCH',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(
          errorData.message || '文章软恢复失败，未知错误'
        )
      }
    },
    onSuccess: () => {
      toast.success('文章已恢复')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '文章软恢复失败，未知错误'
      )
    }
  })

  const columns: ColumnDef<ExtendedArticle>[] = [
    {
      accessorKey: 'title',
      header: '标题'
    },
    {
      header: '栏目',
      cell: ({ row }) => row.original.category?.name
    },
    {
      header: '标签',
      cell: ({ row }) =>
        row.original.tags?.map((tag) => tag.name).join(', ')
    },
    {
      accessorKey: 'createdAt',
      header: '创建时间',
      cell: ({ row }) =>
        format(row.getValue<Date>('createdAt'), 'yyyy-MM-dd hh:mm:ss')
    },
    {
      header: '操作',
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                className="cursor-pointer"
              >
                删除
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>删除文章</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                确认彻底删除文章《
                <strong>{row.original.title}</strong>》
                ？此操作无法恢复。
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                  >
                    取消
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() =>
                      removeArticle.mutate({ id: row.original.id })
                    }
                  >
                    删除
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            size="sm"
            variant="secondary"
            className="cursor-pointer"
            disabled={softRecoverArticle.isPending}
            onClick={() =>
              softRecoverArticle.mutate({ id: row.original.id })
            }
          >
            {softRecoverArticle.isPending ? (
              <LuLoader className="animate-spin" />
            ) : (
              '恢复'
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={() => setPreviewArticle(row.original)}
          >
            预览
          </Button>
        </div>
      )
    }
  ]

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 2xl:gap-6">
      <DataTable columns={columns} data={articles ?? []}></DataTable>
      <div className="hidden lg:flex lg:flex-col lg:gap-6 lg:col-span-1">
        {previewArticle?.coverUrl && (
          <Image
            src={previewArticle?.coverUrl!}
            alt={previewArticle.title}
            width={800}
            height={800}
            className="aspect-video object-cover"
          />
        )}
        <h1 className="text-3xl">{previewArticle.title}</h1>
        <MarkdownPreviewer content={previewArticle.content} />
      </div>
    </div>
  )
}
