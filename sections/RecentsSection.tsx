import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { getArticles } from '@/lib/actions/article/get-articles'
import { format } from 'date-fns'

export default async function RecentsSection() {
  const articles = (await getArticles()).slice(0, 5)

  return (
    <Card>
      {/* <pre>{JSON.stringify(articles, null, 2)}</pre> */}
      <CardContent>
        <div className="-mb-5 text-[#7a7a7a] text-xs tracking-widest uppercase">
          Recents
        </div>
        {articles.map((article) => (
          <div className="flex mt-7" key={article.id}>
            <Link
              href={`/article/${article.slug}`}
              title={article.title}
              className="mr-4"
            >
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={64}
                height={64}
              />
            </Link>
            <div className="flex-1 grid grid-rows-3">
              <time className="flex items-start text-sm text-[#7a7a7a]">
                {format(article.createdAt, 'yyyy-MM-dd')}
              </time>
              <Link
                href={`/article/${article.slug}`}
                title={article.title}
                className="hover:text-[#3273dc] truncate"
              >
                {article.title}
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
