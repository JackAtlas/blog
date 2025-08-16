import prisma from '@/lib/prisma'

export async function getTagInfoByName(name: string) {
  return await prisma.tag.findFirst({
    where: {
      name
    }
  })
}
