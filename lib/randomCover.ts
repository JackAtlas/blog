import { Article } from '@/generated/prisma'

export function addRandomCover(article: Article) {
  return {
    ...article,
    coverUrl: `https://picsum.photos/seed/${article.id}/700/300`,
    thumbnail: `https://picsum.photos/seed/${article.id}/200/200`
  }
}
