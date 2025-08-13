export default function Card({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl card bg-card text-card-foreground overflow-hidden border shadow-sm">
      {children}
    </div>
  )
}
