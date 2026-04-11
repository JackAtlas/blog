'use client'

import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { TagPublicDTO } from '@/types/tag'
import { useQuery } from '@tanstack/react-query'

async function fetchTags(): Promise<TagPublicDTO[]> {
  const res = await fetch('/api/tags')

  return res.json()
}

export default function TagsSection() {
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags
  })
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-muted-foreground text-xs md:text-sm 2xl:text-base tracking-widest uppercase">
          Tags
        </div>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <a
              href={`/tags/${tag.name}`}
              className="flex"
              title={tag.name}
              key={tag.id}
            >
              <div className="bg-primary hover:bg-primary/80 text-primary-foreground text-xs md:text-sm 2xl:text-base rounded-l-sm px-2 py-1 whitespace-nowrap">
                {tag.name}
              </div>
              <div className="bg-muted hover:bg-muted/80 text-muted-foreground text-xs md:text-sm 2xl:text-base rounded-r-sm px-2 py-1">
                {tag._count.articles}
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
