import { auth } from '@/auth'

export default async function UserAvatar() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <div>
      <img src={session.user.image!} alt={session.user.name!} />
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </div>
  )
}
