'use client'

import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import CategoryEditor from '@/components/dashboard/category-editor'
import DataTable from '@/components/data-table'
import { flatten, FlattenedCategory } from '@/lib/data/category'
import { format } from 'date-fns'
import { toast } from 'sonner'
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

export default function CategoriesPage() {
  const queryClient = useQueryClient()

  const {
    data: categories,
    isLoading,
    error
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories')
      const data = await res.json()

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message)
      } else {
        const data = await res.json()
        return flatten(data)
      }
    }
  })

  const submitCategory = useMutation({
    mutationFn: async ({
      targetId,
      name,
      parentId
    }: {
      targetId: number
      name: string
      parentId: number
    }) => {
      if (targetId) {
        // Edit
      } else {
        const res = await fetch('/api/categories', {
          method: 'POST',
          body: JSON.stringify({ name, parentId }),
          headers: { 'Content-Type': 'application/json' }
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(
            errorData.message || '栏目创建失败，未知错误'
          )
        }

        return await res.json()
      }
    },
    onSuccess: () => {
      toast.success('栏目创建成功')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '栏目创建失败，未知错误'
      )
    }
  })

  const removeCategory = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await fetch('/api/categories', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '栏目删除失败，未知错误')
      }
    },
    onSuccess: () => {
      toast.success('栏目删除成功')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '栏目删除失败，未知错误'
      )
    }
  })

  const columns: ColumnDef<FlattenedCategory>[] = [
    {
      accessorKey: 'name',
      header: '名称',
      cell: ({ row }) => {
        const { label, name } = row.original

        return `${label}${name}`
      }
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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-red-500 cursor-pointer"
            >
              删除
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>删除栏目</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              确认删除栏目<strong>{row.original.name}</strong>？<br />
              其下所有子栏目和文章将会被移动到
              <strong>{row.original.name}</strong>的父栏目下。
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  取消
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  className="bg-red-500 hover:bg-red-600 cursor-pointer"
                  onClick={() =>
                    removeCategory.mutate({ id: row.original.id })
                  }
                >
                  删除
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }
  ]

  if (isLoading) {
    return <div>加载中</div>
  }

  if (error) {
    return <div>出错了</div>
  }

  return (
    <div>
      <div className="flex items-center justify-end px-4 lg:px-6">
        <CategoryEditor
          categories={categories ?? []}
          onSubmit={submitCategory.mutate}
        />
      </div>
      <div className="p-4 lg:p-6">
        <DataTable columns={columns} data={categories ?? []} />
      </div>
    </div>
  )
}
