import { prisma } from '@/lib/prisma'
import { Article } from '@prisma/client'

export async function getArchivedArticlesGrouped() {
  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      deletedAt: null
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true,
      category: true,
      tags: true
    }
  })

  const grouped = articles.reduce(
    (acc, article) => {
      const date = new Date(article.createdAt)
      const year = date.getFullYear()

      if (!acc[year]) {
        acc[year] = {
          year,
          count: 0,
          articles: []
        }
      }
      acc[year].articles.push(article)
      acc[year].count++

      return acc
    },
    {} as Record<
      string,
      {
        year: number
        count: number
        articles: Article[]
      }
    >
  )

  return Object.values(grouped).sort((a, b) => {
    return b.year - a.year
  })
}
