import { Article } from '@prisma/client'

export type ExtendedArticle = Article & {
  author: { name: string }
  category: { name: string; id?: number } | null
  tags: { name: string; id?: number }[]
}
