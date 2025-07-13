import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import Link from 'next/link'

export default function CategoriesSection() {
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-[#7a7a7a] text-xs tracking-widest uppercase">
          Categories
        </div>
        <ul>
          <li>
            <Link
              href="/category/configuration"
              className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
            >
              <span className="text-sm">Configuration</span>
              <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                4
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/category/plugins"
              className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
            >
              <span className="text-sm">Plugins</span>
              <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                12
              </span>
            </Link>
            <ul className="py-2 pl-2">
              <li className="pl-2 border-l border-l-gray-300">
                <Link
                  href="/category/plugins/analytics"
                  className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
                >
                  <span className="text-sm">Analytics</span>
                  <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                    2
                  </span>
                </Link>
              </li>
              <li className="pl-2 border-l border-l-gray-300">
                <Link
                  href="/category/plugins/comment"
                  className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
                >
                  <span className="text-sm">Comment</span>
                  <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                    2
                  </span>
                </Link>
              </li>
              <li className="pl-2 border-l border-l-gray-300">
                <Link
                  href="/category/donation"
                  className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
                >
                  <span className="text-sm">Donation</span>
                  <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                    2
                  </span>
                </Link>
              </li>
              <li className="pl-2 border-l border-l-gray-300">
                <Link
                  href="/category/other"
                  className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
                >
                  <span className="text-sm">Other</span>
                  <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                    2
                  </span>
                </Link>
              </li>
              <li className="pl-2 border-l border-l-gray-300">
                <Link
                  href="/category/search"
                  className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
                >
                  <span className="text-sm">Search</span>
                  <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                    2
                  </span>
                </Link>
              </li>
              <li className="pl-2 border-l border-l-gray-300">
                <Link
                  href="/category/share"
                  className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
                >
                  <span className="text-sm">Share</span>
                  <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                    2
                  </span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="/category/widgets"
              className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
            >
              <span className="text-sm">Widgets</span>
              <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                2
              </span>
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
