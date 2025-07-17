'use server'

import prisma from '@/lib/prisma'

export async function createTag({ name }: { name: string }) {
  if (!name || name.trim() === '') {
    throw new Error('标签名称不能为空')
  }

  const existingTag = await prisma.tag.findFirst({
    where: {
      name
    }
  })

  if (existingTag) {
    throw new Error('同名标签已存在')
  }

  const result = await prisma.tag.create({
    data: {
      name
    }
  })

  if (result) {
    return { data: result }
  } else {
    throw new Error('标签创建失败，未知错误')
  }
}
