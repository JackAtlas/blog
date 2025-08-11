import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { getTags } from '@/lib/actions/tag/get-tags'

export default async function TagsSection() {
  const tags = await getTags()

  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-[#7a7a7a] text-xs tracking-widest uppercase">
          Tags
        </div>
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <a
              href={`/tag/${tag.name}`}
              className="flex"
              title={tag.name}
              key={tag.id}
            >
              <div className="bg-blue-600 dark:bg-blue-500 text-xs text-white rounded-l-sm px-2 py-1 whitespace-nowrap">
                {tag.name}
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 text-xs rounded-r-sm px-2 py-1">
                {tag.articles.length}
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
