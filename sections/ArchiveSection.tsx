import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { getArchivedArticles } from '@/lib/actions/article/get-archived-articles'
import Link from 'next/link'

export default async function ArchiveSection() {
  const archives = await getArchivedArticles()

  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-muted-foreground text-xs tracking-widest uppercase">
          Archives
        </div>
        <ul>
          {archives.map((archive) => (
            <li key={archive.year}>
              <Link
                href={`/archives/${archive.year}`}
                className="flex items-center justify-between hover:bg-muted h-9 px-2"
              >
                <span className="text-sm">{archive.year}</span>
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
