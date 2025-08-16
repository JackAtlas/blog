import { articleCoverCOSFixedManager } from '@/lib/articleCoverCOS'
import prisma from '@/lib/prisma'

export async function getArchivedArticlesByYear(year: string) {
  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      createdAt: {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year}-12-31`)
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
    }
  })

  return await articleCoverCOSFixedManager.addCoverUrls(articles)
}
