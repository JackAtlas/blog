import prisma from '@/lib/prisma'
import { articleCoverCOSFixedManager } from '@/lib/articleCoverCOS'

export async function getArticlesPinned() {
  const result = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED'
    },
    include: {
      author: {
        select: {
          name: true
        }
      },
      category: {
        select: {
          name: true
        }
      },
      tags: {
        select: {
          name: true
        }
      }
    },
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }]
  })

  const resultWithCover =
    await articleCoverCOSFixedManager.addCoverUrls(result)

  return resultWithCover ?? []
}
