import { prisma } from '@/lib/prisma'

export async function getArticlesByCategoryName(name: string) {
  const category = await prisma.category.findFirst({
    where: { name },
    include: {
      children: {
        include: {
          articles: true
        }
      },
      parent: true
    }
  })

  if (!category) return { category: null, articles: [] }

  const articles = await prisma.article.findMany({
    where: {
      categoryId: category.id
    },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
      tags: { select: { name: true } }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return { category, articles }
}
