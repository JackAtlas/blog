'use client'

import { LuGalleryVerticalEnd, LuLoaderCircle } from 'react-icons/lu'
import { Button, Input, Label } from '@/components/ui'
import { ThemeAndModeSwitcher } from '@/components/theme-and-mode-switcher'
import { useResetPwdEmailAction } from '@/hooks/use-reset-pwd-email-action'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
  const { state, action, pending } = useResetPwdEmailAction()

  useEffect(() => {
    if (!pending && state?.success) {
      toast.success('重置链接已发送，请检查您的邮箱！')
    }
  }, [state, pending])

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
                <h1 className="text-2xl font-bold">忘记密码</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  请输入邮箱地址，我们将向您发送重置密码的链接
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
                  />
                </div>
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
                  <LuLoaderCircle className="animate-spin" />
                ) : (
                  '发送重置链接'
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
