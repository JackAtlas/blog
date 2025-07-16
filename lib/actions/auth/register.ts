'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function register(
  formData: FormData
): Promise<{ error: string | null }> {
  const email = formData.get('email')?.toString().toLowerCase().trim()
  const password = formData.get('password')?.toString().trim()

  const whiteList = (process.env.WHITELIST_EMAILS as string) || ''

  if (!email || !password) {
    return { error: '邮箱和密码不能为空' }
  }

  if (!whiteList.includes(email)) {
    return { error: '非白名单用户不能注册' }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })
  if (existingUser) {
    return { error: '该邮箱已被注册' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      name: email,
      password: hashedPassword
    }
  })

  return { error: null }
}
