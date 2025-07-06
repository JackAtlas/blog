import Image from 'next/image'
import { LuBell } from 'react-icons/lu'
import avatar from '@/public/avatar.jpg'
import { FaMoon } from 'react-icons/fa6'

export default function DashboardHeader() {
  return (
    <header className="bg-zinc-900 shadow-lg border-b border-y-zinc-950 mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          Dashboard
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="relative">
            <FaMoon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-white" />
          </div>

          <div className="relative">
            <LuBell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-white" />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src={avatar}
              alt="admin"
              width={35}
              height={35}
              className="rounded-full border border-gray-600"
            />

            <span className="hidden sm:block text-gray-100 font-medium">
              Jack Atlas
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
