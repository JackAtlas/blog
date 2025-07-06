import Card from '@/components/blog/Card'
import CardContent from '@/components/blog/CardContent'

export default function TagsSection() {
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-[#7a7a7a] text-xs tracking-widest uppercase">
          Tags
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="/tag/demo" className="flex" title="Demo">
            <div className="bg-blue-600 text-xs text-white rounded-l-sm px-2 py-1 whitespace-nowrap">
              Demo
            </div>
            <div className="bg-gray-100 text-xs rounded-r-sm px-2 py-1">
              19
            </div>
          </a>
          <a
            href="/tag/getting-started"
            className="flex"
            title="Getting Started"
          >
            <div className="bg-blue-600 text-xs text-white rounded-l-sm px-2 py-1 whitespace-nowrap">
              Getting Started
            </div>
            <div className="bg-gray-100 text-xs rounded-r-sm px-2 py-1">
              4
            </div>
          </a>
          <a
            href="/tag/icarus-user-guide"
            className="flex"
            title="Icarus User Guide"
          >
            <div className="bg-blue-600 text-xs text-white rounded-l-sm px-2 py-1 whitespace-nowrap">
              Icarus User Guide
            </div>
            <div className="bg-gray-100 text-xs rounded-r-sm px-2 py-1">
              12
            </div>
          </a>
          <a
            href="/tag/icarus-用户指南"
            className="flex"
            title="Icarus用户指南"
          >
            <div className="bg-blue-600 text-xs text-white rounded-l-sm px-2 py-1 whitespace-nowrap">
              Icarus用户指南
            </div>
            <div className="bg-gray-100 text-xs rounded-r-sm px-2 py-1">
              12
            </div>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
