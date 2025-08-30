import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { getArchivedArticles } from '@/lib/actions/article/get-archived-articles'
import Link from 'next/link'

export default async function ArchiveSection() {
  const archives = await getArchivedArticles()

  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-muted-foreground text-xs md:text-sm 2xl:text-base tracking-widest uppercase">
          Archives
        </div>
        <ul>
          {archives.map((archive) => (
            <li key={archive.year}>
              <Link
                href={`/archives/${archive.year}`}
                className="flex items-center justify-between hover:bg-muted p-2"
              >
                <span className="text-sm md:text-base 2xl:text-lg font-mono">
                  {archive.year}
                </span>
                <span className="h-[2em] flex items-center bg-muted text-muted-foreground text-xs md:text-sm 2xl:text-base font-mono rounded-sm px-[0.75em]">
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
