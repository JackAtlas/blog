import Image from 'next/image'
import {
  FaFacebookF,
  FaGithub,
  FaLocationDot,
  FaRss
} from 'react-icons/fa6'
import Card from '@/components/blog/card'
import CardContent from '@/components/blog/card-content'
import { SiGitee } from 'react-icons/si'
import { getMetaData } from '@/lib/actions/get-meta-data'
import Link from 'next/link'
import { LuMail } from 'react-icons/lu'

export default async function ProfileSection() {
  const { articles, categories, tags } = await getMetaData()
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
            <Link href="/archives" className="hover:text-primary">
              <div className="mt-1 text-2xl">{articles}</div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <div className="uppercase text-xs">categories</div>
            <Link href="/categories" className="hover:text-primary">
              <div className="mt-1 text-2xl">{categories}</div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <div className="uppercase text-xs">tags</div>
            <Link href="/tags" className="hover:text-primary">
              <div className="mt-1 text-2xl">{tags}</div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-5 mt-6">
          <a
            href="https://github.com/jackatlas"
            target="_blank"
            title="github"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <FaGithub />
          </a>
          <a
            href="https://gitee.com/jackatlas8864"
            target="_blank"
            title="gitee"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <SiGitee />
          </a>
          <a
            title="敬请期待"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <FaFacebookF />
          </a>
          <a
            href="mailto:jack-atlas@qq.com"
            title="jack-atlas@qq.com"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <LuMail />
          </a>
          <a
            title="敬请期待"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <FaRss />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
