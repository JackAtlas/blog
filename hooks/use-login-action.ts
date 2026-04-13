import { login } from '@/lib/actions/auth/login'
import { useActionState } from 'react'

export function useLoginAction() {
  const [state, action, pending] = useActionState(
    async (_: any, formData: FormData) => {
      return await login(formData)
    },
    { error: null }
  )

  return { state, action, pending }
}
