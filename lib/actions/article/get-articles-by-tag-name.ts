import { articleCoverCOSFixedManager } from '@/lib/articleCoverCOS'
import prisma from '@/lib/prisma'

export async function getArticlesByTagName(name: string) {
  const tag = await prisma.tag.findFirst({
    where: {
      name
    }
  })

  if (!tag) {
    throw new Error(`标签 ${name} 不存在`)
  }

  const result = await prisma.article.findMany({
    where: {
      tags: {
        some: {
          name
        }
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
