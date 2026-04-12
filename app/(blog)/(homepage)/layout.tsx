import HomepageSidebarLeft from '@/components/blog/homepage-sidebar-left'
import HomePageSidebarRight from '@/components/blog/homepage-sidebar-right'

export const dynamic = 'force-dynamic'

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
          <HomepageSidebarLeft />
        </div>
        <div className="flex flex-col gap-4 2xl:gap-6">
          <HomePageSidebarRight />
        </div>
      </div>
      <div className="hidden order-1 2xl:flex 2xl:w-full 2xl:max-w-96 flex-col 2xl:gap-6">
        <HomepageSidebarLeft />
      </div>
      <div className="hidden order-3 2xl:flex 2xl:w-full 2xl:max-w-96 flex-col 2xl:gap-6">
        <HomePageSidebarRight />
      </div>
    </div>
  )
}
