import prisma from '@/lib/prisma'
import { addRandomCover } from '@/lib/randomCover'

export async function getArticleBySlug(slug: string) {
  const result = await prisma.article.findFirst({
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

  return result ? addRandomCover(result) : null
}
