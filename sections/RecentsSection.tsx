import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { format } from 'date-fns'
import { ExtendedArticle } from '@/types/article'

export default function RecentsSection({
  articles
}: {
  articles: ExtendedArticle[]
}) {
  return (
    <Card>
      <CardContent>
        <div className="-mb-5 text-muted-foreground text-xs md:text-sm 2xl:text-base tracking-widest uppercase">
          Recents
        </div>
        {articles.slice(0, 5).map((article) => (
          <div className="flex mt-7" key={article.id}>
            <Link
              href={`/article/${article.slug}`}
              title={article.title}
              className="mr-2 md:mr-4"
            >
              <Image
                src={article.thumbnailUrl}
                alt={article.title}
                width={80}
                height={80}
                className="size-16 md:size-20"
              />
            </Link>
            <div className="flex-1 grid grid-rows-3">
              <time className="flex items-start text-sm md:text-base text-muted-foreground">
                {format(article.createdAt, 'yyyy-MM-dd')}
              </time>
              <Link
                href={`/article/${article.slug}`}
                title={article.title}
                className="md:text-lg hover:text-primary truncate"
              >
                {article.title}
              </Link>
              <Link
                href={`/article/${article.category?.name}`}
                title={article.category?.name}
                className="text-sm md:text-base text-muted-foreground hover:text-muted-foreground/50 truncate"
              >
                {article.category?.name}
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
