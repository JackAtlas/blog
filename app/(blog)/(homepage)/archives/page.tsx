import { Card, CardContent } from '@/components/ui'
import { getArchivedArticlesByYear } from '@/lib/actions/article/get-archived-articles-by-year'
import { formatDate } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export default async function ArchivesPage() {
  const archives = await getArchivedArticlesByYear()

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {archives.map((archive) => (
        <Card key={`${archive.year}`}>
          <CardContent>
            <div className="flex">
              <h2 className="bg-muted text-muted-foreground p-2 text-xs font-bold rounded-lg">
                {archive.year}
              </h2>
            </div>
            <ul className="flex flex-col gap-6 pt-4 relative before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-accent">
              {archive.articles.map((article) => (
                <li
                  key={article.id}
                  className="relative ps-10 flex gap-4 before:absolute before:top-2 before:left-2 before:w-4 before:h-4 before:bg-accent before:rounded-full"
                >
                  <Link
                    href={`/article/${article.id}`}
                    title={article.title}
                  >
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      width={64}
                      height={64}
                    />
                  </Link>
                  <div className="flex flex-col gap-1">
                    <div className="text-muted-foreground text-xs">
                      {formatDate(article.createdAt, 'yyyy-MM-dd')}
                    </div>
                    <Link
                      href={`/article/${article.id}`}
                      className="hover:text-primary text-sm"
                    >
                      {article.title}
                    </Link>
                    <Link
                      href={`/category/${article.category?.name}`}
                      className="text-muted-foreground text-xs"
                    >
                      {article.category?.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
