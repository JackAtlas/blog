import { getArchiveStats } from '@/lib/actions/article/get-archive-stats'
import { getArticlesPinned } from '@/lib/actions/article/get-articles-pinned'
import {
  ArchiveSection,
  RecentsSection,
  TagsSection
} from '@/sections'

export default async function HomePageSidebarRight() {
  const recentArticles = await getArticlesPinned()
  const archiveStats = await getArchiveStats()
  return (
    <>
      <RecentsSection articles={recentArticles} />
      <ArchiveSection archiveStats={archiveStats} />
      <TagsSection />
    </>
  )
}
