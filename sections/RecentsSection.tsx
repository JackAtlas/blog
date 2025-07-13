import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'

export default function RecentsSection() {
  return (
    <Card>
      <CardContent>
        <div className="mb-2 text-[#7a7a7a] text-xs tracking-widest uppercase">
          Recents
        </div>
        <div className="flex">
          <Link
            href="/article/getting-started-with-icarus"
            title="Getting Started with Icarus"
            className="mr-4"
          >
            <Image
              src="https://picsum.photos/128/128"
              alt="getting started"
              width={64}
              height={64}
            />
          </Link>
          <div className="flex-1 grid grid-rows-3">
            <time className="flex items-start text-sm text-[#7a7a7a]">
              2020-04-01
            </time>
            <Link
              href="/article/getting-started-with-icarus"
              title="Getting Started with Icarus"
              className="hover:text-[#3273dc] truncate"
            >
              Getting Started with Icarus
            </Link>
          </div>
        </div>
        <div className="flex mt-7">
          <Link
            href="/article/icarus-user-guide-configuring-the-theme"
            title="Icarus User Guide - Configuring the Theme"
            className="mr-4"
          >
            <Image
              src="https://picsum.photos/128/128"
              alt="getting started"
              width={64}
              height={64}
            />
          </Link>
          <div className="flex-1 grid grid-rows-3">
            <time className="flex items-start text-sm text-[#7a7a7a]">
              2020-03-01
            </time>
            <Link
              href="/article/icarus-user-guide-configuring-the-theme"
              title="Icarus User Guide - Configuring the Theme"
              className="hover:text-[#3273dc] truncate"
            >
              Icarus User Guide - Configuring the Theme
            </Link>
            <Link
              href="/category/configuration"
              className="flex items-end text-xs text-[#7a7a7a] hover:text-[#3273dc] uppercase"
            >
              configuration
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
