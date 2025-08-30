import { Alert, AlertTitle } from '@/components/ui'
import { LuCircleAlert } from 'react-icons/lu'

export default function ErrorDisplay({ error }: { error: Error }) {
  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6">
      <Alert variant="destructive">
        <LuCircleAlert />
        <AlertTitle>加载失败</AlertTitle>
      </Alert>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}
