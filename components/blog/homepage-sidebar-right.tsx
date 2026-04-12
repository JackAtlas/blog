import { getArticlesPinned } from '@/lib/actions/article/get-articles-pinned'
import {
  ArchiveSection,
  RecentsSection,
  TagsSection
} from '@/sections'

export default async function HomePageSidebarRight() {
  const recentArticles = await getArticlesPinned()
  return (
    <>
      <RecentsSection articles={recentArticles} />
      <ArchiveSection />
      <TagsSection />
    </>
  )
}
