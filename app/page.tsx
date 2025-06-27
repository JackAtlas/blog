import SignIn from '@/components/SignIn'
import SignOut from '@/components/SignOut'
import UserAvatar from '@/components/UserAvatar'

export default function page() {
  return (
    <div>
      <div className="flex justify-between">
        <SignIn />
        <SignOut />
      </div>
      <div>
        <UserAvatar />
      </div>
    </div>
  )
}
