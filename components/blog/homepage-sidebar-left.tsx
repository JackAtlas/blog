import { getMetaData } from '@/lib/actions/get-meta-data'
import {
  CategoriesSection,
  LinksSection,
  ProfileSection
} from '@/sections'

export default async function HomepageSidebarLeft() {
  const metaData = await getMetaData()
  return (
    <>
      <ProfileSection metaData={metaData} />
      <LinksSection />
      <CategoriesSection />
    </>
  )
}
