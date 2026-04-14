import { resetPasswordTokenAndEmail } from '@/lib/actions/auth/resetPasswordTokenAndEmail'
import { useActionState } from 'react'

export function useResetPwdEmailAction() {
  const [state, action, pending] = useActionState(
    async (_: any, formData: FormData) => {
      return await resetPasswordTokenAndEmail(formData)
    },
    { error: null }
  )

  return { state, action, pending }
}
