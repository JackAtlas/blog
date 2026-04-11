import { prisma } from '@/lib/prisma'

export async function getArchiveStats() {
  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      deletedAt: null
    },
    select: {
      createdAt: true
    }
  })

  const grouped = articles.reduce(
    (acc, article) => {
      const year = new Date(article.createdAt).getFullYear()

      if (!acc[year]) {
        acc[year] = {
          year,
          count: 0
        }
      }

      acc[year].count++

      return acc
    },
    {} as Record<string, { year: number; count: number }>
  )

  return Object.values(grouped).sort((a, b) => b.year - a.year)
}
