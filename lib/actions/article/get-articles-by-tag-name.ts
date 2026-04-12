import { articleCoverCOSFixedManager } from '@/lib/articleCoverCOS'
import { prisma } from '@/lib/prisma'

export async function getArticlesByTagName(name: string) {
  const tag = await prisma.tag.findUnique({
    where: { name }
  })

  if (!tag) return { tag: null, articles: [] }

  const articles = await prisma.article.findMany({
    where: {
      tags: {
        some: { name }
      }
    },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
      tags: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  const resultWithCover =
    await articleCoverCOSFixedManager.addCoverUrls(articles)

  return { tag, articles: resultWithCover ?? [] }
}
