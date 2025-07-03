import Card from '@/components/ui/Card'
import CardContent from '@/components/ui/CardContent'
import CardHeader from '@/components/ui/CardHeader'
import Image from 'next/image'

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
              <div className="ms-3">
                3 minutes read (about 495 words)
              </div>
            </div>
          </CardContent>
        </Card>
      </li>
    </ul>
  )
}
