import { Prisma } from '@prisma/client'
import { adminArticleInclude } from '@/lib/actions/admin/article.include'

export type AdminArticle = Prisma.ArticleGetPayload<{
  include: typeof adminArticleInclude
}>
