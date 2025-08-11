export default function Card({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="rounded-sm card card-shadow overflow-hidden">
      {children}
    </div>
  )
}
