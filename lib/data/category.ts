import type { Category } from '@/generated/prisma'

export type NestedCategory = Category & {
  children?: NestedCategory[]
}

export type FlattenedCategory = {
  id: number
  label: string
  name: string
  createdAt: Date
}

export const flatten = (
  nodes: NestedCategory[],
  prefix = ''
): FlattenedCategory[] => {
  return nodes.flatMap((node, index, arr) => {
    const isLast = index === arr.length - 1
    const currentPrefix = prefix + (isLast ? '└─ ' : '├─ ')
    const childPrefix = prefix + (isLast ? '' : '│\u3000')
    return [
      {
        id: node.id,
        label: currentPrefix,
        name: node.name,
        createdAt: node.createdAt
      },
      ...(node.children ? flatten(node.children, childPrefix) : [])
    ]
  })
}
