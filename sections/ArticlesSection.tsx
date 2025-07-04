import Card from '@/components/ui/Card'
import CardContent from '@/components/ui/CardContent'
import CardHeader from '@/components/ui/CardHeader'
import Image from 'next/image'
import Link from 'next/link'

export default function ArticlesSection() {
  return (
    <ul>
      <li>
        <Card>
          <CardHeader>
            <Image
              className="w-full"
              src="https://picsum.photos/700/300"
              alt="Getting Started with Icarus"
              width={700}
              height={300}
            />
          </CardHeader>
          <CardContent>
            <div className="flex text-xs uppercase">
              <div>posted 5 years ago</div>
              <div className="ms-3">plugins/comment</div>
              <div className="ms-3">
                3 minutes read (about 495 words)
              </div>
            </div>
            <h2 className="text-3xl mt-2 mb-6 hover:text-[#3273dc]">
              Getting Started with Icarus
            </h2>
            <div className="mb-6">
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Doloribus voluptatem delectus hic error nostrum
                neque, ut quam deserunt blanditiis nihil, impedit
                porro qui suscipit! Molestias aperiam dolorem quos
                delectus similique.
              </p>
            </div>
            <Link
              href="/article/getting-started-width-icarus"
              title="read more"
              className="inline-block rounded-xs text-xs bg-[#f5f5f5] hover:bg-[#eee] h-7 leading-7 px-[1em]"
            >
              Read more
            </Link>
          </CardContent>
        </Card>
      </li>
    </ul>
  )
}
