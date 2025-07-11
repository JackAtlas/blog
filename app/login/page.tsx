'use client'

import { LuGalleryVerticalEnd } from 'react-icons/lu'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('请输入邮箱和密码')
      return
    }

    // TODO
  }

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-muted">
  //     <Card className="w-full max-w-sm shadow-lg">
  //       <CardHeader>
  //         <CardTitle className="text-center text-2xl">登录</CardTitle>
  //         <CardContent>
  //           <form onSubmit={handleSubmit} className="space-y-4">
  //             <div>
  //               <Label htmlFor="email">邮箱</Label>
  //               <Input
  //                 id="email"
  //                 type="email"
  //                 placeholder="请输入邮箱"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             <div>
  //               <Label htmlFor="password">密码</Label>
  //               <Input
  //                 id="password"
  //                 type="password"
  //                 placeholder="请输入密码"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             {error && (
  //               <p className="text-sm text-red-500">{error}</p>
  //             )}
  //             <Button type="submit" className="w-full"></Button>
  //           </form>
  //         </CardContent>
  //       </CardHeader>
  //     </Card>
  //   </div>
  // )
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
            <form className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                  Login to your account
                </h1>
                <p className="text-muted-foreground text-sm text-nowrap">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Login
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
