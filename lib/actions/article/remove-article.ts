'use server'

import prisma from '@/lib/prisma'

export async function removeArticle(id: string) {
  if (!id) {
    throw new Error('文章 id 不合法')
  }

  const article = prisma.article.findUnique({
    where: { id }
  })

  if (!article) {
    throw new Error('文章不存在')
  }

  const deleted = await prisma.article.delete({
    where: { id }
  })

  return { data: deleted }
}
