import prisma from '@/lib/prisma'
import { articleCoverCOSFixedManager } from '@/lib/articleCoverCOS'

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

  return result
    ? articleCoverCOSFixedManager.addCoverUrl(result)
    : null
}
