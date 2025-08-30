'use client'

import { LuLogOut } from 'react-icons/lu'
import { TbDotsVertical } from 'react-icons/tb'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { logout } from '@/lib/actions/auth/logout'
import { useRouter } from 'next/navigation'

export default function NavUser({
  user
}: {
  user: { name: string; email: string }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="rounded-lg md:size-10 2xl:size-12">
                <AvatarImage src="/avatar.jpg" alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  JA
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-medium text-sm md:text-base 2xl:text-lg">
                  {user.name}
                </span>
                <span className="text-muted-foreground truncate text-xs md:text-sm 2xl:text-base">
                  {user.email}
                </span>
              </div>
              <TbDotsVertical />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem
              className="p-0 font-normal"
              onClick={() => router.push('/dashboard/user/config')}
            >
              <div className="flex items-center gap-2 px-1 py-1.5 text-left">
                <Avatar className="rounded-lg md:size-10 2xl:size-12">
                  <AvatarImage src="/avatar.jpg" alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    JA
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium text-sm md:text-base 2xl:text-lg">
                    {user.name}
                  </span>
                  <span
                    className="text-muted-foreground truncate text-xs md:text-sm 2xl:text-base"
                    title={user.email}
                  >
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout()}
              className="md:text-base 2xl:text-lg"
            >
              <LuLogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
