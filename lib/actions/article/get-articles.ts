import prisma from '@/lib/prisma'

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

  return result ?? []
}
