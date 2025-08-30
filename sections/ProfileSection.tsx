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
            className="rounded-full size-32 md:size-40 2xl:size-48"
            src="/avatar.jpg"
            alt="avatar"
            width={192}
            height={192}
          />
        </div>
        <div className="flex items-center justify-center text-xl md:text-2xl 2xl:text-3xl uppercase mt-2">
          Jack Atlas
        </div>
        <div className="flex items-center justify-center text-sm md:text-base 2xl:text-lg mt-2">
          Web Developer
        </div>
        <div className="flex items-center justify-center text-sm md:text-base 2xl:text-lg">
          <FaLocationDot />
          Earth, Solar System
        </div>
        <div className="flex justify-between mt-2 md:mt-4 2xl:mt-6 px-2 md:px-4 2xl:px-6">
          <div className="flex flex-col items-center">
            <div className="uppercase text-xs md:text-sm 2xl:text-base">
              posts
            </div>
            <Link href="/archives" className="hover:text-primary">
              <div className="mt-1 text-2xl md:text-3xl 2xl:text-4xl">
                {articles}
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <div className="uppercase text-xs md:text-sm 2xl:text-base">
              categories
            </div>
            <Link href="/categories" className="hover:text-primary">
              <div className="mt-1 text-2xl md:text-3xl 2xl:text-4xl">
                {categories}
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <div className="uppercase text-xs md:text-sm 2xl:text-base">
              tags
            </div>
            <Link href="/tags" className="hover:text-primary">
              <div className="mt-1 text-2xl md:text-3xl 2xl:text-4xl">
                {tags}
              </div>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-5 mt-2 md:mt-4 2xl:mt-6">
          <a
            href="https://github.com/jackatlas"
            target="_blank"
            title="github"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <FaGithub className="md:size-5 2xl:size-6" />
          </a>
          <a
            href="https://gitee.com/jackatlas8864"
            target="_blank"
            title="gitee"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <SiGitee className="md:size-5 2xl:size-6" />
          </a>
          <a
            title="敬请期待"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <FaFacebookF className="md:size-5 2xl:size-6" />
          </a>
          <a
            href="mailto:jack-atlas@qq.com"
            title="jack-atlas@qq.com"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <LuMail className="md:size-5 2xl:size-6" />
          </a>
          <a
            title="敬请期待"
            className="flex items-center justify-center h-8 hover:text-primary"
          >
            <FaRss className="md:size-5 2xl:size-6" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
