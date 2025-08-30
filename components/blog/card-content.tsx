import { cn } from '@/lib/utils'

export default function CardContent({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('p-6', className)}>{children}</div>
}
