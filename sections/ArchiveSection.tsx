import Card from '@/components/ui/Card'
import CardContent from '@/components/ui/CardContent'
import Link from 'next/link'

export default function ArchiveSection() {
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-[#7a7a7a] text-xs tracking-widest uppercase">
          Archives
        </div>
        <ul>
          <li>
            <Link
              className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
              href="/archives/2025/04/"
              title="/archives/2025/04/"
            >
              <span className="text-sm">April 2025</span>
              <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                1
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
              href="/archives/2025/03/"
              title="/archives/2025/03/"
            >
              <span className="text-sm">March 2025</span>
              <span className="h-[2em] flex items-center bg-gray-100 text-xs rounded-sm px-[0.75em]">
                1
              </span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center justify-between hover:bg-gray-100 h-9 px-2"
              href="/archives/2025/02/"
              title="/archives/2025/02/"
            >
              <span className="text-sm">February 2025</span>
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
