import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import CardHeader from '@/components/blog/card-header'
import { getArticlesByCategoryName } from '@/lib/actions/article/get-articles-by-category-name'
import { getCategoryInfoByName } from '@/lib/actions/category/get-category-info-by-name'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoryPage({
  params
}: {
  params: { name: string }
}) {
  const { name } = await params
  const category = await getCategoryInfoByName(
    decodeURIComponent(name)
  )

  if (!category) {
    return (
      <div className="flex flex-col gap-4 lg:gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4 h-9 px-2">
              <div className="text-sm">
                栏目“{decodeURIComponent(name)}”不存在
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const articles = await getArticlesByCategoryName(
    decodeURIComponent(name)
  )

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 h-9 px-2">
            {category?.parent && (
              <>
                <div>{category.parent.name}</div>
                <div>&gt;</div>
              </>
            )}
            <div>{decodeURIComponent(name)}</div>
          </div>
          {category?.children?.length !== 0 && (
            <ul className="py-2 pl-2">
              {category.children.map((child) => (
                <li
                  key={child.id}
                  className="pl-2 border-l border-l-gray-300"
                >
                  <Link
                    href={`/categories/${child.name}`}
                    className="flex items-center justify-between hover:bg-muted h-9 px-2"
                  >
                    <span className="text-sm">{child.name}</span>
                    <span className="h-[2em] flex items-center bg-muted text-muted-foreground text-xs rounded-sm px-[0.75em]">
                      {child.articles.length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      {category?.children.length === 0 && (
        <>
          <ul className="flex flex-col gap-4 lg:gap-6">
            {articles.map((article) => (
              <li key={article.id}>
                <Card>
                  <CardHeader>
                    <Image
                      src={article.coverUrl}
                      alt={article.title}
                      width={700}
                      height={300}
                      className="aspect-video object-cover"
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-xs uppercase text-muted-foreground">
                      <div>
                        {formatDistanceToNow(article.createdAt, {
                          addSuffix: true
                        })}
                      </div>
                      <div className="ms-3">
                        {article.category?.name}
                      </div>
                    </div>
                    <Link
                      href={`/articles/${article.slug}`}
                      title={article.title}
                    >
                      <h2 className="text-3xl my-6 hover:text-primary">
                        {article.title}
                      </h2>
                    </Link>
                    <div className="mb-6">
                      <p className="mt-2">{article.excerpt}</p>
                    </div>
                    <Link
                      href={`/article/${article.slug}`}
                      title="read more"
                      className="inline-block rounded-xs text-xs bg-accent hover:bg-accent/60 text-accent-foreground h-7 leading-7 px-[1em]"
                    >
                      Read more
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
          {articles.length === 0 && (
            <div className="text-center">暂无文章，敬请期待</div>
          )}
        </>
      )}
    </div>
  )
}
