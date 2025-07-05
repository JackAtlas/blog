import Image from 'next/image'
import {
  FaFacebookF,
  FaGithub,
  FaLocationDot,
  FaRss,
  FaTwitter
} from 'react-icons/fa6'
import Card from '@/components/ui/Card'
import CardContent from '@/components/ui/CardContent'
import { SiGitee } from 'react-icons/si'

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
          Jack Atlas
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
        <div className="grid grid-cols-5 mt-6">
          <a
            href="https://github.com/jackatlas"
            target="_blank"
            title="github"
            className="flex items-center justify-center h-8"
          >
            <FaGithub />
          </a>
          <a className="flex items-center justify-center h-8">
            <SiGitee />
          </a>
          <a className="flex items-center justify-center h-8">
            <FaFacebookF />
          </a>
          <a className="flex items-center justify-center h-8">
            <FaTwitter />
          </a>
          <a className="flex items-center justify-center h-8">
            <FaRss />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
