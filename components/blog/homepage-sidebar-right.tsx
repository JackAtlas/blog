import { getArchiveStats } from '@/lib/actions/article/get-archive-stats'
import { getArticlesPinned } from '@/lib/actions/article/get-articles-pinned'
import { getTagsPublic } from '@/lib/actions/tag/get-tags-pulic'
import {
  ArchiveSection,
  RecentsSection,
  TagsSection
} from '@/sections'

export default async function HomePageSidebarRight() {
  const recentArticles = await getArticlesPinned()
  const archiveStats = await getArchiveStats()
  const tags = await getTagsPublic()
  return (
    <>
      <RecentsSection articles={recentArticles} />
      <ArchiveSection archiveStats={archiveStats} />
      <TagsSection tags={tags} />
    </>
  )
}
