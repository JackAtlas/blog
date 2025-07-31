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
}

export async function createArticle({
  title,
  slugTitle,
  slug,
  content,
  excerpt = '',
  status = 'DRAFT'
}: ArticleCreateInput) {
  const session = await auth()

  console.log('user')
  console.log(session)

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

  const result = await prisma.article.create({
    data: {
      title,
      slugTitle,
      slug,
      content,
      excerpt,
      status,
      authorId: user.id
    }
  })

  if (result) {
    return { data: result }
  } else {
    throw new Error('文章创建失败，未知错误')
  }
}
