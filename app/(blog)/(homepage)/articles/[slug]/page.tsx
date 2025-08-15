import Image from 'next/image'
import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import CardHeader from '@/components/blog/card-header'
import { getArticleBySlug } from '@/lib/actions/article/get-article-by-slug'
import { formatDistanceToNow } from 'date-fns'
import MarkdownPreview from '@/components/blog/markdown-preview'

export default async function ArticlePage({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) return <div>Article not found.</div>

  return (
    <Card>
      <CardHeader>
        <Image
          className="aspect-video object-cover"
          src={article.coverUrl}
          alt={article.title}
          width={700}
          height={300}
        />
      </CardHeader>
      <CardContent>
        <article>
          <div className="flex text-xs uppercase text-muted-foreground">
            <div>
              {formatDistanceToNow(article.createdAt, {
                addSuffix: true
              })}
            </div>
            <div className="ms-3">{article.category?.name}</div>
          </div>
          <h1 className="text-3xl my-6">{article.title}</h1>
          <div className="flex flex-wrap gap-4 my-6">
            {article.tags.map((tag) => (
              <a
                href={`/tag/${tag.name}`}
                title={tag.name}
                key={tag.id}
              >
                <div className="bg-primary text-xs text-primary-foreground rounded-l-sm px-2 py-1 whitespace-nowrap">
                  {tag.name}
                </div>
              </a>
            ))}
          </div>
          <MarkdownPreview source={article.content}></MarkdownPreview>
          <div className="flex flex-wrap gap-4 mt-6">
            {article.tags.map((tag) => (
              <a
                href={`/tag/${tag.name}`}
                title={tag.name}
                key={tag.id}
              >
                <div className="bg-gray-600 text-xs text-white rounded-l-sm px-2 py-1 whitespace-nowrap">
                  {tag.name}
                </div>
              </a>
            ))}
          </div>
        </article>
      </CardContent>
    </Card>
  )
}
