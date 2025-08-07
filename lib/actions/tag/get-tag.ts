import prisma from '@/lib/prisma'

export async function getTag({ id }: { id: number }) {
  const result = await prisma.tag.findUnique({
    where: { id },
    include: { articles: true }
  })

  if (!result) {
    throw new Error('标签不存在')
  } else {
    return result
  }
}
