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
        <div className="flex gap-3 min-w-md max-w-lg">
          <Label htmlFor="name" className="whitespace-nowrap">
            用户名
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="请输入用户名"
            required
            defaultValue={formState.name}
            className="flex-1"
          />
        </div>
        <div className="min-w-md max-w-lg">
          <Button type="submit" className="w-full cursor-pointer">
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
