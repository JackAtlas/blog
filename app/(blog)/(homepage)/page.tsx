import ArchiveSection from '@/sections/ArchiveSection'
import CategoriesSection from '@/sections/CategoriesSection'
import LinksSection from '@/sections/LinksSection'
import TagsSection from '@/sections/TagsSection'

export default function HomePage() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-12 gap-6">
        <div className="order-1 lg:order-2 lg:col-span-2 bg-blue-200 p-4">
          模块 A
        </div>
        <div className="order-2 lg:hidden flex flex-col gap-6">
          <div>
            <LinksSection />
            <CategoriesSection />
          </div>
          <div>
            <ArchiveSection />
            <TagsSection />
          </div>
        </div>
        <div className="hidden lg:block order-1">
          <LinksSection />
          <CategoriesSection />
        </div>
        <div className="hidden lg:block order-3">
          <ArchiveSection />
          <TagsSection />
        </div>
      </div>
    </div>
  )
}
