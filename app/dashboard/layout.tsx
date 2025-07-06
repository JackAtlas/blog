import { cookies } from 'next/headers'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import {
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

export default async function DashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  const defaultOpen =
    cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
