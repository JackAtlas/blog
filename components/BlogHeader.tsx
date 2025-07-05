import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'

export default function BlogHeader() {
  return (
    <header className="bg-white shadow shadow-black/5">
      <div className="container min-h-17 flex">
        <div className="flex items-center">JackAtlas</div>
        <div className="flex justify-between flex-1">
          <div className="flex">
            <Link className="flex items-center" href="/">
              首页
            </Link>
            <Link className="flex items-center" href="/categories">
              栏目
            </Link>
            <Link className="flex items-center" href="/tags">
              标签
            </Link>
            <Link className="flex items-center" href="/archives">
              归档
            </Link>
            <Link className="flex items-center" href="/about">
              关于
            </Link>
          </div>
          <div className="flex">
            <a
              href="https://github.com/jackatlas"
              className="flex items-center px-5 py-3 hover:bg-[#fafafa] hover:text-[#3273dc]"
              target="_blank"
              title="https://github.com/jackatlas"
            >
              <FaGithub />
            </a>
            <a
              href="javascript:void(0)"
              className="flex items-center px-5 py-3 hover:bg-[#fafafa] hover:text-[#3273dc]"
              title="搜索"
            >
              <LuSearch />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
