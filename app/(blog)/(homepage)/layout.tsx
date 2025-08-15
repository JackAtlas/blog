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
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-12 gap-4 lg:gap-6">
        <div className="order-1 lg:order-2 md:col-span-2">
          {children}
        </div>
        <div className="order-2 lg:hidden flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-4 lg:gap-6">
            <ProfileSection />
            <LinksSection />
            <CategoriesSection />
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
            <RecentsSection />
            <ArchiveSection />
            <TagsSection />
          </div>
        </div>
        <div className="hidden order-1 lg:flex flex-col lg:gap-6">
          <ProfileSection />
          <LinksSection />
          <CategoriesSection />
        </div>
        <div className="hidden order-3 lg:flex flex-col lg:gap-6">
          <RecentsSection />
          <ArchiveSection />
          <TagsSection />
        </div>
      </div>
    </div>
  )
}
