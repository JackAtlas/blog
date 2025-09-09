import Link from 'next/link'
import { MdOutlineArticle } from 'react-icons/md'
import {
  LuFolder,
  LuHouse,
  LuImage,
  LuTags,
  LuTrash2
} from 'react-icons/lu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui'
import NavUser from '@/components/dashboard/nav-user'
import { auth } from '@/auth'

const items = [
  {
    title: '首页',
    url: '/dashboard',
    icon: LuHouse
  },
  {
    title: '文章',
    url: '/dashboard/articles',
    icon: MdOutlineArticle
  },
  {
    title: '栏目',
    url: '/dashboard/categories',
    icon: LuFolder
  },
  {
    title: '标签',
    url: '/dashboard/tags',
    icon: LuTags
  },
  {
    title: '图库',
    url: '/dashboard/gallery',
    icon: LuImage
  },
  {
    title: '回收站',
    url: '/dashboard/bin',
    icon: LuTrash2
  }
]

export default async function DashboardSidebar() {
  const session = await auth()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="md:text-sm 2xl:text-base">
            Blog
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="h-auto [&>svg]:md:size-5 [&>svg]:2xl:size-6 gap-2 md:gap-4 2xl:gap-6"
                    >
                      <item.icon />
                      <div className="text-sm md:text-base 2xl:text-lg leading-[1] pt-1">
                        {item.title}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        {session?.user && <NavUser user={session.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
