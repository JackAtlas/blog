import { prisma } from '@/lib/prisma'

export async function getArticles() {
  return await prisma.article.findMany({
    where: {
      deletedAt: null
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
