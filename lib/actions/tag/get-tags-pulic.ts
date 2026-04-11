import { prisma } from '@/lib/prisma'

export function getTagsPublic() {
  return prisma.tag.findMany({
    include: {
      _count: {
        select: {
          articles: true
        }
      }
    }
  })
}
