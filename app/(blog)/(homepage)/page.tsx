import { getArticlesPinned } from '@/lib/actions/article/get-articles-pinned'
import ArticlesSection from '@/sections/ArticlesSection'

export default async function HomePage() {
  const articles = await getArticlesPinned()
  return <ArticlesSection articles={articles} />
}
