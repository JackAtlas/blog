'use server'

import prisma from '@/lib/prisma'

export async function softRemoveArticle(id: string) {
  if (!id) {
    throw new Error('文章 id 不合法')
  }

  const article = await prisma.article.findUnique({
    where: { id }
  })

  if (!article) {
    throw new Error('文章不存在')
  }

  const result = await prisma.article.update({
    where: { id },
    data: {
      deletedAt: new Date()
    }
  })

  if (result) {
    return { data: result }
  } else {
    throw new Error('文章软删除失败，未知错误')
  }
}
