'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/auth'

interface ArticleCreateInput {
  title: string
  slugTitle: string
  slug: string
  content: string
  excerpt?: string
  status: 'DRAFT' | 'PUBLISHED'
  categoryId: number | undefined
  tagIds: number[]
}

export async function createArticle({
  title,
  slugTitle,
  slug,
  content,
  excerpt = '',
  status = 'DRAFT',
  categoryId = undefined,
  tagIds = []
}: ArticleCreateInput) {
  const session = await auth()

  if (!session || !session.user || !session.user.email) {
    throw new Error('请先登录')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!user || !user.id) {
    throw new Error('用户不存在')
  }

  if (!title || title.trim() === '') {
    throw new Error('文章标题不能为空')
  }

  if (
    !slugTitle ||
    slugTitle.trim() === '' ||
    !slug ||
    slug.trim() === ''
  ) {
    throw new Error('文章别名不能为空')
  }

  const existingArticle = await prisma.article.findFirst({
    where: {
      slug
    }
  })

  if (existingArticle) {
    throw new Error('同名文章已存在')
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

  const result = await prisma.article.create({
    data: {
      title,
      slugTitle,
      slug,
      content,
      excerpt,
      status,
      authorId: user.id,
      categoryId: categoryId || undefined,
      tags: { connect: connectTags }
    }
  })

  if (result) {
    return { data: result }
  } else {
    throw new Error('文章创建失败，未知错误')
  }
}
