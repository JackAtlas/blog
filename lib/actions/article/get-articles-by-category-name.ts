import { articleCoverCOSFixedManager } from '@/lib/articleCoverCOS'
import prisma from '@/lib/prisma'

export async function getArticlesByCategoryName(name: string) {
  const category = await prisma.category.findFirst({
    where: {
      name
    }
  })

  if (!category) {
    throw new Error(`栏目 ${name} 不存在`)
  }

  const result = await prisma.article.findMany({
    where: {
      categoryId: category.id
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
