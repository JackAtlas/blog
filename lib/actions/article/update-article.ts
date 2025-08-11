import { auth } from '@/auth'
import prisma from '@/lib/prisma'

interface ArticleUpdateInput {
  title: string
  slugTitle: string
  slug: string
  content: string
  excerpt?: string
  status: 'DRAFT' | 'PUBLISHED'
  categoryId?: number
  tagIds: number[]
}

export async function updateArticle({
  title,
  slugTitle,
  slug,
  content,
  excerpt = '',
  status,
  categoryId = undefined,
  tagIds = []
}: ArticleUpdateInput) {
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
      slug
    }
  })

  if (!article) {
    throw new Error('文章不存在')
  }

  const existingTags = await prisma.tag.findMany({
    where: { id: { in: tagIds } },
    select: { id: true }
  })

  const existingTagIds = existingTags.map((tag) => tag.id)

  const notFoundTagIds = tagIds.filter(
    (id) => !existingTagIds.includes(id)
  )

  if (notFoundTagIds.length > 0) {
    throw new Error(`标签 ${notFoundTagIds.join(',')} 不存在`)
  }

  const connectTags = existingTags.map((tag) => ({ id: tag.id }))

  const result = await prisma.article.update({
    where: { id: article.id },
    data: {
      title,
      slugTitle,
      slug,
      content,
      excerpt,
      status,
      authorId: user.id,
      categoryId: categoryId || null,
      tags: { connect: connectTags }
    }
  })

  if (result) {
    return { data: result }
  } else {
    throw new Error('文章更新失败，未知错误')
  }
}
