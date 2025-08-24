import prisma from '@/lib/prisma'

export async function getAllMediaData() {
  return await prisma.media.findMany()
}
