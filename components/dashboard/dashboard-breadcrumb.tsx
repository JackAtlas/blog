'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardBreadcrumb() {
  const [second, setSecond] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const arr = pathname.split('/')
    setSecond('')
    if (arr[2]) {
      switch (arr[2]) {
        case 'articles':
          setSecond('文章')
          break
        case 'categories':
          setSecond('栏目')
          break
        case 'tags':
          setSecond('标签')
          break
        case 'gallery':
          setSecond('图库')
          break
        default:
          setSecond('')
      }
    }
  }, [pathname])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            href="/dashboard"
            className="md:text-base 2xl:text-lg"
          >
            首页
          </BreadcrumbLink>
        </BreadcrumbItem>
        {second !== '' && (
          <>
            <BreadcrumbSeparator className="hidden md:block md:[&>svg]:size-4 2xl:[&>svg]:size-4.5" />
            <BreadcrumbItem>
              <BreadcrumbPage className="md:text-base 2xl:text-lg">
                {second}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
