import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { TagPublicDTO } from '@/types/tag'
import Link from 'next/link'

export default function TagsSection({
  tags
}: {
  tags: TagPublicDTO[]
}) {
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-muted-foreground text-xs md:text-sm 2xl:text-base tracking-widest uppercase">
          Tags
        </div>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Link
              href={`/tags/${tag.name}`}
              className="flex"
              title={tag.name}
              key={tag.id}
            >
              <div className="bg-primary hover:bg-primary/80 text-primary-foreground text-xs md:text-sm 2xl:text-base rounded-l-sm px-2 py-1 whitespace-nowrap">
                {tag.name}
              </div>
              <div className="bg-muted hover:bg-muted/80 text-muted-foreground text-xs md:text-sm 2xl:text-base rounded-r-sm px-2 py-1">
                {tag._count?.articles ?? 0}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
