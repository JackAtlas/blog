import { findRecordByToken } from '@/lib/actions/auth/findRecordByToken'
import ResetPasswordForm from './_components/reset-password-form'

export default async function ResetPasswordConfirmPage({
  searchParams
}: {
  searchParams: { token: string }
}) {
  const { token } = await searchParams
  const record = await findRecordByToken(token)

  if (record.error) {
    return <div>{record.error}</div>
  }

  return <ResetPasswordForm token={token} />
}
