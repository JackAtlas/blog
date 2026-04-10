'use client'

import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import type { TopCategory } from '@/lib/actions/category/get-top-categories'

async function fetchCategories(): Promise<TopCategory[]> {
  const res = await fetch('/api/categories?top=1')

  return res.json()
}

export default function CategoriesSection() {
  const { data: categories = [] } = useQuery({
    queryKey: ['top-categories'],
    queryFn: fetchCategories
  })
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-muted-foreground text-xs md:text-sm 2xl:text-base tracking-widest uppercase">
          Categories
        </div>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.name}`}
                className="flex items-center justify-between hover:bg-muted p-2"
              >
                <span className="text-sm md:text-base 2xl:text-lg">
                  {category.name}
                </span>
                <span className="h-[2em] flex items-center bg-muted text-muted-foreground text-xs md:text-sm 2xl:text-base font-mono rounded-sm px-[0.75em]">
                  {category._count?.articles ?? 0}
                </span>
              </Link>
              <ul className="py-2 pl-2">
                {category.children.map((child) => (
                  <li
                    key={child.id}
                    className="pl-2 border-l border-l-gray-300"
                  >
                    <Link
                      href={`/categories/${child.name}`}
                      className="flex items-center justify-between hover:bg-muted p-2"
                    >
                      <span className="text-sm md:text-base 2xl:text-lg">
                        {child.name}
                      </span>
                      <span className="h-[2em] flex items-center bg-muted text-muted-foreground text-xs md:text-sm 2xl:text-base font-mono rounded-sm px-[0.75em]">
                        {child._count?.articles ?? 0}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
