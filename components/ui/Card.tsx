export default function Card({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-sm card card-shadow overflow-hidden">
      {children}
    </div>
  )
}
