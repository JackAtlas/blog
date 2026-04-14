'use client'

import { ThemeAndModeSwitcher } from '@/components/theme-and-mode-switcher'
import { Button, Input, Label } from '@/components/ui'
import { resetPassword } from '@/lib/actions/auth/resetPassword'
import { useActionState } from 'react'
import { LuGalleryVerticalEnd, LuLoaderCircle } from 'react-icons/lu'
import { toast } from 'sonner'

export default function ResetPasswordForm({
  token
}: {
  token: string
}) {
  const [state, action, pending] = useActionState(
    async (_: any, formData: FormData) => {
      const password = formData.get('password')
      const confirmPassword = formData.get('confirmPassword')

      if (password !== confirmPassword) {
        return { error: '两次输入的密码不一致' }
      }

      const result = await resetPassword(formData)

      if (!result.error) {
        toast.success('密码重置成功！请使用新密码登录。')
        setTimeout(() => {
          window.location.href = '/login'
        }, 800)
      }

      return result
    },
    { error: null }
  )

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex gap-2 justify-between">
          <a
            href="https://jackatlas.xyz/"
            className="flex items-center gap-2 font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <LuGalleryVerticalEnd className="size-4" />
            </div>
            JackAtlas
          </a>
          <ThemeAndModeSwitcher />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form action={action} className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">重置密码</h1>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">新密码</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="请输入新密码"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="confirmPassword">新密码</Label>
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="重复输入新密码"
                    required
                  />
                </div>
                <input type="hidden" name="token" value={token} />
              </div>
              {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <LuLoaderCircle className="animate-spin" />
                    重置中……
                  </>
                ) : (
                  '重置密码'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://picsum.photos/2560/1440"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
