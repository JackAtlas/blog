import { getTopCategories } from '@/lib/actions/category/get-top-categories'
import { getMetaData } from '@/lib/actions/get-meta-data'
import {
  CategoriesSection,
  LinksSection,
  ProfileSection
} from '@/sections'

export default async function HomepageSidebarLeft() {
  const metaData = await getMetaData()
  const topCategories = await getTopCategories()
  return (
    <>
      <ProfileSection metaData={metaData} />
      <LinksSection />
      <CategoriesSection topCategories={topCategories} />
    </>
  )
}
