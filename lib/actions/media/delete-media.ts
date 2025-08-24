import { removeFromCOS } from '@/lib/cos/cosClient'
import prisma from '@/lib/prisma'

export async function deleteMedia({
  id,
  key
}: {
  id: string
  key: string
}) {
  const media = await prisma.media.findUnique({
    where: { id }
  })

  if (!media) throw new Error('图片不存在')

  await removeFromCOS(key).catch(console.error)

  await prisma.media.delete({ where: { id } })

  return true
}
