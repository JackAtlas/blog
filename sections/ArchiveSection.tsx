'use client'

import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import type { Archive } from '@/types/archive'

async function fetchArchives(): Promise<Archive[]> {
  const res = await fetch('/api/articles/archive')

  return res.json()
}

export default function ArchiveSection() {
  const { data: archives = [] } = useQuery({
    queryKey: ['archives'],
    queryFn: fetchArchives,
    staleTime: 1000 * 60 * 10
  })
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
