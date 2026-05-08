import { cn } from '@/lib/utils'

export default function Card({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rounded-xl card bg-card text-card-foreground overflow-hidden border shadow-sm',
        className
      )}
      {...props}
    ></div>
  )
}
