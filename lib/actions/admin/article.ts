import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PaginationResponse } from '@/types/shared/pagination'
import { AdminArticle } from '@/types/admin/article.action'
import { adminArticleInclude } from '@/lib/actions/admin/article.include'

type Params = {
  page?: number
  pageSize?: number
  keyword?: string
}

export async function getArticles({
  page = 1,
  pageSize = 10,
  keyword = ''
}: Params): Promise<PaginationResponse<AdminArticle>> {
  const skip = (page - 1) * pageSize

  const where: Prisma.ArticleWhereInput = {
    deletedAt: null,

    ...(keyword && {
      OR: [
        {
          title: {
            contains: keyword,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: keyword,
            mode: 'insensitive'
          }
        }
      ]
    })
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      skip,
      take: pageSize,

      include: adminArticleInclude,

      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }]
    }),

    prisma.article.count({ where })
  ])

  return {
    data: articles,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  }
}
