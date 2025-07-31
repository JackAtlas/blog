import prisma from '@/lib/prisma'

export async function getArticles() {
  const result = await prisma.article.findMany({
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  })

  return result ?? []
}
