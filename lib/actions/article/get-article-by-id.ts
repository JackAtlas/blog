import prisma from '@/lib/prisma'

export async function getArticleById(id: string) {
  return prisma.article.findFirst({
    where: {
      id,
      deletedAt: null
    },
    include: {
      category: true,
      tags: true
    }
  })
}
