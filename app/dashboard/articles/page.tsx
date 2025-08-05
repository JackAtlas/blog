'use client'

import DataTable from '@/components/data-table'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Switch
} from '@/components/ui'
import { Article } from '@/generated/prisma'
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import MDEditor from '@uiw/react-md-editor'
import { format } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { toast } from 'sonner'

export default function ArticlesPage() {
  const [previewArticle, setPreviewArticle] = useState<Article>(
    {} as Article
  )
  const queryClient = useQueryClient()

  const {
    data: articles,
    isLoading,
    error
  } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await fetch('/api/articles')

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

  // TODO: soft-delete recover
  // TODO: use switch component
  const softRemoveArticle = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/articles/soft-delete`, {
        method: 'PATCH',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(
          errorData.message || '文章软删除失败，未知错误'
        )
      }
    },
    onSuccess: () => {
      toast.success('文章已放入回收站')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '文章软删除失败，未知错误'
      )
    }
  })

  const pinArticle = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/articles/pin`, {
        method: 'PATCH',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(
          errorData.message || '更改文章置顶失败，未知错误'
        )
      } else {
        return await res.json()
      }
    },
    onSuccess: (res) => {
      const { isPinned } = res.data as Article

      toast.success(isPinned ? '文章置顶成功' : '文章取消置顶成功')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '更改文章置顶失败，未知错误'
      )
    }
  })

  interface ExtendedArticle extends Article {
    category?: {
      name: string
    }
    tags?: { name: string }[]
  }

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
      header: '状态',
      cell: ({ row }) => {
        const { deletedAt, status } = row.original

        return deletedAt
          ? '回收站'
          : status === 'PUBLISHED'
          ? '已发布'
          : '未发布'
      }
    },
    {
      header: '置顶',
      cell: ({ row }) => (
        <Switch
          checked={row.original.isPinned}
          onCheckedChange={() =>
            pinArticle.mutate({ id: row.original.id })
          }
        ></Switch>
      )
    },
    {
      accessorKey: 'createdAt',
      header: '创建时间',
      cell: ({ row }) =>
        format(row.getValue<Date>('createdAt'), 'yyyy-MM-dd hh:mm:ss')
    },
    {
      accessorKey: 'updatedAt',
      header: '更新时间',
      cell: ({ row }) =>
        format(row.getValue<Date>('updatedAt'), 'yyyy-MM-dd hh:mm:ss')
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
          <Dialog>
            <DialogTrigger asChild>
              {row.original.deletedAt ? (
                <Button
                  size="sm"
                  variant="secondary"
                  className="cursor-pointer"
                >
                  恢复
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() =>
                    softRemoveArticle.mutate({ id: row.original.id })
                  }
                >
                  回收站
                </Button>
              )}
            </DialogTrigger>
          </Dialog>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
          >
            编辑
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
    return <div>加载中</div>
  }

  if (error) {
    return <div>加载失败</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="col-span-2">
        <div className="flex justify-between">
          <div></div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/articles/new">
              <LuPlus /> 添加文章
            </Link>
          </Button>
        </div>
        <div className="py-4 lg:py-6">
          <DataTable columns={columns} data={articles ?? []} />
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-1">
        <MDEditor.Markdown source={previewArticle.content ?? ''} />
      </div>
    </div>
  )
}
