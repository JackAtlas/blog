'use server'

import prisma from '@/lib/prisma'

interface CategoryCreateInput {
  name: string
  parentId: number | null
}

export async function createCategory({
  name,
  parentId
}: CategoryCreateInput) {
  if (!name || name.trim() === '') {
    return {
      error: '栏目名称不能为空'
    }
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      name
    }
  })

  if (existingCategory) {
    return {
      error: '同名栏目已存在'
    }
  }

  if (typeof parentId === 'string') {
    parentId = parseInt(parentId)
  }

  if (parentId && isNaN(parentId)) {
    return {
      error: '父级栏目 ID 无效'
    }
  }

  if (parentId) {
    const parentCategory = await prisma.category.findUnique({
      where: {
        id: parentId
      }
    })

    if (!parentCategory) {
      return {
        error: '父级栏目不存在'
      }
    }
  }

  try {
    const result = await prisma.category.create({
      data: {
        name,
        parentId
      }
    })

    if (result) {
      return { data: result }
    } else {
      return { error: '创建失败' }
    }
  } catch (error) {
    return {
      error
    }
  }
}
