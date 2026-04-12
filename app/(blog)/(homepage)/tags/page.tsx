import { getTagsPublic } from '@/lib/actions/tag/get-tags-pulic'
import TagsSection from '@/sections/TagsSection'

export default async function TagsPage() {
  const tags = await getTagsPublic()
  return <TagsSection tags={tags} />
}
