import { prisma } from '@/lib/prisma'

export async function getArticlesPinned() {
  return await prisma.article.findMany({
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
}
