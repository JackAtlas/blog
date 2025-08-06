import prisma from '@/lib/prisma'

export async function getTags() {
  return prisma.tag.findMany({
    include: { articles: true }
  })
}
