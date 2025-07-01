import BlogFooter from '@/components/BlogFooter'
import BlogHeader from '@/components/BlogHeader'

export default function BlogLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader />
      <main className="flex-1">{children}</main>
      <BlogFooter />
    </div>
  )
}
