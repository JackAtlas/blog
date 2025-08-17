import prisma from '@/lib/prisma'

export default async function updateUserName(formData: FormData) {
  const id = formData.get('id')

  if (!id || typeof id !== 'string') {
    throw new Error('无效用户ID')
  }

  const user = await prisma.user.findUnique({
    where: { id }
  })

  if (!user) {
    throw new Error('用户不存在')
  }

  const rawName = formData.get('name')

  if (!rawName || typeof rawName !== 'string') {
    throw new Error('无效用户名')
  }

  const name = rawName.toLowerCase().trim()

  const result = await prisma.user.update({
    where: { id },
    data: { name }
  })

  if (result) {
    return result
  } else {
    throw new Error('更新用户名失败，未知错误')
  }
}
