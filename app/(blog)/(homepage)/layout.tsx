import ArchiveSection from '@/sections/ArchiveSection'
import CategoriesSection from '@/sections/CategoriesSection'
import LinksSection from '@/sections/LinksSection'
import ProfileSection from '@/sections/ProfileSection'
import RecentsSection from '@/sections/RecentsSection'
import TagsSection from '@/sections/TagsSection'

export default function layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="blog-container grid grid-cols-1 md:grid-cols-3 2xl:flex gap-2 md:gap-4 2xl:gap-6">
      <div className="order-1 2xl:order-2 2xl:flex-1 md:col-span-2">
        {children}
      </div>
      <div className="order-2 2xl:hidden flex flex-col gap-2 md:gap-4">
        <div className="flex flex-col gap-4 lg:gap-6">
          <ProfileSection />
          <LinksSection />
          <CategoriesSection />
        </div>
        <div className="flex flex-col gap-4 2xl:gap-6">
          <RecentsSection />
          <ArchiveSection />
          <TagsSection />
        </div>
      </div>
      <div className="hidden order-1 2xl:flex 2xl:w-full 2xl:max-w-96 flex-col 2xl:gap-6">
        <ProfileSection />
        <LinksSection />
        <CategoriesSection />
      </div>
      <div className="hidden order-3 2xl:flex 2xl:w-full 2xl:max-w-96 flex-col 2xl:gap-6">
        <RecentsSection />
        <ArchiveSection />
        <TagsSection />
      </div>
    </div>
  )
}
