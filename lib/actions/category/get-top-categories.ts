import prisma from '@/lib/prisma'

export async function getTopCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true
    },
    orderBy: { createdAt: 'asc' }
  })
}
