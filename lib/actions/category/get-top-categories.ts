import { prisma } from '@/lib/prisma'

export async function getTopCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: {
      _count: {
        select: { articles: true }
      },
      children: {
        include: {
          _count: {
            select: { articles: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  })
}

export type TopCategory = Awaited<
  ReturnType<typeof getTopCategories>
>[number]
