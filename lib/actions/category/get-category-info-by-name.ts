import prisma from '@/lib/prisma'

export async function getCategoryInfoByName(name: string) {
  const result = await prisma.category.findFirst({
    where: {
      name
    },
    include: {
      children: {
        include: {
          articles: true
        }
      },
      parent: true
    }
  })

  return result
}
