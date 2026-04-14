'use server'

import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function resetPassword(
  formData: FormData
): Promise<{ error: string | null }> {
  const token = formData.get('token')?.toString()
  const password = formData.get('password')?.toString()
  const confirmPassword = formData.get('confirmPassword')?.toString()

  if (!token || !password || !confirmPassword) {
    return { error: '所有字段都不能为空' }
  }

  if (password !== confirmPassword) {
    return { error: '两次输入的密码不一致' }
  }

  const tokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')

  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash }
  })

  if (!record || record.used || record.expiresAt < new Date()) {
    return { error: '无效或过期的 Token' }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: record.email }
  })
  if (!existingUser) {
    return { error: '用户不存在' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { email: record.email },
    data: { password: hashedPassword }
  })

  await prisma.passwordResetToken.update({
    where: { tokenHash },
    data: { used: true }
  })

  return { error: null }
}
