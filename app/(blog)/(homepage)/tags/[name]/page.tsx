import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { getArticlesByTagName } from '@/lib/actions/article/get-articles-by-tag-name'
import { ArticlesSection } from '@/sections'

export default async function TagPage({
  params
}: {
  params: { name: string }
}) {
  const { name } = await params

  const tagName = decodeURIComponent(name)

  const { tag, articles } = await getArticlesByTagName(tagName)

  if (!tag) {
    return (
      <div className="flex flex-col gap-4 lg:gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4 h-9 px-2">
              <div className="text-sm">标签“{tagName}”不存在</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-4 h-9 px-2">
            <div className="flex">
              <div className="bg-primary text-primary-foreground text-xs rounded-l-sm px-2 py-1 whitespace-nowrap">
                {tagName}
              </div>
              <div className="bg-muted text-muted-foreground text-xs rounded-r-sm px-2 py-1">
                {articles.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ArticlesSection articles={articles} />
      {articles.length === 0 && (
        <div className="text-center">暂无文章，敬请期待</div>
      )}
    </div>
  )
}
