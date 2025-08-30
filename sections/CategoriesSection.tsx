import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { getTopCategories } from '@/lib/actions/category/get-top-categories'
import Link from 'next/link'

export default async function CategoriesSection() {
  const categories = await getTopCategories()
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
                  {category.articles.length}
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
                        {child.articles.length}
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
