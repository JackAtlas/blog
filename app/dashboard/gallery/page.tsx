'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  CardContent,
  CardFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Input,
  Label
} from '@/components/ui'
import { Media } from '@/generated/prisma'
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import Image from 'next/image'
import { LuCopy, LuLoaderCircle, LuX } from 'react-icons/lu'
import { MdOutlineZoomOutMap } from 'react-icons/md'
import { toast } from 'sonner'

export default function GalleryPage() {
  const queryClient = useQueryClient()

  const { data, isLoading: isDataLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const res = await fetch('/api/media')

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message)
      } else {
        return await res.json()
      }
    }
  })

  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData()
      form.append('file', file)

      const res = await fetch('/api/media', {
        method: 'POST',
        body: form
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message)
      } else {
        return await res.json()
      }
    },
    onSuccess: (res) => {
      if (res.data?.reused) {
        toast.info('已有相同图片')
      } else {
        toast.success('图片上传成功')
        queryClient.invalidateQueries({ queryKey: ['gallery'] })
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : '图片上传失败，未知错误'
      )
    }
  })

  const { mutate: deletePic, isPending: isDeletePending } =
    useMutation({
      mutationFn: async (pic: Media) => {
        if (!pic || !pic.cosKey) toast.warning('缺少图片 key')

        const res = await fetch(`/api/media`, {
          method: 'DELETE',
          body: JSON.stringify({
            id: pic.id,
            key: pic.cosKey
          })
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.message)
        } else {
          return true
        }
      },
      onSuccess: () => {
        toast.success('图片已删除')
        queryClient.invalidateQueries({ queryKey: ['gallery'] })
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : '图片删除失败，未知错误'
        )
      }
    })

  if (isDataLoading) return <div>加载中……</div>

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div>
        <Button
          disabled={isUploading}
          onClick={() => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.multiple = false
            input.onchange = async (e) => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) upload(file)
            }
            input.click()
          }}
        >
          {isUploading ? (
            <LuLoaderCircle className="animate-spin" />
          ) : (
            '点击上传图片'
          )}
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data.map((pic: Media) => (
          <Card key={pic.hash}>
            <CardContent>
              <div className="relative group">
                <Image
                  src={pic.url}
                  alt={pic.hash}
                  width={pic.width ?? 400}
                  height={pic.height ?? 400}
                />
                <div className="hidden group-hover:block absolute top-0 left-0">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <LuX />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          确认删除？
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          此操作不可逆，图片将从数据库及腾讯云对象存储中永久删除。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deletePic(pic)}
                        >
                          确认
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="hidden group-hover:block absolute top-0 right-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <MdOutlineZoomOutMap />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>图片预览</DialogTitle>
                      <DialogDescription>
                        {pic.filename}
                      </DialogDescription>
                      <Image
                        src={pic.url}
                        alt={pic.hash}
                        width={pic.width ?? 400}
                        height={pic.height ?? 400}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Label htmlFor={`pic-${pic.hash}`} className="sr-only">
                Link of {pic.filename}
              </Label>
              <Input
                id={`pic-${pic.hash}`}
                defaultValue={pic.url}
                readOnly
              />
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() =>
                  navigator.clipboard
                    .writeText(pic.url)
                    .then(() => toast.success('已复制图片地址'))
                    .catch(() => toast.error('失败，请手动复制'))
                }
              >
                <LuCopy />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
