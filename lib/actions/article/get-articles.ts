import prisma from '@/lib/prisma'
import { addRandomCover } from '@/lib/randomCover'

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

  return result.map(addRandomCover) ?? []
}
