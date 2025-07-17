'use server'

import prisma from '@/lib/prisma'

export async function removeCategory(id: number) {
  if (!id || isNaN(id)) {
    throw new Error('栏目 id 不合法')
  }

  return await prisma.$transaction(async (tx) => {
    const category = await tx.category.findUnique({
      where: { id },
      select: { parentId: true }
    })

    if (!category) {
      throw new Error('栏目不存在')
    }

    const parentId = category.parentId

    await tx.category.updateMany({
      where: { parentId: id },
      data: { parentId }
    })

    await tx.article.updateMany({
      where: { categoryId: id },
      data: { categoryId: parentId }
    })

    const deleted = await tx.category.delete({
      where: { id }
    })

    return { data: deleted }
  })
}
