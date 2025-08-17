'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState } from 'react'
import { LuGalleryVerticalEnd, LuLoaderCircle } from 'react-icons/lu'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/actions/auth/login'
import { useSession } from 'next-auth/react'

export default function LoginPage() {
  const router = useRouter()
  const { update } = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const [formState, formAction, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      const result = await login(formData)

      if (!result.error) {
        toast.success('登入成功！')
        await update()
        router.push(callbackUrl)
      }

      return result
    },
    { error: null }
  )

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="https://jackatlas.xyz/"
            className="flex items-center gap-2 font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <LuGalleryVerticalEnd className="size-4" />
            </div>
            JackAtlas
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form action={formAction} className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">登入账号</h1>
                <p className="text-muted-foreground text-sm text-nowrap">
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
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">密码</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      忘记密码？
                    </a>
                  </div>
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
                  '登入'
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
