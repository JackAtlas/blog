import DashboardHeader from '@/components/DashboardHeader'

export default function DashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <DashboardHeader />
      {children}
      <footer>footer</footer>
    </div>
  )
}
