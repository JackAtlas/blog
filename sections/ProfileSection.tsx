import Image from 'next/image'
import { FaLocationDot } from 'react-icons/fa6'
import Card from '@/components/ui/Card'
import CardContent from '@/components/ui/CardContent'

export default function ProfileSection() {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-center">
          <Image
            className="rounded-full"
            src="/avatar.jpg"
            alt="avatar"
            width={128}
            height={128}
          />
        </div>
        <div className="flex items-center justify-center text-xl uppercase mt-2">
          JackAtlas
        </div>
        <div className="flex items-center justify-center text-sm mt-2">
          Web Developer
        </div>
        <div className="flex items-center justify-center text-sm">
          <FaLocationDot />
          Earth, Solar System
        </div>
        <div className="flex justify-between mt-6 px-4">
          <div className="flex flex-col items-center">
            <div className="uppercase text-xs">posts</div>
            <div className="mt-1 text-2xl">43</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="uppercase text-xs">categories</div>
            <div className="mt-1 text-2xl">9</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="uppercase text-xs">tags</div>
            <div className="mt-1 text-2xl">4</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
