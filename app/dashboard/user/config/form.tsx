'use client'

import { Button, Input, Label } from '@/components/ui'
import { logout } from '@/lib/actions/auth/logout'
import { useActionState } from 'react'
import { LuLoaderCircle } from 'react-icons/lu'
import { toast } from 'sonner'

export default function UserConfigForm({
  user
}: {
  user: { email: string; id: string; name: string }
}) {
  const [formState, formAction, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      formData.append('id', user.id as string)

      const res = await fetch('/api/user', {
        method: 'PUT',
        body: formData
      })
      toast.success('用户名已更新，请重新登录。')
      logout()
      return await res.json()
    },
    {
      email: user.email,
      id: user.id,
      name: user.name
    }
  )

  return (
    <form action={formAction}>
      <div className="flex flex-col items-center gap-4 lg:gap-6">
        <div className="flex gap-2 md:gap-4 2xl:gap-6 min-w-md max-w-lg md:min-w-lg md:max-w-xl 2xl:min-w-xl 2xl:max-w-2xl">
          <Label
            htmlFor="name"
            className="whitespace-nowrap md:text-base 2xl:text-lg"
          >
            用户名
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="请输入用户名"
            required
            defaultValue={formState.name}
            className="flex-1 md:text-base 2xl:text-lg"
          />
        </div>
        <div className="min-w-md max-w-lg md:min-w-lg md:max-w-xl 2xl:min-w-xl 2xl:max-w-2xl">
          <Button
            type="submit"
            className="w-full cursor-pointer md:h-10 md:text-base 2xl:h-11 2xl:text-lg"
          >
            {isPending ? (
              <LuLoaderCircle className="animate-spin" />
            ) : (
              '更新'
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
