import { Article, Category, Tag, User } from '@/generated/prisma'

interface ExtendedArticle extends Article {
  author: User
  category: Category | null
  tags: Tag[]
}

export function addRandomCover(article: ExtendedArticle) {
  return {
    ...article,
    coverUrl: `https://picsum.photos/seed/${article.id}/700/300`,
    thumbnail: `https://picsum.photos/seed/${article.id}/200/200`
  }
}
