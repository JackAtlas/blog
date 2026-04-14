'use server'

import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function findRecordByToken(token: string) {
  if (!token) {
    return { error: 'Token 不能为空' }
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

  return { error: null, email: record.email }
}
