import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import CardHeader from '@/components/blog/card-header'
import MarkdownPreview from '@/components/markdown-preview'
import { getArticles } from '@/lib/actions/article/get-articles'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export default async function ArticlesSection() {
  const articles = await getArticles()
  return (
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
                <div className="ms-3">{article.category?.name}</div>
              </div>
              <Link
                href={`/articles/${article.slug}`}
                title={article.title}
              >
                <h2 className="text-3xl my-6 hover:text-primary">
                  {article.title}
                </h2>
              </Link>
              {article.excerpt && (
                <div className="mb-6">
                  <MarkdownPreview content={article.excerpt} />
                </div>
              )}
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
  )
}
