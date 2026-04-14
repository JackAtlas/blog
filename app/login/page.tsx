'use client'

import { LuGalleryVerticalEnd } from 'react-icons/lu'
import { ThemeAndModeSwitcher } from '@/components/theme-and-mode-switcher'
import { Suspense } from 'react'
import LoginForm from './_component/login-form'

export default function LoginPage() {
  return (
    <Suspense>
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
              <Suspense fallback={<LoginSkeleton />}>
                <LoginForm />
              </Suspense>
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
    </Suspense>
  )
}

function LoginSkeleton() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="text-sm text-muted-foreground">
        Loading login...
      </div>
    </div>
  )
}
