import prisma from '@/lib/prisma'

export async function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: {
      slug,
      deletedAt: null,
      status: 'PUBLISHED'
    },
    include: {
      author: true,
      category: true,
      tags: true
    }
  })
}
