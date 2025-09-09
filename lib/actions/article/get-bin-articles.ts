import { articleCoverCOSFixedManager } from '@/lib/articleCoverCOS'
import prisma from '@/lib/prisma'

export async function getBinArticles() {
  const result = await prisma.article.findMany({
    where: {
      deletedAt: {
        not: null
      }
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
    orderBy: {
      createdAt: 'desc'
    }
  })

  const resultWithCover =
    await articleCoverCOSFixedManager.addCoverUrls(result)

  return resultWithCover ?? []
}
