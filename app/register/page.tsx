'use client'

import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { LuGalleryVerticalEnd, LuLoaderCircle } from 'react-icons/lu'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { register } from '@/lib/actions/auth/register'
import { ThemeAndModeSwitcher } from '@/components/theme-and-mode-switcher'

export default function RegisterPage() {
  const router = useRouter()
  const [formState, formAction, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      const result = await register(formData)

      if (!result.error) {
        toast.success('注册成功！')
        router.push('/login')
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
            <form action={formAction} className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">注册账号</h1>
                <p className="text-muted-foreground text-sm text-nowrap">
                  输入邮箱地址和密码以创建账号
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
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="请输入密码"
                    required
                  />
                </div>
              </div>
              {formState?.error && (
                <p className="text-sm text-red-500">
                  {formState.error}
                </p>
              )}
              <Button type="submit" className="w-full cursor-pointer">
                {isPending ? (
                  <LuLoaderCircle className="animate-spin" />
                ) : (
                  '注册'
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
