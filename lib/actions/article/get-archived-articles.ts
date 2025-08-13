import prisma from '@/lib/prisma'

export async function getArchivedArticles() {
  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      deletedAt: null
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const grouped = articles.reduce((acc, article) => {
    const date = new Date(article.createdAt)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const key = `${year}-${String(month).padStart(2, '0')}`

    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        count: 0,
        articles: []
      }
    }
    acc[key].articles.push(article)
    acc[key].count++

    return acc
  }, {} as Record<string, { year: number; month: number; count: number; articles: typeof articles }>)

  return Object.values(grouped).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year
    return b.month - a.month
  })
}
