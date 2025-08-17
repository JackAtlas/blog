import { auth } from '@/auth'
import UserConfigForm from './form'

export default async function UserConfigPage() {
  const session = await auth()
  return (
    <div>
      <UserConfigForm user={session?.user!} />
    </div>
  )
}
