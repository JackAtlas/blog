import { signIn } from '@/auth'

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <button>Sign in with GitHub</button>
    </form>
  )
}
