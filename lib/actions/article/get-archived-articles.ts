import {
  articleCoverCOSFixedManager,
  ExtendedArticleWithCovers
} from '@/lib/articleCoverCOS'
import prisma from '@/lib/prisma'

export async function getArchivedArticles() {
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

  const articlesWithCover =
    await articleCoverCOSFixedManager.addCoverUrls(articles)

  const grouped = articlesWithCover.reduce((acc, article) => {
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
  }, {} as Record<string, { year: number; count: number; articles: ExtendedArticleWithCovers[] }>)

  return Object.values(grouped).sort((a, b) => {
    return b.year - a.year
  })
}
