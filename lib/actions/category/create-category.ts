'use server'

import prisma from '@/lib/prisma'

interface CategoryCreateInput {
  name: string
  parentId: number
}

export async function createCategory({
  name,
  parentId
}: CategoryCreateInput) {
  if (!name || name.trim() === '') {
    throw new Error('栏目名称不能为空')
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      name
    }
  })

  if (existingCategory) {
    throw new Error('同名栏目已存在')
  }

  const data: { name: string; parentId?: number } = { name }

  if (parentId) {
    const parentCategory = await prisma.category.findUnique({
      where: {
        id: parentId
      }
    })

    if (!parentCategory) {
      throw new Error('父级栏目不存在')
    }

    data['parentId'] = parentId
  }

  const result = await prisma.category.create({ data })

  if (result) {
    return { data: result }
  } else {
    throw new Error('栏目创建失败，未知错误')
  }
}
