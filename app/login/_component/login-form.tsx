import { Button, Input, Label } from '@/components/ui'
import { useLoginAction } from '@/hooks/use-login-action'
import { safeCallback } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

export default function LoginForm() {
  const searchParams = useSearchParams()

  const callbackUrl = useMemo(() => {
    return safeCallback(searchParams.get('callback') || '/dashboard')
  }, [searchParams])

  const { state, action, pending } = useLoginAction()

  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (state?.error) setShowError(true)
  }, [state?.error])

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">登入账号</h1>
        <p className="text-muted-foreground text-sm text-balance">
          输入邮箱和密码登入您的账号
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">邮箱地址</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="请输入邮箱"
            autoComplete="email"
            required
            onChange={() => setShowError(false)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">密码</Label>
            <Link
              href="/reset-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              忘记密码？
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="请输入密码"
            autoComplete="current-password"
            required
            onChange={() => setShowError(false)}
          />
        </div>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      </div>
      {showError && (
        <p className="text-sm text-red-500">{state?.error}</p>
      )}
      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={pending}
      >
        {pending ? (
          <LuLoaderCircle className="animate-spin" />
        ) : (
          '登入'
        )}
      </Button>
    </form>
  )
}
