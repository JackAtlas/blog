import prisma from '@/lib/prisma'

export async function toggleArticleStatus(id: string) {
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
      status: article.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    }
  })

  if (result) {
    return { data: result }
  } else {
    throw new Error('更改文章状态失败，未知错误')
  }
}
