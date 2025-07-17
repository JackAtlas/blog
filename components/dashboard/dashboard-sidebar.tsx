'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { MdOutlineArticle } from 'react-icons/md'
import {
  LuChevronRight,
  LuFolder,
  LuHouse,
  LuTags,
  LuTrash2
} from 'react-icons/lu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar'
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
    icon: LuFolder,
    children: [
      {
        title: '前端',
        url: '/dashboard/category/前端'
      },
      {
        title: '生活',
        url: '/dashboard/category/生活'
      },
      {
        title: '游戏',
        url: '/dashboard/category/游戏',
        children: [
          {
            title: '赛博朋克2077',
            url: '/dashboard/category/游戏/赛博朋克2077'
          },
          {
            title: '宝可梦',
            url: '/dashboard/category/游戏/宝可梦'
          }
        ]
      }
    ]
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
                <Collapsible
                  className="group/collapsible"
                  defaultOpen
                  key={item.title}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {/* {item.children && (
                      <SidebarMenuAction className="hover:bg-zinc-200 cursor-pointer">
                        <CollapsibleTrigger asChild>
                          <span>
                            <LuChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </span>
                        </CollapsibleTrigger>
                      </SidebarMenuAction>
                    )}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children?.map((child) => (
                          <Collapsible defaultOpen key={child.title}>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild>
                                <Link href={child.url}>
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                              {child.children && (
                                <SidebarMenuAction className="hover:bg-zinc-200 cursor-pointer">
                                  <CollapsibleTrigger asChild>
                                    <span>
                                      <LuChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </span>
                                  </CollapsibleTrigger>
                                </SidebarMenuAction>
                              )}
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {child.children?.map(
                                    (grandchild) => (
                                      <SidebarMenuSubItem
                                        key={grandchild.title}
                                      >
                                        <SidebarMenuSubButton asChild>
                                          <Link href={grandchild.url}>
                                            <span>
                                              {grandchild.title}
                                            </span>
                                          </Link>
                                        </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                    )
                                  )}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </SidebarMenuSubItem>
                          </Collapsible>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent> */}
                  </SidebarMenuItem>
                </Collapsible>
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
