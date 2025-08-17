'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { MdOutlineArticle } from 'react-icons/md'
import { LuFolder, LuHouse, LuTags, LuTrash2 } from 'react-icons/lu'
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
    title: '回收站',
    url: '#',
    icon: LuTrash2
  }
]

export default function DashboardSidebar() {
  const { data: session } = useSession()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Blog</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.title}</span>
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
