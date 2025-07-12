'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function register(
  formData: FormData
): Promise<{ error: string | null }> {
  const email = formData.get('email')?.toString().toLowerCase().trim()
  const password = formData.get('password')?.toString().trim()

  if (!email || !password) {
    return { error: '邮箱和密码不能为空' }
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
