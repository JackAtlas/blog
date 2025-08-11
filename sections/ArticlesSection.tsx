'use server'

import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import CardHeader from '@/components/blog/card-header'
import { getArticles } from '@/lib/actions/article/get-articles'
import Image from 'next/image'
import Link from 'next/link'

export default async function ArticlesSection() {
  const articles = await getArticles()
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id} className="mb-4 lg:mb-6">
          <Card>
            <CardHeader>
              <Image
                src={article.coverUrl}
                alt={article.title}
                width={700}
                height={300}
                className="w-full h-auto"
              />
            </CardHeader>
            <CardContent>
              <div className="flex text-xs uppercase text-[#7a7a7a]">
                <div>posted 5 years ago</div>
                <div className="ms-3">plugins/comment</div>
                <div className="ms-3">
                  3 minutes read (about 495 words)
                </div>
              </div>
              <Link
                href={`/articles/${article.slug}`}
                title={article.title}
              >
                <h2 className="text-3xl mt-2 mb-6 hover:text-[#3273dc]">
                  {article.title}
                </h2>
              </Link>
              <div className="mb-6">
                <p className="mt-2">{article.excerpt}</p>
              </div>
              <Link
                href={`/article/${article.slug}`}
                title="read more"
                className="inline-block rounded-xs text-xs bg-[#f5f5f5] dark:bg-gray-800 hover:bg-[#eee] dark:hover:bg-gray-700 h-7 leading-7 px-[1em]"
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
