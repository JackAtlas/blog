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
  }
]

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

      return flatten(data)
    }
  })

  const submitCategory = useMutation({
    mutationFn: async ({
      targetId,
      name,
      parentId
    }: {
      targetId: number | null
      name: string
      parentId: number
    }) => {
      if (targetId) {
        // Edit
      } else {
        await fetch('/api/categories/add', {
          method: 'POST',
          body: JSON.stringify({ name, parentId }),
          headers: { 'Content-Type': 'application/json' }
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

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
