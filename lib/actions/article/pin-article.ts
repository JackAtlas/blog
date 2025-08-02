'use server'

import prisma from '@/lib/prisma'

export async function toggleArticlePin(id: string) {
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
    data: { isPinned: !article.isPinned }
  })

  if (result) {
    return { data: result }
  } else {
    throw new Error('更改文章置顶失败，未知错误')
  }
}
