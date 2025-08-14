import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { getArchivedArticlesByMonth } from '@/lib/actions/article/get-archived-articles-by-month'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'

export default async function ArchiveSection() {
  const archives = await getArchivedArticlesByMonth()

  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-muted-foreground text-xs tracking-widest uppercase">
          Archives
        </div>
        <ul>
          {archives.map((archive) => (
            <li key={archive.year + '-' + archive.month}>
              <Link
                href={`/archives/${archive.year}/${archive.month}/`}
                className="flex items-center justify-between hover:bg-muted h-9 px-2"
              >
                <span className="text-sm">
                  {format(
                    new Date(archive.year, archive.month - 1),
                    'MMMM yyyy',
                    {
                      locale: zhCN
                    }
                  )}
                </span>
                <span className="h-[2em] flex items-center bg-muted text-muted-foreground text-xs rounded-sm px-[0.75em]">
                  {archive.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
