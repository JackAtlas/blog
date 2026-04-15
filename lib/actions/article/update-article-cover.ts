import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function updateArticleCover({
  id,
  imgUrl
}: {
  id: string
  imgUrl: string
}) {
  const session = await auth()

  if (!session || !session.user || !session.user.email) {
    throw new Error('请先登录')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string }
  })

  if (!user) {
    throw new Error('用户不存在')
  }

  const article = await prisma.article.findFirst({
    where: {
      id
    }
  })

  if (!article) {
    throw new Error('文章不存在')
  }

  const result = await prisma.article.update({
    where: { id },
    data: { coverUrl: imgUrl, thumbnailUrl: imgUrl }
  })

  if (result) {
    return { data: result }
  } else {
    throw new Error('文章题图更新失败，未知错误')
  }
}
