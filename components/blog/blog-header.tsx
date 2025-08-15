import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'
import { ThemeAndModeSwitcher } from '../theme-and-mode-switcher'

export default function BlogHeader() {
  return (
    <header className="shadow shadow-black/5">
      <div className="container min-h-17 flex">
        <div className="flex items-center text-2xl mr-4">
          JackAtlas
        </div>
        <div className="flex justify-between flex-1">
          <div className="flex">
            <Link className="flex items-center px-3" href="/">
              首页
            </Link>
            <Link
              className="flex items-center px-3"
              href="/categories"
            >
              栏目
            </Link>
            <Link className="flex items-center px-3" href="/tags">
              标签
            </Link>
            <Link className="flex items-center px-3" href="/archives">
              归档
            </Link>
            <Link className="flex items-center px-3" href="/about">
              关于
            </Link>
          </div>
          <div className="flex items-center">
            <ThemeAndModeSwitcher />
            <a
              href="https://github.com/jackatlas"
              className="flex items-center px-5 py-3 hover:text-primary"
              target="_blank"
              title="https://github.com/jackatlas"
            >
              <FaGithub />
            </a>
            {/* <a
              href="javascript:void(0)"
              className="flex items-center px-5 py-3 hover:bg-[#fafafa] hover:text-[#3273dc]"
              title="搜索"
            >
              <LuSearch />
            </a> */}
          </div>
        </div>
      </div>
    </header>
  )
}
