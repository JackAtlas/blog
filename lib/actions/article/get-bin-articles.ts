import { prisma } from '@/lib/prisma'

export async function getBinArticles() {
  return await prisma.article.findMany({
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
}
