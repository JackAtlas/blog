'use client'

import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label
} from '@/components/ui'
import { FlattenedCategory } from '@/lib/data/category'

interface CategoryEditorProps {
  categories: FlattenedCategory[]
  targetId?: number | null
  onSubmit: ({
    targetId,
    name,
    parentId
  }: {
    targetId: number | null
    name: string
    parentId: number
  }) => void
}

export default function CategoryEditor({
  categories,
  targetId = null,
  onSubmit
}: CategoryEditorProps) {
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number>(0)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
        >
          <LuPlus />
          <span className="hidden lg:inline">增加栏目</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新建栏目</DialogTitle>
          <DialogDescription>
            填写栏目名称，并选择父栏目，然后点击保存。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="new-category-name">名称</Label>
            <Input
              id="new-category-name"
              placeholder="请输入栏目名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label>父栏目</Label>
            <Command className="rounded-md border shadow-xs">
              <CommandEmpty>没有栏目</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value=""
                  onSelect={() => setSelectedCategory(0)}
                >
                  <Badge
                    variant={
                      !selectedCategory ? 'default' : 'secondary'
                    }
                  >
                    无（顶级栏目）
                  </Badge>
                </CommandItem>
                {categories.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id.toString()}
                    onSelect={() => setSelectedCategory(item.id)}
                  >
                    {item.label}{' '}
                    <Badge
                      variant={
                        selectedCategory === item.id
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {item.name}
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              取消
            </Button>
          </DialogClose>
          <Button
            className="cursor-pointer"
            disabled={name ? false : true}
            onClick={() =>
              onSubmit({
                targetId,
                name,
                parentId: selectedCategory
              })
            }
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
