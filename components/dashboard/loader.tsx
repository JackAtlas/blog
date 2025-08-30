import { LuLoader } from 'react-icons/lu'

export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LuLoader size={80} className="animate-spin text-primary" />
    </div>
  )
}
