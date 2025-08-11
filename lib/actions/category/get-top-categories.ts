import prisma from '@/lib/prisma'

export async function getTopCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: {
      articles: true,
      children: {
        include: {
          articles: true
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  })
}
