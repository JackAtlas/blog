import prisma from '@/lib/prisma'

export async function getArticles() {
  const result = await prisma.article.findMany()

  return result ?? []
}
