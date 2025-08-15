import prisma from '@/lib/prisma'
import { articleCoverCOSFixedManager } from '@/lib/articleCoverCOS'

export async function getArticles() {
  const result = await prisma.article.findMany({
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
